var express = require('express');
var router = express.Router();
var middleware = require('../Midleware/midleware');
const infoController = require('../controllers/info');
var HttpStatus = require('http-status-codes');
var custom_consts = require('../config/constants');

router.get('/GetProcedures', (req, res) => {
    infoController.GetProcedures(req.query)
    .then(result => {
        res.status(HttpStatus.OK).json( {data: result.recordset });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
});

router.get('/GetTables', (req, res) => {
    infoController.GetTables(req.query)
    .then(result => {
        res.status(HttpStatus.OK).json( {data: result.recordset });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
}); 

module.exports = router;