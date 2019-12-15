const express = require('express')
const app = express()
const port = 3000

const config = require('./package.json')

app.get('/info', (req, res) => {
	res.send({serverName: config.name, serverVersion: config.version})
})

app.listen(port, () => console.log('openmrs-react-2 started successfully.'))
