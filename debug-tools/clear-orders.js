const db = require('../src/db/sqlite');

async function clearOrders(clearAll = false) {
  try {
    if (clearAll) {
      console.log('🗑️ Clearing ALL orders...');
      await db.run("DELETE FROM orders"); 
      console.log('✅ Deleted ALL orders');
    } else {
      console.log('🧹 Clearing failed orders...');
      await db.run("DELETE FROM orders WHERE status='failed'");
      console.log('✅ Deleted failed orders');
    }
    
    // Check remaining orders
    const allOrders = await db.all('SELECT * FROM orders');
    console.log(`📊 Remaining orders: ${allOrders.length}`);
    
    if (allOrders.length > 0) {
      allOrders.forEach(order => {
        console.log(`🆔 ID: ${order.id}, Shopify ID: ${order.shopify_order_id}, Status: ${order.status}, Store: ${order.store}`);
      });
    } else {
      console.log('📋 Database is now empty');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing orders:', error);
    process.exit(1);
  }
}

// Check command line arguments
const clearAll = process.argv.includes('--all') || process.argv.includes('-a');

if (clearAll) {
  console.log('⚠️  WARNING: This will delete ALL orders from the database!');
  console.log('📝 Usage: node clear-orders.js [--all|-a]');
  console.log('   --all or -a: Clear all orders (default: only failed orders)');
  console.log('');
}

clearOrders(clearAll);
