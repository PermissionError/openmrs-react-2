const products = require('./src/data/products')
const categories = require('./src/data/categories')
module.exports = {
    getProductsByCategoryId : (categoryId) => {
        return products.products.filter(value => value.categoryId === categoryId)
    },
    getCategoryById: (id) => {
        return categories.categories.filter(value => value.id === id)[0];
    },
    getProductById: (id) => {
        return products.products.filter(value => value.id === id)[0];
    },
    sendNotFoundResponse: (res, message) => {
        res.statusCode = 404
        res.send(message)
    },
    sendInternalServerErrorResponse: (res) => {
        res.statusCode = 500
        res.end()
    },
    injectCategoryName: (product) => {
        product['categoryName'] = module.exports.getCategoryById(product.categoryId).categoryName
    }
}
