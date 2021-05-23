import express from 'express'
import fs from 'fs'
const app = express()

const puerto = 8080;
const archivo = fs.readFileSync('./productos.txt', 'utf-8')
const archivoParseado = JSON.parse(archivo)
let contadorItem = 0
let contadorItems = 0

app.get('/items', (req, res) => {
    contadorItems ++
    res.json({ items: archivoParseado , cantidad: archivoParseado.length});
});

app.get('/item-random', (req, res) => {
    contadorItem ++
    const numero = Math.floor(Math.random() * (archivoParseado.length - 0)) + 0;
    res.json({ item: archivoParseado[numero]});
});

app.get('/visitas', (req, res) => {
    res.json({ visitas: { items: contadorItems , item: contadorItem} });
});

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});
