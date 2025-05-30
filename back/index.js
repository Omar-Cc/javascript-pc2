const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bdtransito'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/', (req, res) => {
    res.json({ message: 'API de Tránsito funcionando correctamente' });
});

app.get('/api/vehiculos', (req, res) => {
    const query = 'SELECT NROPLA, NOMPRO, COLOR, MODELO FROM VEHICULO ORDER BY NOMPRO';
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener vehículos', details: err.message });
        }
        res.json(results);
    });
});

app.get('/api/vehiculos/propietario/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const query = 'SELECT NROPLA, NOMPRO, COLOR, MODELO FROM VEHICULO WHERE NOMPRO LIKE ?';
    
    db.query(query, [`%${nombre}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar vehículo', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron vehículos para ese propietario' });
        }
        res.json(results);
    });
});

app.get('/api/vehiculos/:placa/papeletas', (req, res) => {
    const placa = req.params.placa;
    const query = `
        SELECT 
            p.NROPAP as papeleta,
            i.INFDES as infraccion,
            p.PAPFECHA as fecha,
            i.INFIMP as monto
        FROM PAPELETA p
        INNER JOIN INFRACCION i ON p.INFCOD = i.INFCOD
        WHERE p.NROPLA = ?
        ORDER BY p.PAPFECHA DESC
    `;
    
    db.query(query, [placa], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener papeletas', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron papeletas para este vehículo' });
        }
        res.json(results);
    });
});

app.get('/api/papeletas/vehiculo/:placa', (req, res) => {
    const placa = req.params.placa;
    const query = `
        SELECT 
            p.NROPAP as papeleta,
            i.INFDES as infraccion,
            p.PAPFECHA as fecha,
            i.INFIMP as monto,
            v.NOMPRO as propietario,
            pol.NOMpol as policia
        FROM PAPELETA p
        INNER JOIN INFRACCION i ON p.INFCOD = i.INFCOD
        INNER JOIN VEHICULO v ON p.NROPLA = v.NROPLA
        INNER JOIN POLICIA pol ON p.IDPOL = pol.IDPOL
        WHERE p.NROPLA = ?
        ORDER BY p.PAPFECHA DESC
    `;
    
    db.query(query, [placa], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener papeletas del vehículo', details: err.message });
        }
        res.json(results);
    });
});

app.get('/api/papeletas/:numero', (req, res) => {
    const numeroPapeleta = req.params.numero;
    const query = `
        SELECT 
            p.PAPFECHA as fecha,
            v.NOMPRO as propietario,
            i.INFDES as infraccion,
            i.INFIMP as importe,
            p.NROPLA as placa,
            pol.NOMpol as policia,
            pol.NROPAT as patente
        FROM PAPELETA p
        INNER JOIN VEHICULO v ON p.NROPLA = v.NROPLA
        INNER JOIN INFRACCION i ON p.INFCOD = i.INFCOD
        INNER JOIN POLICIA pol ON p.IDPOL = pol.IDPOL
        WHERE p.NROPAP = ?
    `;
    
    db.query(query, [numeroPapeleta], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener papeleta', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontró la papeleta especificada' });
        }
        res.json(results[0]);
    });
});

app.get('/api/papeletas', (req, res) => {
    const query = `
        SELECT 
            p.NROPAP as papeleta,
            v.NOMPRO as propietario,
            i.INFDES as infraccion,
            p.PAPFECHA as fecha,
            i.INFIMP as monto,
            p.NROPLA as placa
        FROM PAPELETA p
        INNER JOIN VEHICULO v ON p.NROPLA = v.NROPLA
        INNER JOIN INFRACCION i ON p.INFCOD = i.INFCOD
        ORDER BY p.PAPFECHA DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener papeletas', details: err.message });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
