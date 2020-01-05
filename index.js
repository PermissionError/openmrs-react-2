const express = require('express');
const app = express();
const port = 3000;

const dataServices = require('./dataServices');

const config = require('./package.json');

// Returns information about the app
app.get('/info', (req, res) => {
  res.send({serverName: config.name, serverVersion: config.version});
});

// Returns all products, defined in src/data/products.json
app.get('/products/all', (req, res) => {
  res.send(dataServices.getCombinedProductMap());
});

// Returns a single product with the provided ID in url params
app.get('/product/:id', (req, res) => {
  const productMap = dataServices.getCombinedProductMap();
  const product = productMap && productMap[req.params.id];
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('No product found with given ID');
  }
});

// Returns a category with associated products with provided ID in url params
app.get('/category/:ctyId', (req, res) => {
  const categoryMap = dataServices.getCategories();
  const category = categoryMap && categoryMap[req.params.ctyId];
  if (category) {
    const result = {
      category,
      products: Object.values(dataServices.getCombinedProductMap())
        .filter(product => product.categoryId === category.id),
    };
    res.send(result);
  } else {
    res.status(404).send('No category found with given ID');
  }
});

app.listen(port, () => console.log('openmrs-react-2 started successfully.'));
