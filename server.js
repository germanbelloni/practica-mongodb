const express = require('express')
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb.js')
const app = express()
process.loadEnvFile() //cargamos las variables de entorno desde el .env
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})