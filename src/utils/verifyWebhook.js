const crypto = require('crypto');

module.exports = function verifyWebhook(req, res, next) {
  const hmac = req.headers['x-shopify-hmac-sha256'];
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest('base64');

  if (hash !== hmac) {
    return res.status(401).send('Invalid webhook');
  }

  next();
};
