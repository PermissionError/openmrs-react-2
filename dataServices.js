let productMap = null;
let categoryMap = null;
let combinedProductMap = null;

// Returns a map of all products, with their ids as keys and whole objects as values.
function getProducts() {
  if (!productMap) {
    const newProductMap = {};
    const products = require('./src/data/products');
    products.products.forEach(product => {
      newProductMap[product.id] = product;
    });
    productMap = newProductMap;
  }
  return productMap;
}

// Returns a map of all categories, with their ids as keys and whole objects as values.
function getCategories() {
  if (!categoryMap) {
    const newCategoryMap = {};
    const categories = require('./src/data/categories');
    categories.categories.forEach(category => {
      newCategoryMap[category.id] = category;
    });
    categoryMap = newCategoryMap;
  }
  return categoryMap;
}

// Returns a map of all products with category names injected, with the product ids as keys and product objects as values.
function getCombinedProductMap() {
  if (!combinedProductMap) {
    // Injects category names into the product objects
    const combinedMap = getProducts();
    const categoryMap = getCategories();
    Object.keys(combinedMap).forEach(key => {
      const product = combinedMap[key];
      combinedMap[key] = {
        ...combinedMap[key],
        categoryName: categoryMap[product.categoryId].categoryName,
      };
    });
    combinedProductMap = combinedMap;
  }
  return combinedProductMap;
}

module.exports = {
  getProducts,
  getCategories,
  getCombinedProductMap,
};
