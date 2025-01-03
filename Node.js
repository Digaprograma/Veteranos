const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario', // Substitua pelo seu usuário do MySQL
  password: 'sua_senha', // Substitua pela sua senha do MySQL
  database: 'football' // Substitua pelo nome do seu banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Middleware para servir arquivos estáticos (como index.html)
app.use(express.static('public'));

// Rota para obter todos os times
app.get('/teams', (req, res) => {
  db.query('SELECT * FROM teams', (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(results);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});