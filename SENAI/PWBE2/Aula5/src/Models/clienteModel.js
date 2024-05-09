const conectarBancoDeDados = require('../config/db');

async function insert(cliente, endereco, telefone) {
    const connection = await conectarBancoDeDados();
    try {
        /**
         * beginTransaction() inicia a transação.
         * commit() confirma a transação, aplicando todas as alterações feitas durante a transação.
         * rollback() reverte a transação, descartando todas as alterações feitas durante a transação.
         */
        await connection.beginTransaction();

        // Insere o cliente, a variável 'res' nos informa qual é o id do cliente para realizar os 'inserts' de endereços e telefones que contém chave estrangeira (FK)
        const res = await connection.query('INSERT INTO cliente (nome, cpf, data_nasc) VALUES (?, ?, ?)', [cliente.nome, cliente.cpf, cliente.data_nasc]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

        // console.log(telefone, endereco);
        // Insere os telefones fazendo uma leitura dos objetos contidos no array
        telefone.forEach(async (tel) => {
            await connection.query('INSERT INTO telefone (id_cliente, tipo, numero) VALUES (?, ?, ?)', [res[0].insertId, tel.tipo, tel.numero]);
        });

        // Insere os endereços fazendo uma leitura dos objetos contidos no array
        endereco.forEach(async (endereco) => {
            await connection.query('INSERT INTO endereco (id_cliente, logradouro, numero, bairro, complemento, cep, cidade, uf) VALUES (?,?,?,?,?,?,?,?)', [res[0].insertId, endereco.logradouro, endereco.numero, endereco.bairro, endereco.complemento, endereco.cep, endereco.cidade, endereco.uf]);
        });

        // Se todas as queries forem bem-sucedidas, um 'commit' é realizado para confirmar as execuções
        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
        // Em caso de erro, um 'rollback' é realizado para cancelar as execuções que foram realizadas
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        // Fecha a conexão com o banco de dados
        await connection.end(null);
    }
}
module.exports = { insert };