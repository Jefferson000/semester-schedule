var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.GetPruebas = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetPruebas');
        sql.close();
        console.log(result)
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}