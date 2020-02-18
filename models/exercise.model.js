const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    courseName : {
        type : String
    },
    Delivered: {
        type : Number
    },
    Attended : {
        type : Number
    },
    MinPer : {
        type : Number
    }
});


module.exports = mongoose.model('Exercise',courseSchema);