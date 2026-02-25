require('dotenv').config();
const startServer = require('./server');
const processOrder = require('./services/transform.service');
const webhookService = require('./logger/webhooks');

startServer();
console.log('Running order processing job...');
webhookService.sendMessage('Starting order processing job...');
processOrder();

