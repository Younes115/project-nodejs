const express = require('express');
const httpstatustext=require('./uitlls/httpstatus.js');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const url =process.env.MONGO_URL ;
console.log(url);
mongoose.connect(url).then(()=>{
    console.log('Connected to the database');
});
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors())
app.use(express.json());
// app.use(bodyParser.json());
const router = require('./router/courses.router.js');
const usersrouter = require('./router/users.router.js');
const e = require('express');
 app.use("/api/courses",router);

 app.use("/api/users",usersrouter);
 
 app.all('*',(req ,res)=>{
     res.status(404).json({Status:httpstatustext.ERROR,message:'Page not found'});
 });

 app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging
    res.status(err.statuscode || 500).json({ Status: err.statustext||httpstatustext.ERROR, message: err.message,code:err.statuscode || 500, date:null });
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
