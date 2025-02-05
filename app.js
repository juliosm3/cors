const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.get('/characters', async (req,res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({mensaje: 'Error al obtener los personajes'});
    }
});

app.get('/characters/:name', async (req,res) => {
    try {
        const {name} = req.params;
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);

        if (response.data.results.length > 0) {
            res.json(response.data.results[0]);
        } else {
            res.status(404).json({ error: "Personaje no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el personaje" });
    }
});

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});