const jwt = require('jsonwebtoken');
module.exports=(paylod)=>{
    const token =jwt.sign(paylod,process.env.JWT_SECRET,{expiresIn:'10m'});
    return token;
}