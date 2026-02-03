const db = require('../src/db/sqlite');

async function checkErrors() {
  try {
    console.log('🔍 Checking failed orders...');
    
    const failedOrders = await db.all("SELECT * FROM orders WHERE status='failed' ORDER BY id DESC");
    console.log(`❌ Failed orders: ${failedOrders.length}`);
    
    failedOrders.forEach(order => {
      console.log(`\n🆔 Order ID: ${order.id}`);
      console.log(`🛒 Shopify ID: ${order.shopify_order_id}`);
      console.log(`📦 Store: ${order.store}`);
      console.log(`🔄 Attempts: ${order.attempts}`);
      console.log(`❌ Error: ${order.error}`);
      console.log(`📅 Created: ${order.created_at}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking failed orders:', error);
    process.exit(1);
  }
}

checkErrors();
