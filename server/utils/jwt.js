require('dotenv').config();
const jwt = require('jsonwebtoken');

const signToken = (data) => jwt.sign(data,process.env.JWT_SECRET_ACCESS,{expiresIn:'1h'});
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_ACCESS);

module.exports = {
    signToken,
    verifyToken
}