require('dotenv').config();
const startServer = require('./server');
const processOrder = require('./services/transform.service');
const cron = require('node-cron');
const config = require('./config/env');

startServer();
console.log('Running order processing job...');
processOrder();

