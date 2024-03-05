const clienteModel = require('../models/ClienteModel');
    



const clienteController = {

   
    //RETORNA TODOS OS CLIENTES;
    selectCliente: async (req, res) => {

        try {
            const clientes = await clienteModel.selectCliente();
            return res.json(clientes);

        } catch (error) {
            throw error;
        }


    },

    //RETORNA O CLIENTE COM BASE NO ID INFORMADO
    selectOneCliente: async (req, res) => {
        const { id } = req.params;

        try {
            const cliente = await clienteModel.selectOneCliente(id);
            return res.json(cliente);
        } catch (error) {
            return res.send('ID Não encontrado');
        }
    },


    //CREATE - CRIAR UM NOVO CLIENTE
    insertCliente: async (req, res) => {
        const { nome, idade } = req.body;
        const result2 = await clienteModel.insertCliente({ nome: nome, idade: idade });

        
        const clientes = await clienteModel.selectCliente();
        return res.json(clientes);
    },

    //UPDATE - ATUALIZANDO UM CLIENTE
    updateCliente: async (req, res) => {
        const { id } = req.params;
        const { nome, idade } = req.body;
        const result2 = await clienteModel.updateCliente(id, { nome: nome, idade: idade });

        const clientes = await clienteModel.selectCliente();
        return res.json(clientes);
    },

    // EXCLUINDO UM CLIENTE
    deleteCliente: async (req, res) => {
        const { id } = req.params;
        const result = await clienteModel.deleteCliente(id);
        return res.json({ message: ` ID ${id} Registro excluído com sucesso!` })
    },

}


module.exports = clienteController ;