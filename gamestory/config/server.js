
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const server = express()

server.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    server.use(cors());
    next();
});
server.use(express.json())

const port = process.env.PORT || 8080

server.use('/teste', (req, res)=>{
    console.log('chegou')
})

server.listen(port, ()=> {
    console.log(`Server rodando na porta ${port}`)
})

module.exports = server