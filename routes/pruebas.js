var express = require('express');
var router = express.Router();
var middleware = require('../Midleware/midleware');
const pruebasController = require('../controllers/pruebas');
var HttpStatus = require('http-status-codes');
var custom_consts = require('../config/constants');

router.get('/GetPruebas', (req, res) => {
    pruebasController.GetPruebas(req.body)
        .then(result => {
            if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
            else res.status(HttpStatus.BAD_REQUEST).json({ error: result.recordset[0].err});
        })
        .catch(err => {
            console.log(res);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
        })
});

module.exports = router;