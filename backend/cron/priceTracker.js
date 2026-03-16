const cron = require('node-cron');
const { syncExternalProducts } = require('../services/externalFetcher');

function startPriceTracker() {
  // Every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    console.log('Running price/stock sync job...');
    try {
      await syncExternalProducts();
    } catch (err) {
      console.error('Error in sync job:', err);
    }
  });
}

module.exports = { startPriceTracker };