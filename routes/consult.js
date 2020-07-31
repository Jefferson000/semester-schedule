var express = require('express');
var router = express.Router();
var middleware = require('../Midleware/midleware');
const consultController = require('../controllers/consult');
var HttpStatus = require('http-status-codes');
var custom_consts = require('../config/constants');

router.get('/GetPrueba', (req, res) => {
    //console.log('INICIA NUEVA CONSULTA************************');
    consultController.SetData(req.query)
    .then(result => {
        //console.log('Result',result);
        res.status(HttpStatus.OK).json( {data: result });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
});

router.get('/FirstConsult', (req, res) => {
    //console.log('INICIA NUEVA CONSULTA************************');
    consultController.FirstConsult(req.query)
    .then(result => {
        //console.log('Result',result);
        res.status(HttpStatus.OK).json( {data: result });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
});


module.exports = router;