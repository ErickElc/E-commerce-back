const routes = require('./src/routes/index.routes');
const db = require('./src/config/db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const PORT = 8877 || process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors())

routes(app);

app.listen(PORT, ()=>{
    console.log(`Server escutando na porta ${PORT}`);
})

db.on('error', ()=> {console.log('não foi possível se conectar com banco de dados')});

db.once('open', ()=>{
    console.log('Conexão com o banco de dados feito com sucesso!')
})