const jwt = require('jsonwebtoken');
const httpstatustext = require('../uitlls/httpstatus');
const apperror = require('../uitlls/apperror');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader) {
        const error = apperror.create('Authorization header is missing.', 401, httpstatustext.ERROR);
        return next(error);
    }

    try {
        const currentuser = jwt.verify(token, process.env.JWT_SECRET);
         req.currentuser = currentuser;
         console.log(currentuser);
        next();
    } catch (err) {
        const error = apperror.create('Invalid token.', 401, httpstatustext.ERROR);
        return next(error);
    }
};

module.exports = verifyToken;
