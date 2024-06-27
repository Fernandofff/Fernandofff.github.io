const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'proyecto_s.c.b',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/save', (req, res) => {
    const position = JSON.stringify(req.body);
    const sql = 'INSERT INTO contenedores (json_data) VALUES (?)';
    db.query(sql, [position], (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.get('/load', (req, res) => {
    const sql = 'SELECT json_data FROM contenedores ORDER BY id DESC LIMIT 1';
    db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json(JSON.parse(results[0].json_data));
        } else {
            res.json({ x: 0, y: 0 });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
