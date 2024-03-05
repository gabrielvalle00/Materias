const express = require('express');


const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.selectCliente);
router.get('/clientes/:id', clienteController.selectOneCliente);
router.post('/clientes', clienteController.insertCliente);
router.put('/clientes/:id', clienteController.updateCliente);
router.delete('/clientes/:id', clienteController.deleteCliente);


module.exports = router;