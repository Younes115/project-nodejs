const controller  = require('../controller/courses.controller');
const {body}=require('express-validator');
const verifyToken = require('../midellware/verifyToken');
const allowedTo = require('../midellware/allowedTo');
const userRole = require('../uitlls/userRoles')

const express = require('express');
const { validation } = require('../midellware/validation');
const router = express.Router();

router.route('/')
    .get(controller.getallcourses)
    .post(validation(),controller.createcourse)
router.route('/:courseid') 
    .get(controller.getcourse)
    .patch(controller.updatecourse)
    .delete(verifyToken,allowedTo(userRole.ADMIN,userRole.MANAGER),controller.deletecourse);
//first way of validation
// app.post('/api/courses',(req,res)=>{
  
//     console.log(req.body);
//     if(!req.body.title || !req.body.price){
//         return res.status(400).json({message:'Please enter data'});
//     }
//     courses.push({id:courses.length+1,...req.body});
  
//     res.json(courses)
// });




module.exports=router;
