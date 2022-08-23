const httpStatusCodes = require("../utils/httpStatusCodes");
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    let token = req.headers.authorization.split(' ');
    if (!token)
        return res.status(httpStatusCodes.UNAUTHORIZED).send({message:'Unauthorized'});
    if (token[0] == 'Bearer')
            token = token[1];
    else token = 'ass';
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(httpStatusCodes.UNAUTHORIZED).send({message:'Unauthorized'});
    }
};

module.exports = authMiddleware;