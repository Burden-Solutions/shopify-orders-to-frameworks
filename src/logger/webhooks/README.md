# Webhook Logger Services

This folder contains webhook notification services for sending alerts to Discord and Teams.

## 📁 Files Structure

- `discord.service.js` - Discord webhook notifications
- `teams.service.js` - Microsoft Teams webhook notifications  
- `webhook.service.js` - Main webhook service that coordinates all channels
- `index.js` - Singleton instance export

## 🚀 Quick Usage

```javascript
const webhookService = require('../logger/webhooks');

// Send simple message
await webhookService.sendMessage('System started successfully', false);

// Send error message
await webhookService.sendMessage('Database connection failed', true);

// Send order notification
await webhookService.sendOrderNotification({
  shopifyOrderId: '12345',
  orderNumber: '#BHQ1001',
  store: 'burdens',
  error: null
}, 'success');

// Send health check
await webhookService.sendHealthCheck(healthData, false);

// Send system alert
await webhookService.sendSystemAlert('order_failed', {
  orderNumber: '#BHQ1001',
  store: 'burdens',
  error: 'Frameworks API timeout'
});
```

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Discord Webhook
DISCORD_WEBHOOK_URL=YOUR_DISCORD_WEBHOOK_URL_HERE

# Teams Webhook  
TEAMS_WEBHOOK_URL=YOUR_TEAMS_WEBHOOK_URL_HERE

# Integration Name (optional)
INTEGRATION_NAME=Shopify Connector
```

## 📨 Message Types

### 1. General Messages
- Success/Info messages (green)
- Error messages (red)

### 2. Order Notifications
- Order processing success
- Order processing failures
- Order warnings

### 3. Health Checks
- Service health status
- Database connectivity
- Memory usage alerts

### 4. System Alerts
- Database errors
- Frameworks API errors
- Webhook errors
- System restarts
- High memory usage

## 🎨 Message Formatting

### Discord Messages
- Rich embeds with colors
- Timestamps
- Environment info
- Error details (if any)

### Teams Messages  
- Adaptive Cards
- Structured layout
- Fact sets for data
- Timezone-aware timestamps

## 🔍 Features

### ✅ Built-in Features
- **Error Handling**: Graceful failure if webhooks not configured
- **Timeout Protection**: 10-second timeout for all requests
- **Logging**: Comprehensive logging for debugging
- **Channel Detection**: Automatically detects configured channels
- **Parallel Sending**: Sends to all channels simultaneously

### 🛡️ Safety Features
- **No Blocking**: Uses `Promise.allSettled` - one channel failure doesn't affect others
- **Configuration Validation**: Checks webhook URLs before sending
- **Fallback Logging**: Logs to file if webhooks fail

## 🧪 Testing

```javascript
// Test all configured webhooks
await webhookService.testWebhooks();

// Check webhook status
console.log(webhookService.getWebhookStatus());
```

## 📊 Integration Examples

### In Transform Service
```javascript
const webhookService = require('../logger/webhooks');

// On order success
await webhookService.sendOrderNotification({
  shopifyOrderId: order.id,
  orderNumber: order.name,
  store: store
}, 'success');

// On order failure
await webhookService.sendOrderNotification({
  shopifyOrderId: order.id,
  orderNumber: order.name,
  store: store,
  error: error.message
}, 'error');
```

### In Server Health Check
```javascript
app.get('/health', (req, res) => {
  const health = { /* health data */ };
  
  // Send webhook if unhealthy
  if (health.status === 'unhealthy') {
    await webhookService.sendHealthCheck(health, true);
  }
  
  res.json(health);
});
```

### In Error Handlers
```javascript
process.on('uncaughtException', async (error) => {
  await webhookService.sendSystemAlert('system_error', {
    error: error.message,
    stack: error.stack
  });
  
  process.exit(1);
});
```

## 🔧 Customization

### Custom Alert Types
Add new alert types in `webhook.service.js`:

```javascript
formatSystemAlert(alertType, details) {
  const alerts = {
    // ... existing alerts
    'custom_alert': `🔔 Custom Alert\n\n${details.message}`
  };
  
  return alerts[alertType] || `⚠️ System Alert\n\n${details.message}`;
}
```

### Custom Message Formatting
Modify the message formatting in individual service files to match your team's preferences.

## 📝 Notes

- Webhooks are optional - system works without them
- Failed webhook notifications don't break the main application
- All webhook requests have a 10-second timeout
- Messages are logged regardless of webhook success
- Uses singleton pattern for consistent configuration
