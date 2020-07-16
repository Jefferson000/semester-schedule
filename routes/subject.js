var express = require('express');
var router = express.Router();
var middleware = require('../Midleware/midleware');
const subjectController = require('../controllers/subject');
var HttpStatus = require('http-status-codes');
var custom_consts = require('../config/constants');

router.post('/CreateSubject', (req, res) => {
    subjectController.CreateSubject(req.body)
    .then(result => {
        if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
        else res.status(HttpStatus.BAD_REQUEST).json({ error: result.recordset[0].err});
    })
    .catch(err => {
        console.log(res);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
    })
});

router.get('/GetSubjects', (req, res) => {
    subjectController.GetSubjects(req.query)
    .then(result => {
        res.status(HttpStatus.OK).json( {data: result.recordset });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
});

router.put('/UpdateSubject', (req, res) => {
    subjectController.UpdateSubject(req.body)
    .then(result => {
        if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
        else res.status(HttpStatus.BAD_REQUEST).json({ error: result.recordset[0].err});
    })
    .catch(err => {
        console.log(res);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
    })
});

router.delete('/DeleteSubject', (req, res) => {
    subjectController.DeleteSubject(req.query)
    .then(result => {
        res.status(HttpStatus.OK).json( {data: result.recordset });
    })
    .catch(err => {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    })
});


module.exports = router;



// pruebasController.GetPruebas(req.query)
// .then(result => {
//     res.status(HttpStatus.OK).json( {data: result.recordset });
// })
// .catch(err => {

//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
// })
//TODO ADD POST
// pruebasController.GetPruebas(req.body)
// .then(result => {
//     if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
//     else res.status(HttpStatus.BAD_REQUEST).json({ error: result.recordset[0].err});
// })
// .catch(err => {
//     console.log(res);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message })
// })
