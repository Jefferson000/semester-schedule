exports.validateRequest = (fields, bodyRequest) => {
    return (req, res, next) => {
        if (fields.length != 0) {
            var request = bodyRequest ? req.body : req.query;
            for (const field of fields) {
                if (!request[field] && request[field] != 0) {
                    console.log("No ha llegado el parametro");
                    return res.status(HttpStatus.BAD_REQUEST).json({ err: `${field} no se encuentra en los parámetros` });
                }
            }
        }
        next();
    }
};