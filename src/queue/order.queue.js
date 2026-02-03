const db = require('../db/sqlite');
const processOrder = require('../services/transform.service');

exports.enqueue = async (shopifyId, payload, storeKey) => {
  await db.run(
    `INSERT OR IGNORE INTO orders 
     (shopify_order_id, payload, store, status)
     VALUES (?, ?, ?, 'pending')`,
    [shopifyId, JSON.stringify(payload), storeKey]
  );

  processOrder();
};
