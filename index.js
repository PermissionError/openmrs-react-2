const express = require('express')
const app = express()
const port = 3000

const utilities = require('./utilities')

const config = require('./package.json')
const products = require('./src/data/products')

//Returns information about the app
app.get('/info', (req, res) => {
	res.send({serverName: config.name, serverVersion: config.version})
})

//Returns all products, defined in src/data/products.json
app.get('/products/all', (req, res) => {
	let productMap = []
	products.products.forEach(product => {
		utilities.injectCategoryName(product)
		productMap.push(product)
	})
	res.send(productMap)
})

//Returns a single product with the provided ID in url params
app.get('/product/:id', (req, res) => {
	let product = utilities.getProductById(req.params.id)
	if(product) {
		if(category) {
			utilities.injectCategoryName(product)
			res.send(product)
		} else {
			utilities.sendInternalServerErrorResponse(res)
		}
	} else {
		utilities.sendNotFoundResponse(res, 'No product found with given ID')
	}
})

//Returns a single category with its associated products with the provided ID in url params
app.get('/category/:ctyId', (req, res) => {
	let category = utilities.getCategoryById(req.params.ctyId)
	if(category) {
		let result = {
			category,
			products: utilities.getProductsByCategoryId(category.id)
		}
		res.send(result)
	} else {
		utilities.sendNotFoundResponse(res, 'No category found with given ID')
	}
})

app.listen(port, () => console.log('openmrs-react-2 started successfully.'))
