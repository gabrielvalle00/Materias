const Cliente = require('../Models/Cliente');
const Endereco = require('../Models/Endereco');
const Telefone = require('../Models/Telefone');
const { insert } = require('../Models/clienteModel');


const clienteController = {

    adicionarCliente: async (req, res) => {
        try {

            const {nome, dt_nasc, cpf, endereco, telefone} = req.body;

            const objCliente = new Cliente(null, nome, dt_nasc, cpf);

            const objEndereco = [];
            const objTelefone = [];

            if (endereco.length > 0) {

                endereco.forEach(value => {
                    objEndereco.push(new Endereco(value));
                    
                });
            }

            if (telefone.length > 0) {
                telefone.forEach(value => {
                    objTelefone.push(new Telefone(value));
                });
            }

            const result = await insert(objCliente, objEndereco, objTelefone);
            return res.json(result);

        } catch (error) {
            console.log(error);
            // let error_message = verificaErro(error);
            res.json(error);
        }
    }

};

module.exports = clienteController;