var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;
var { normalize } = require('../Midleware/accentMark');

exports.GetPruebas = async (req) => {
    console.log("CONTROLLER");
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .execute('GetPruebas');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}