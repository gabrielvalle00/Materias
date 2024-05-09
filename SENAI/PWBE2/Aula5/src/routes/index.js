const express = require('express');
const router = express.Router();

const ClienteController = require('../Controllers/clienteController');

// router.get('/', ClienteController.index);
router.post('/cadastro/novo', ClienteController.adicionarCliente);

module.exports = router;