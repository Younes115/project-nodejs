const apperror = require("../uitlls/apperror");
const httpstatustext = require("../uitlls/httpstatus");
module.exports = (...roles) => {
    return (req,res,next) =>{
        console.log("hello user");
        if(!roles.includes(req.currentuser.Role)){
            const error = apperror.create("You are not allowed to access this resource", 403, httpstatustext.ERROR);
            return next(error);
        }
        next();
    }
}