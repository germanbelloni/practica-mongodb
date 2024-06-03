process.loadEnvFile()
const { MongoClient } = require('mongodb')

const URI = process.env.MONGODB_URLSTRING