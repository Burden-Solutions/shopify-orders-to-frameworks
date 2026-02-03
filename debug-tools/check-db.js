const db = require('../src/db/sqlite');

async function checkDatabase() {
  try {
    console.log('🔍 Checking database contents...');
    
    const allOrders = await db.all('SELECT * FROM orders ORDER BY id DESC');
    console.log(`📊 Total orders in database: ${allOrders.length}`);
    
    allOrders.forEach(order => {
      console.log(`🆔 ID: ${order.id}, Shopify ID: ${order.shopify_order_id}, Status: ${order.status}, Store: ${order.store}`);
    });
    
    const pendingOrders = await db.all("SELECT * FROM orders WHERE status='pending'");
    console.log(`⏳ Pending orders: ${pendingOrders.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking database:', error);
    process.exit(1);
  }
}

checkDatabase();
