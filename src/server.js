const app = require('./app');
const port = process.env.PORT || 9595;

// Define o IP manualmente
const HOST = "localhost"; // Substitua pelo seu IP da rede

app.listen(port, () => {
    console.log(`🚀 Server rodando!`);
    console.log(`🌍 Acesse em: http://${HOST}:${port}`);
});