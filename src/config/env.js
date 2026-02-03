require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  
  // Shopify Configuration
  shopify: {
    shop: process.env.SHOPIFY_SHOP,
    token: process.env.SHOPIFY_TOKEN,
    webhookSecret: process.env.SHOPIFY_WEBHOOK_SECRET
  },
  
  // Frameworks ERP Configuration
  frameworks: {
    baseUrl: process.env.FRAMEWORKS_API_BASE || 'http://192.168.5.138:9200/fw-prod/web/api/v1',
    apiKey: process.env.FRAMEWORKS_API_KEY,
    username: process.env.FRAMEWORKS_USERNAME,
    password: process.env.FRAMEWORKS_PASSWORD,
    device: process.env.FRAMEWORKS_DEVICE,
    endpoints: {
      login: '/login',
      validateSession: '/session/validate',
      createSalesOrder: '/salesorder/create'
    }
  },
  
};