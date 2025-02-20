const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const conhecimentosRouter = require('./routes/conhecimentos');
const projetosRouter = require('./routes/projetosRoutes');
const palavrasChaveRouter = require('./routes/palavrasChaveRoutes');
const userConhecimentoRouter = require('./routes/userConhecimentoRoutes');
const deepseekAiRouter = require('./routes/ai');
require('dotenv').config(); // Carrega variáveis do arquivo .env

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
app.use('/api/projetos', projetosRouter);
app.use('/api/palavras-chave', palavrasChaveRouter);
app.use('/api/user-conhecimento', userConhecimentoRouter);
app.use('/api/deepseek', deepseekAiRouter);

module.exports = app;