const Product = require('../models/Product');

// Example stub: fetch from some external API
async function fetchExternalProducts() {
  // TODO: replace with real API calls (eBay, Amazon, etc.)
  // Return normalized array of products
  return [
    {
      externalId: 'ext-1',
      name: 'External Product 1',
      price: 1500,
      description: 'From external platform',
      image: 'https://via.placeholder.com/200',
      stock: 10,
      source: 'external-demo'
    }
  ];
}

async function syncExternalProducts() {
  const externalProducts = await fetchExternalProducts();

  for (const item of externalProducts) {
    await Product.findOneAndUpdate(
      { externalId: item.externalId, source: item.source },
      {
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        stock: item.stock,
        lastSyncedAt: new Date()
      },
      { upsert: true, new: true }
    );
  }

  console.log('External products synced');
}

module.exports = {
  syncExternalProducts
};