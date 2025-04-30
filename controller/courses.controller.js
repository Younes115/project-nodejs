const {validationResult}=require('express-validator');
const Course = require('../models/courses.model');
const httpstatustext=require('../uitlls/httpstatus.js');
const asyncfn=require('../midellware/asyncwraber');
const asyncwraber = require('../midellware/asyncwraber');
const apperror = require('../uitlls/apperror.js');
let getallcourses=asyncwraber(async (req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1 ) * limit;
    const courses= await Course.find({},{"__v":0}).limit(limit).skip(skip);
    res.json({Status:httpstatustext.SUCCESS,data:courses});
});

let getcourse = asyncwraber(
    async(req,res,next)=>{
    const fcourse = await Course.findById(req.params.courseid);
    if(!fcourse){
        const error= apperror.create("course not found",404,httpstatustext.NOTFOUND);
        return next(error);
    }
   return res.json({Status:httpstatustext.SUCCESS,data:fcourse});
}); 


let createcourse=asyncwraber(async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error = apperror.create("validation error",400,httpstatustext.INVALID,errors.array());
        return next(error);
         
    }
        const newcourse=new Course(req.body);
      await newcourse.save()
    res.json({Status:httpstatustext.CREATED,data:newcourse});
});

let updatecourse = asyncwraber( async (req, res,next) => {
        const courseid = req.params.courseid;
        const course = await Course.findById(courseid);

        if (!course) {
            const error = apperror.create("course not found", 404, httpstatustext.NOTFOUND);
            return next(error);
        }

        const courseupdate = await Course.updateOne({ _id: courseid }, { $set: { ...req.body } });
        res.json({Status:httpstatustext.UPDATED,data: courseupdate });
    });

let deletecourse =asyncwraber( async (req, res,next) => {
    const courseid = req.params.courseid;
    const course = await Course.findByIdAndDelete(courseid);

    if (!course) {
        const error = apperror.create("course not found", 404, httpstatustext.NOTFOUND);
        return next(error);
    }

    res.json({ Status: httpstatustext.DELETED, data: course });
});

module.exports={
    getallcourses,
    getcourse,
    createcourse,
    updatecourse,
    deletecourse
}