'use strict';

// default timezone to UTC
process.env.TZ = 'UTC';

module.exports = {
  zincBaseUrl: 'https://api.zinc.io',
  zincToken: process.env.ZINC_TOKEN,
  amazonProductId: process.env.AMAZON_PRODUCT_ID || 'B00FE2N1WS',
  backgroundCheckInterval: process.env.CHECK_INTERVAL || 60,
  priceCheckJob: 'price check job'
};

