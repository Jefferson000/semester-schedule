var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.CreateProfessor = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('name', sql.VarChar(50), req.name)
            .input('schedule',sql.VarChar(500), req.schedule)
            .input('subject_name',sql.VarChar(50), req.subject_name)
            .output('success', sql.Bit, 0)
            .execute('CreateProfessor');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.GetProfessors = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetProfessors');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.UpdateProfessor = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('professor_id',sql.Int, req.professor_id)
            .input('name', sql.VarChar(50),  !req.name ? null : req.name)
            .input('schedule',sql.VarChar(500),  !req.schedule ? null : req.schedule)
            .input('subject_name',sql.VarChar(50),  !req.subject_name ? null : req.subject_name)
            .output('success', sql.Bit, 0)
            .execute('UpdateProfessor');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.DeleteProfessor = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('professor_id',sql.Int, req.professor_id)
            .output('success', sql.Bit, 0)
            .execute('DeleteProfessor');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}