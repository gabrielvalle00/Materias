const express = require("express");

const app = express();

app.use(express.json());

//RETORNA TODOS OS CLIENTES EXISTENTES NA TABELA
app.get("/clientes", async (req, res) => {

    const clientes = await selectCliente();
    return res.json(clientes);

});


//RETORNA O CLIENTE COM BASE NO ID INFORMADO
app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await selectOneCliente(id);
        return res.json(cliente);
    } catch (error) {
        return res.send('ID Não encontrado');
    }
});


//CREATE - CRIAR UM NOVO CLIENTE
app.post('/clientes', async (req, res) => {
    const { nome, idade } = req.body;
    const result = await insertCliente({ nome: nome, idade: idade });
    console.log(result);
    const clientes = await selectCliente();
    return res.json(clientes);
});


//UPDATE - ATUALIZANDO UM CLIENTE
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const result2 = await updateCliente(id, { nome: nome, idade: idade });

    const clientes = await selectCliente();
    return res.json(clientes);
});


// EXCLUINDO UM CLIENTE
app.delete('/clientes/:id', async (req, res) => {
    const {id} = req.params;
    const result = await deleteCliente(id);
    return res.json({message: `Registro excluído com sucesso!`})
})



//BANCO DE DADOS
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mysql2 = require("mysql2/promise");
    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234'
    });

    console.log("Conectou no MySQL!");
    global.connection = con;
    return con;
}


//MODELS


async function selectCliente() {

    const conn = await connect();
    const [rows] = await conn.query('select * from clientes;');
    return rows;
}

// SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES;
async function selectOneCliente(id) {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE id=?;';
    const values = id;

    const [rows] = await conn.query(sql, values);

    if (rows.length === 0) {
        throw new Error('Cliente não encontrado');
    }

    return rows;
}

//INSERE UM NOVO REGISTRO NA TABELA CLIENTES;
async function insertCliente(cliente) {
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,idade) VALUES (?,?);';
    const values = [cliente.nome, cliente.idade];
    return await conn.query(sql, values);
}


// ATUALIZA UM REGISTRO DA TABELA CLIENTES;
async function updateCliente(id, cliente) {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?;';
    const values = [cliente.nome, cliente.idade, id];

    return await conn.query(sql, values);
}


// DELETA UM REGISTRO DA TABELA CLIENTES;
async function deleteCliente(id) {
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';

    return await conn.query(sql, [id]);
}


app.listen(3000, () => {
    console.log("Servidor respondendo na porta 3000");
});