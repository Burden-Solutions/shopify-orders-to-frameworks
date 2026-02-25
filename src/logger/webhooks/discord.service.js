const axios = require('axios');
const logger = require('../config/logger');

class DiscordService {
  constructor() {
    this.webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    this.integrationName = process.env.INTEGRATION_NAME || 'Shopify Connector';
  }

  async sendMessage(message, isError = false) {
    try {
      if (!this.webhookUrl || this.webhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        logger.warn('Discord webhook URL not configured', { message });
        return;
      }

      const payload = {
        username: this.integrationName,
        embeds: [{
          color: isError ? 0xFF0000 : 0x00FF00,
          title: isError ? '❌ Shopify Connector Alert' : '✅ Shopify Connector Status',
          description: message,
          timestamp: new Date().toISOString(),
          footer: {
            text: `Environment: ${process.env.NODE_ENV || 'development'}`
          }
        }]
      };

      await axios.post(this.webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      logger.info('Discord notification sent successfully', { isError });
    } catch (error) {
      logger.error('Failed to send Discord notification', { 
        error: error.message,
        message: message 
      });
    }
  }

  async sendOrderNotification(orderData, status = 'success') {
    const isError = status === 'error' || status === 'failed';
    const color = isError ? 0xFF0000 : status === 'warning' ? 0xFFA500 : 0x00FF00;
    const emoji = isError ? '❌' : status === 'warning' ? '⚠️' : '✅';

    try {
      if (!this.webhookUrl || this.webhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
        logger.warn('Discord webhook URL not configured for order notification');
        return;
      }

      const payload = {
        username: this.integrationName,
        embeds: [{
          color: color,
          title: `${emoji} Order Processing ${status.toUpperCase()}`,
          description: `Order ${orderData.orderNumber || 'Unknown'} from ${orderData.store || 'Unknown store'}`,
          fields: [
            {
              name: 'Order ID',
              value: orderData.shopifyOrderId || 'N/A',
              inline: true
            },
            {
              name: 'Store',
              value: orderData.store || 'N/A',
              inline: true
            },
            {
              name: 'Status',
              value: status.toUpperCase(),
              inline: true
            },
            ...(orderData.error ? [{
              name: 'Error',
              value: `\`\`\`${orderData.error}\`\`\``,
              inline: false
            }] : [])
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `Environment: ${process.env.NODE_ENV || 'development'}`
          }
        }]
      };

      await axios.post(this.webhookUrl, payload, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      logger.info('Discord order notification sent', { 
        orderId: orderData.shopifyOrderId, 
        status 
      });
    } catch (error) {
      logger.error('Failed to send Discord order notification', { 
        error: error.message,
        orderId: orderData.shopifyOrderId 
      });
    }
  }
}

module.exports = DiscordService;
