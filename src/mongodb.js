process.loadEnvFile() //cargamos las variables de entorno desde el .env

const { MongoClient } = require('mongodb')

//obtenemos la uri desde las variables de entorno
const URI = process.env.MONGODB_URLSTRING
//hacemos la conexion del cliente
const client = new MongoClient(URI)

async function connectToMongoDB(){
    try {
        await client.connect()
        console.log('Conectadose a MongoDB')
        return client
    } catch (error) {
        console.error('Error al conectar a MongoDB', error)
        return null
    }
}

async function disconnectFromMongoDB(){
    try {
        await client.close()
        console.log('Desconectadose de MongoDB')
    } catch (error) {
        console.error('Error al desconectar MongoDB', error)
    }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB }