const { connect } = require('../config/db');

const modelCliente = {

    selectCliente: async () => {

        try {
            const conn = await connect();
            const [rows] = await conn.query('select * from clientes;');
            return rows;

        } catch (error) {
            throw error;
        }


    },

    // SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES;
    selectOneCliente: async (nome) => {
        const conn = await connect();
        const sql = 'SELECT * FROM clientes WHERE nome=?;';
        const values = nome;

        const [rows] = await conn.query(sql, values);

        if (rows.length === 0) {
            throw new Error('Cliente não encontrado');
        }

        return rows;
    },

    //INSERE UM NOVO REGISTRO NA TABELA CLIENTES;
    insertCliente: async (cliente) => {
        const conn = await connect();
        const sql = 'INSERT INTO clientes(nome,telefone_celular,telefone_fixo,email) VALUES (?,?,?,?);';
        const values = [cliente.nome, cliente.telefone_celular, cliente.telefone_fixo, cliente.email];
        return await conn.query(sql, values);
    },


    // ATUALIZA UM REGISTRO DA TABELA CLIENTES;
    updateCliente: async (id, cliente) => {
        const conn = await connect();
        const sql = 'UPDATE clientes SET nome=?, telefone_celular=?, telefone_fixo=?, email=? WHERE id=?;';
        const values = [cliente.nome, cliente.telefone_celular, cliente.telefone_fixo, cliente.email, id];

        return await conn.query(sql, values);
    },


    // DELETA UM REGISTRO DA TABELA CLIENTES;
    deleteCliente: async (id) => {
        const conn = await connect();
        const sql = 'DELETE FROM clientes WHERE id=?;';

        return await conn.query(sql, [id]);
    },



};


    module.exports = modelCliente;