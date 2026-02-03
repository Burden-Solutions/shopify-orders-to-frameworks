const fs = require('fs');
const path = require('path');

// Sample Shopify webhook payload (realistic example)
const shopifyWebhook = {
  "id": 820982911946154500,
  "admin_graphql_api_id": "gid://shopify/Order/820982911946154500",
  "app_id": 123456789,
  "checkout_id": 987654321098765432,
  "checkout_token": "abcd1234efgh5678",
  "confirmed": true,
  "contact_email": "jon@example.com",
  "created_at": "2026-02-02T13:29:14+11:00",
  "currency": "AUD",
  "current_subtotal_price": "2273.98",
  "current_subtotal_price_set": {
    "shop_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    }
  },
  "current_total_discounts": "0.00",
  "current_total_discounts_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    }
  },
  "current_total_duties_set": null,
  "current_total_price": "2273.98",
  "current_total_price_set": {
    "shop_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    }
  },
  "current_total_tax": "0.00",
  "current_total_tax_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    }
  },
  "customer_locale": "en",
  "device_id": null,
  "discount_applications": [],
  "discount_codes": [],
  "email": "jon@example.com",
  "estimated_tax": false,
  "financial_status": "paid",
  "fulfillment_status": null,
  "gateway": "shopify_payments",
  "landing_site": "/",
  "landing_site_ref": null,
  "location_id": null,
  "name": "#9999",
  "note": null,
  "note_attributes": [],
  "number": 9999,
  "order_number": 1234,
  "order_status_url": "https://burdens.myshopify.com/123456789/orders/820982911946154500/authenticate?key=abc123",
  "payment_gateway_names": ["shopify_payments"],
  "phone": null,
  "presentment_currency": "AUD",
  "processed_at": "2026-02-02T13:29:14+11:00",
  "reference": null,
  "referring_site": "",
  "source_identifier": null,
  "source_name": "web",
  "source_url": null,
  "subtotal_price": "2273.98",
  "subtotal_price_set": {
    "shop_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    }
  },
  "tags": "",
  "tax_exempt": false,
  "taxes_included": false,
  "test": false,
  "token": "abcd1234efgh5678ijkl9012mnop3456",
  "total_discounts": "0.00",
  "total_discounts_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    }
  },
  "total_line_items_price": "2273.98",
  "total_line_items_price_set": {
    "shop_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    }
  },
  "total_outstanding": "0.00",
  "total_price": "2273.98",
  "total_price_set": {
    "shop_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "2273.98",
      "currency_code": "AUD"
    }
  },
  "total_shipping_price_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    }
  },
  "total_tax": "0.00",
  "total_tax_set": {
    "shop_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    },
    "presentment_money": {
      "amount": "0.00",
      "currency_code": "AUD"
    }
  },
  "total_tip_received": "0.00",
  "total_weight": 0,
  "updated_at": "2026-02-02T13:29:14+11:00",
  "user_id": null,
  "billing_address": {
    "first_name": "John",
    "address1": "123 Billing Street",
    "phone": "555-555-BILL",
    "city": "Billington",
    "zip": "40002",
    "province": "Kentucky",
    "country": "United States",
    "last_name": "Smith",
    "address2": "",
    "company": "",
    "latitude": 37.1234,
    "longitude": -86.5678,
    "name": "John Smith",
    "country_code": "US",
    "province_code": "KY"
  },
  "customer": {
    "id": 1234567890123,
    "email": "jon@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "phone": null,
    "accepts_marketing": false,
    "accepts_marketing_updated_at": "2026-02-02T13:29:14+11:00",
    "admin_graphql_api_id": "gid://shopify/Customer/1234567890123",
    "created_at": "2026-01-15T10:30:00+11:00",
    "updated_at": "2026-02-02T13:29:14+11:00",
    "state": "enabled",
    "total_spent": "2273.98",
    "total_spent_set": {
      "shop_money": {
        "amount": "2273.98",
        "currency_code": "AUD"
      },
      "presentment_money": {
        "amount": "2273.98",
        "currency_code": "AUD"
      }
    },
    "last_order_id": 820982911946154500,
    "tags": "",
    "currency": "AUD",
    "addresses": [],
    "tax_exempt": false,
    "tax_exemptions": [],
    "verified_email": true,
    "multipass_identifier": null,
    "marketing_opt_in_level": null,
    "sms_marketing_consent": null,
    "tax_exemptions_count": 0,
    "admin_graphql_api_id": "gid://shopify/Customer/1234567890123",
    "default_address": null
  },
  "discount_applications": [],
  "fulfillments": [],
  "line_items": [
    {
      "id": 866550311766439000,
      "admin_graphql_api_id": "gid://shopify/LineItem/866550311766439000",
      "fulfillable_quantity": 1,
      "fulfillment_service": "manual",
      "fulfillment_status": null,
      "gift_card": false,
      "grams": 0,
      "name": "Aulic Beau Monde Oblong Led Mirror Matte Black",
      "origin_location": {
        "id": 12345678901,
        "country_code": "AU",
        "province_code": "NSW",
        "name": "Sydney Warehouse",
        "address1": "123 Warehouse St",
        "address2": "",
        "city": "Sydney",
        "zip": "2000"
      },
      "price": "815.00",
      "price_set": {
        "shop_money": {
          "amount": "815.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "815.00",
          "currency_code": "AUD"
        }
      },
      "product_exists": true,
      "product_id": 9876543210987,
      "properties": [],
      "quantity": 1,
      "requires_shipping": true,
      "sku": "ALEX02450",
      "tax_lines": [],
      "taxable": true,
      "title": "Aulic Beau Monde Oblong Led Mirror Matte Black",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        }
      },
      "variant_id": 123456789012345678,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "Aulic",
      "duties": [],
      "discount_allocations": []
    },
    {
      "id": 789012345678901200,
      "admin_graphql_api_id": "gid://shopify/LineItem/789012345678901200",
      "fulfillable_quantity": 1,
      "fulfillment_service": "manual",
      "fulfillment_status": null,
      "gift_card": false,
      "grams": 0,
      "name": "Lens Protection Plan (2 Year)",
      "origin_location": {
        "id": 12345678901,
        "country_code": "AU",
        "province_code": "NSW",
        "name": "Sydney Warehouse",
        "address1": "123 Warehouse St",
        "address2": "",
        "city": "Sydney",
        "zip": "2000"
      },
      "price": "19.99",
      "price_set": {
        "shop_money": {
          "amount": "19.99",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "19.99",
          "currency_code": "AUD"
        }
      },
      "product_exists": true,
      "product_id": 9876543210988,
      "properties": [],
      "quantity": 1,
      "requires_shipping": true,
      "sku": "LENS-PROTECT-2YR",
      "tax_lines": [],
      "taxable": true,
      "title": "Lens Protection Plan (2 Year)",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        }
      },
      "variant_id": 123456789012345679,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "Service Provider",
      "duties": [],
      "discount_allocations": []
    },
    {
      "id": 890123456789012400,
      "admin_graphql_api_id": "gid://shopify/LineItem/890123456789012400",
      "fulfillable_quantity": 1,
      "fulfillment_service": "manual",
      "fulfillment_status": null,
      "gift_card": false,
      "grams": 0,
      "name": "Premium Leather Case",
      "origin_location": {
        "id": 12345678901,
        "country_code": "AU",
        "province_code": "NSW",
        "name": "Sydney Warehouse",
        "address1": "123 Warehouse St",
        "address2": "",
        "city": "Sydney",
        "zip": "2000"
      },
      "price": "24.99",
      "price_set": {
        "shop_money": {
          "amount": "24.99",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "24.99",
          "currency_code": "AUD"
        }
      },
      "product_exists": true,
      "product_id": 9876543210989,
      "properties": [],
      "quantity": 1,
      "requires_shipping": true,
      "sku": "CASE-LEATHER-PREM",
      "tax_lines": [],
      "taxable": true,
      "title": "Premium Leather Case",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        }
      },
      "variant_id": 123456789012345680,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "Accessory Brand",
      "duties": [],
      "discount_allocations": []
    },
    {
      "id": 141249953214522980,
      "admin_graphql_api_id": "gid://shopify/LineItem/141249953214522980",
      "fulfillable_quantity": 1,
      "fulfillment_service": "manual",
      "fulfillment_status": null,
      "gift_card": false,
      "grams": 0,
      "name": "Aulic Beau Monde Oblong Led Mirror Gun Metal",
      "origin_location": {
        "id": 12345678901,
        "country_code": "AU",
        "province_code": "NSW",
        "name": "Sydney Warehouse",
        "address1": "123 Warehouse St",
        "address2": "",
        "city": "Sydney",
        "zip": "2000"
      },
      "price": "815.00",
      "price_set": {
        "shop_money": {
          "amount": "815.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "815.00",
          "currency_code": "AUD"
        }
      },
      "product_exists": true,
      "product_id": 9876543210990,
      "properties": [],
      "quantity": 1,
      "requires_shipping": true,
      "sku": "ALEX02490",
      "tax_lines": [],
      "taxable": true,
      "title": "Aulic Beau Monde Oblong Led Mirror Gun Metal",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        }
      },
      "variant_id": 123456789012345681,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "Aulic",
      "duties": [],
      "discount_allocations": []
    },
    {
      "id": 257004973105704600,
      "admin_graphql_api_id": "gid://shopify/LineItem/257004973105704600",
      "fulfillable_quantity": 1,
      "fulfillment_service": "manual",
      "fulfillment_status": null,
      "gift_card": false,
      "grams": 0,
      "name": "Aulic Canterbury Arch Led Mirror 500X900X30mm Matte White",
      "origin_location": {
        "id": 12345678901,
        "country_code": "AU",
        "province_code": "NSW",
        "name": "Sydney Warehouse",
        "address1": "123 Warehouse St",
        "address2": "",
        "city": "Sydney",
        "zip": "2000"
      },
      "price": "609.00",
      "price_set": {
        "shop_money": {
          "amount": "609.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "609.00",
          "currency_code": "AUD"
        }
      },
      "product_exists": true,
      "product_id": 9876543210991,
      "properties": [],
      "quantity": 1,
      "requires_shipping": true,
      "sku": "ALEX02510",
      "tax_lines": [],
      "taxable": true,
      "title": "Aulic Canterbury Arch Led Mirror 500X900X30mm Matte White",
      "total_discount": "0.00",
      "total_discount_set": {
        "shop_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        },
        "presentment_money": {
          "amount": "0.00",
          "currency_code": "AUD"
        }
      },
      "variant_id": 123456789012345682,
      "variant_inventory_management": null,
      "variant_title": null,
      "vendor": "Aulic",
      "duties": [],
      "discount_allocations": []
    }
  ],
  "payment_details": {
    "credit_card_bin": null,
    "avs_result_code": null,
    "cvv_result_code": null,
    "credit_card_number": "•••• •••• •••• 4242",
    "credit_card_company": "Visa",
    "credit_card_name": "John Smith",
    "credit_card_expiry_month": 12,
    "credit_card_expiry_year": 2027,
    "payment_method": "credit_card",
    "authorization_code": "123456"
  },
  "refunds": [],
  "shipping_address": {
    "first_name": "Steve",
    "address1": "123 Shipping Street",
    "phone": "555-555-SHIP",
    "city": "Shippington",
    "zip": "40003",
    "province": "Kentucky",
    "country": "United States",
    "last_name": "Shipper",
    "address2": "",
    "company": "",
    "latitude": 37.1234,
    "longitude": -86.5678,
    "name": "Steve Shipper",
    "country_code": "US",
    "province_code": "KY"
  },
  "shipping_lines": []
};

// Mock the mapCustomer function
function mockMapCustomer() {
  return 1043; // burdens.myshopify.com customer ID
}

// Manually recreate the buildFrameworksPayload function (matching the current transform.service.js)
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
              idUom: "EA", // Default Unit of Measure
              globalTxnId: null,
              tallyText: null,
              numPack: null,
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
console.log('🔧 Generating webhook samples...');

// Save raw Shopify webhook
fs.writeFileSync('webhook-samples/raw-shopify-webhook.json', JSON.stringify(shopifyWebhook, null, 2));
console.log('✅ Raw Shopify webhook saved to webhook-samples/raw-shopify-webhook.json');

// Generate and save Frameworks payload
const frameworksPayload = buildFrameworksPayload(shopifyWebhook);
fs.writeFileSync('webhook-samples/frameworks-payload.json', JSON.stringify(frameworksPayload, null, 2));
console.log('✅ Frameworks payload saved to webhook-samples/frameworks-payload.json');

// Create a comparison summary
const summary = {
  shopifyOrder: {
    id: shopifyWebhook.id,
    name: shopifyWebhook.name,
    orderNumber: shopifyWebhook.order_number,
    customer: shopifyWebhook.customer?.email,
    total: shopifyWebhook.total_price,
    lineItems: shopifyWebhook.line_items.length,
    created: shopifyWebhook.created_at
  },
  frameworksPayload: {
    customerId: frameworksPayload.dsSalesOrder.salesOrder[0].idCust,
    orderReference: frameworksPayload.dsSalesOrder.salesOrder[0].custOrderRef,
    orderDate: frameworksPayload.dsSalesOrder.salesOrder[0].dateOrd,
    contactName: frameworksPayload.dsSalesOrder.salesOrder[0].contactName,
    contactEmail: frameworksPayload.dsSalesOrder.salesOrder[0].contactEmail,
    lineItems: frameworksPayload.dsSalesOrder.salesOrder[0].salesOrderLine.length,
    unitOfMeasure: frameworksPayload.dsSalesOrder.salesOrder[0].salesOrderLine[0].idUom
  }
};

fs.writeFileSync('webhook-samples/transformation-summary.json', JSON.stringify(summary, null, 2));
console.log('✅ Transformation summary saved to webhook-samples/transformation-summary.json');

console.log('\n📋 Summary:');
console.log(`- Shopify Order: ${summary.shopifyOrder.name} (${summary.shopifyOrder.lineItems} items)`);
console.log(`- Frameworks Customer: ${summary.frameworksPayload.customerId}`);
console.log(`- Frameworks Reference: ${summary.frameworksPayload.orderReference}`);
console.log(`- Unit of Measure: ${summary.frameworksPayload.unitOfMeasure}`);
