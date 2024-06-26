const express = require("express");
require("dotenv").config();

const { connectToMongoDB, disconnectFromMongoDB } = require("./src/mongodb.js");
const app = express();

const port = process.env.PORT ?? 3000;
app.use(express.json());

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de frutas!");
});

app.get("/frutas", async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send("Error al conectarse a la BD");
  }

  try {
    const db = client.db("frutas");
    const frutas = await db.collection("frutas").find().toArray();

    res.json(frutas);
  } catch (error) {
    res.status(500).send("Error al obtener las frutas");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.get("/frutas/:id", async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send("Error al conectarse a la BD");
  }

  try {
    const frutaID = parseInt(req.params.id);
    const db = client.db("frutas");
    const fruta = await db.collection("frutas").findOne({ id: frutaID });
    if (fruta){
        res.json(fruta)
    }else{
res.status(404).send(`No se encontro la fruta con id ${frutaID}`)
    }
  } catch (error) {
    res.status(500).send("Error al obtener la fruta");
  } finally {
    await disconnectFromMongoDB();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
