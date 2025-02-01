const app = require('./app');
const port = process.env.PORT || 9595;

// Define o IP manualmente
const HOST = "192.168.1.30"; // Substitua pelo seu IP da rede

app.listen(port, HOST, () => {
    console.log(`🚀 Server rodando!`);
    console.log(`🌍 Acesse em: http://${HOST}:${port}`);
});