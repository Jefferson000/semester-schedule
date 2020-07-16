var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.GetProcedures = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetProceduresInfo');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.GetTables = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetTablesInfo');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}