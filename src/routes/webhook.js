const router = require('express').Router();
const verifyWebhook = require('../utils/verifyWebhook');
const orderQueue = require('../queue/order.queue');
const logger = require('../config/logger');

router.post('/:store/orders-create', async (req, res) => {
  logger.webhook(`Webhook received for store: ${req.params.store}`, { 
    headers: Object.keys(req.headers),
    userAgent: req.get('User-Agent')
  });
  
  res.status(200).send('OK');
  logger.webhook('Sent 200 OK response to Shopify');

  try {
    const storeKey = req.params.store; // burdens | bathroomhq | plumbershq
    const order = req.body;

    logger.webhook(`Webhook received`, { 
      orderId: order?.id, 
      orderName: order?.name,
      store: storeKey,
      totalPrice: order?.total_price
    });
    
    logger.webhook(`Order ID: ${order?.id}, Name: ${order?.name}`);

    logger.webhook('Enqueuing order for processing...');
    await orderQueue.enqueue(order.id, order, storeKey);
    logger.webhook('Order enqueued successfully');
  } catch (error) {
    logger.orderError('Error processing webhook', { 
      error: error.message,
      stack: error.stack,
      store: req.params.store
    });
  }
});

module.exports = router;
