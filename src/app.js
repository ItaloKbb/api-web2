const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const conhecimentosRouter = require('./routes/conhecimentos');

const app = express();

// Configuração básica de CORS
app.use(cors());

// Ou, configure explicitamente os domínios permitidos
app.use(cors({
    origin: '*', // Substitua pelo domínio que fará as requisições
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/conhecimentos', conhecimentosRouter);

module.exports = app;