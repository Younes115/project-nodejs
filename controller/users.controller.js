const Asyncwrapper = require("../midellware/asyncwraber.js");
const User = require("../models/users.model.js");
const apperror = require("../uitlls/apperror.js");
const httpstatustext = require("../uitlls/httpstatus.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../uitlls/generateJWT.js");

const getAllUsers = Asyncwrapper(async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
  
    const users = await User.find({}, { "__v": 0 }).limit(limit).skip(skip);
    
    res.json({status: httpstatustext.SUCCESS, data: users});
});
const registerUser = Asyncwrapper(async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password,Role } = req.body;

    const olduser = await User.findOne({ email: email });
    if (olduser) {
        const error = apperror.create("User is already signed", 400, httpstatustext.INVALID);
        return next(error);
    }
    const hashingpassowrd = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
         lastName,
          email,
           password: hashingpassowrd,
           Role,
        //    avatar: req.file.filename
        });
        const jwtToken =await generateJWT({ email:newUser.email , id: newUser._id, Role: newUser.Role });
        console.log(jwtToken);
        newUser.token = jwtToken;
    await newUser.save();
    res.json({status: httpstatustext.CREATED, data: newUser});
});

const loginUser = Asyncwrapper(async (req, res,next) => {
    const {email , password} = req.body;
    if (!email || !password){
        const error = apperror.create("Please provide email and password", 400, httpstatustext.INVALID);
        return next(error);
    }
    const user = await User.findOne({email: email});

    if (!user){
        const error = apperror.create("User not found", 400, httpstatustext.INVALID);
        return next(error);
    }

  
    let isMatch ;
    try{
      isMatch=await bcrypt.compare(password, user.password);
    }
    catch (err){
        const error = apperror.create("Invalid credentials", 400, httpstatustext.INVALID);
        return next(error);
    }
    const Token = await generateJWT({ email:user.email , id: user._id, Role: user.Role });
    res.json({status: httpstatustext.SUCCESS, data: {user_id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName,Token}});
});

module.exports = {
    getAllUsers,
    registerUser,
    loginUser
};