var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.CreateSubject = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('name', sql.VarChar(50), req.name)
            .input('schedule',sql.VarChar(500), req.schedule)
            .input('subject_type',sql.Int, req.subject_type)
            .input('credits',sql.Int,req.credits)
            .input('semester',sql.Int,req.semester)
            .output('success', sql.Bit, 0)
            .execute('CreateSubject');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.GetSubjects = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetSubjects');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.UpdateSubject = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('subject_id',sql.Int, req.subject_id)
            .input('name', sql.VarChar(50),  !req.name ? null : req.name)
            .input('schedule',sql.VarChar(500),  !req.schedule ? null : req.schedule)
            .input('subject_type',sql.Int,  !req.subject_type ? null : req.subject_name)
            .input('credits',sql.Int, !req.credits ? null : req.credits)
            .input('semester',sql.Int,  !req.semester ? null : req.semester)
            .output('success', sql.Bit, 0)
            .execute('UpdateSubject');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.DeleteSubject = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('subject_id',sql.Int, req.subject_id)
            .output('success', sql.Bit, 0)
            .execute('DeleteSubject');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}