// app.js
const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs').promises

app.listen(port, () => {console.log(`El servidor está inicializado en el puerto ${port}`);
});


app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.get("/crear", async (req, res) => {
 const { archivo, contenido } = req.query
 try {
 await fs.writeFile(archivo, contenido)
 res.send("Archivo creado con éxito!")
 } catch (error) {
 res.status(500).send("Algo salió mal...")
 }
})

app.get("/leer", async (req, res) => {
 const { archivo } = req.query
 try {
 const data = await fs.readFile(archivo)
 res.send(data)
 } catch (error) {
 res.status(500).send("Algo salió mal...")
 }
})

app.get("/renombrar", async (req, res) => {
  const { nombre, nuevoNombre } = req.query;
  try {
    await fs.rename(nombre, nuevoNombre);
    res.send(`Archivo renombrado por ${nuevoNombre}`);
  } catch (error) {
    res.status(500).send("Algo salió mal...");
  }
});

app.get("/eliminar", async (req, res) => {
 const { archivo } = req.query
 try {
 await fs.unlink(archivo)
 res.send(`Archivo ${archivo} eliminado con éxito`) } 
 catch (error) {
 res.status(500).send("Algo salió mal...")
 }
})
