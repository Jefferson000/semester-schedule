var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.CreateClassroom = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('number',sql.Int,req.number)
            .input('capacity', sql.Int, req.capacity)
            .input('classroomType',sql.Int, req.classroomType)
            .output('success', sql.Bit, 0)
            .execute('CreateClassroom');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.GetClassrooms = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetClassrooms');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.UpdateClassroom = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('classroom_id', sql.Int, req.classroom_id)
            .input('number',sql.Int,  !req.number ? null : req.number)
            .input('capacity', sql.Int,  !req.capacity ? null : req.capacity)
            .input('classroomType',sql.Int,  !req.classroomType ? null : req.classroomType)
            .output('success', sql.Bit, 0)
            .execute('UpdateClassroom');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.DeleteClassroom = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .input('classroom_id', sql.Int, req.classroom_id)
            .output('success', sql.Bit, 0)
            .execute('DeleteClassroom');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        console.log(excepcion);
        sql.close();
        throw excepcion;
    }
}