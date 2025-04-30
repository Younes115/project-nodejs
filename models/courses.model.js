const mongoose = require('mongoose');
const schema = mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});
const Course = mongoose.model('Course',schema);
module.exports = Course;