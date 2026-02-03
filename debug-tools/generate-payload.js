const fs = require('fs');
const path = require('path');

// Sample Shopify order data (based on your order.json)
const sampleShopifyOrder = {
  "id": 820982911946154500,
  "name": "#9999",
  "order_number": 1234,
  "created_at": "2026-02-02T13:29:14+11:00",
  "total_price": "2273.98",
  "total_tax": "0.00",
  "customer": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "jon@example.com",
    "phone": null
  },
  "shipping_address": {
    "name": "Steve Shipper",
    "address1": "123 Shipping Street",
    "city": "Shippington",
    "province": "Kentucky",
    "zip": "40003",
    "country": "United States",
    "phone": "555-555-SHIP"
  },
  "line_items": [
    {
      "id": 866550311766439000,
      "sku": "ALEX02450",
      "quantity": 1,
      "price": "815.00",
      "name": "Aulic Beau Monde Oblong Led Mirror Matte Black"
    },
    {
      "id": 789012345678901200,
      "sku": "LENS-PROTECT-2YR",
      "quantity": 1,
      "price": "19.99",
      "name": "Lens Protection Plan (2 Year)"
    },
    {
      "id": 890123456789012400,
      "sku": "CASE-LEATHER-PREM",
      "quantity": 1,
      "price": "24.99",
      "name": "Premium Leather Case"
    },
    {
      "id": 141249953214522980,
      "sku": "ALEX02490",
      "quantity": 1,
      "price": "815.00",
      "name": "Aulic Beau Monde Oblong Led Mirror Gun Metal"
    },
    {
      "id": 257004973105704600,
      "sku": "ALEX02510",
      "quantity": 1,
      "price": "609.00",
      "name": "Aulic Canterbury Arch Led Mirror 500X900X30mm Matte White"
    }
  ],
  "note": null
};

// Mock the mapCustomer function
function mockMapCustomer() {
  return 1043; // burdens.myshopify.com customer ID
}

// Manually recreate the buildFrameworksPayload function
function buildFrameworksPayload(shopifyOrder) {
  const payload = {
    validateOnly: false,
    dsSalesOrder: {
      salesOrder: [
        {
          idCust: mockMapCustomer(),
          custOrderRef: shopifyOrder.name || shopifyOrder.order_number?.toString() || "SHOPIFY-" + Date.now(),
          despatchMethod: "COUR",
          dateOrd: shopifyOrder.created_at 
            ? new Date(shopifyOrder.created_at).toISOString().split('T')[0] 
            : null,
          deliverToAddress1: "NSW 2000",
          state: "NSW",
          postCode: "2000",
          zipCode: "2000",
          contactName: shopifyOrder.shipping_address?.name 
            || `${shopifyOrder.customer?.first_name || ''} ${shopifyOrder.customer?.last_name || ''}`.trim() 
            || null,
          contactPhone: shopifyOrder.shipping_address?.phone || shopifyOrder.customer?.phone || null,
          contactEmail: shopifyOrder.customer?.email || shopifyOrder.email || null,
          salesOrderLine: shopifyOrder.line_items.map((item, index) => {
            const line = {
              lineNo: index + 1,
              idProd: item.sku || item.variant_id?.toString() || item.product_id?.toString() || "",
              qtyTran: item.quantity,
              unitSell: parseFloat(item.price) || null,
              comment: item.name || item.title || null
            };

            // Add discount percentage if available
            if (item.discount_allocations?.length > 0) {
              const discountAmount = item.discount_allocations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
              line.discPerc = Math.round((discountAmount / item.quantity / parseFloat(item.price)) * 100 * 100) / 100;
            }

            return line;
          })
        }
      ]
    }
  };

  // Add instructions only if they exist
  if (shopifyOrder.note) {
    payload.dsSalesOrder.salesOrder[0].instructions = shopifyOrder.note;
    payload.dsSalesOrder.salesOrder[0].comment1 = shopifyOrder.note;
  }

  return payload;
}

// Generate the payload
console.log('🔧 Generating Frameworks payload from Shopify order...');
const payload = buildFrameworksPayload(sampleShopifyOrder);

// Save to file
fs.writeFileSync('frameworks-payload.json', JSON.stringify(payload, null, 2));
console.log('✅ Full payload saved to frameworks-payload.json');

// Also save just the line items for easier viewing
const lineItemsPayload = {
  salesOrderLines: payload.dsSalesOrder.salesOrder[0].salesOrderLine
};
fs.writeFileSync('line-items-payload.json', JSON.stringify(lineItemsPayload, null, 2));
console.log('✅ Line items saved to line-items-payload.json');

console.log('\n📋 Summary:');
console.log(`- Customer ID: ${payload.dsSalesOrder.salesOrder[0].idCust}`);
console.log(`- Order Reference: ${payload.dsSalesOrder.salesOrder[0].custOrderRef}`);
console.log(`- Order Date: ${payload.dsSalesOrder.salesOrder[0].dateOrd}`);
console.log(`- Line Items: ${payload.dsSalesOrder.salesOrder[0].salesOrderLine.length}`);
console.log(`- Total Items: ${payload.dsSalesOrder.salesOrder[0].salesOrderLine.reduce((sum, item) => sum + item.qtyTran, 0)}`);
