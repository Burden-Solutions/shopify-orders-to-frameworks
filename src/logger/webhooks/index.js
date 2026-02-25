const WebhookService = require('./webhook.service');

// Create singleton instance
const webhookService = new WebhookService();

module.exports = webhookService;
