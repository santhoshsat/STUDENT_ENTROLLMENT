const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    name:{
        type:String,
    },
    entrolledDepartment:{
        type:String,
    },
    entrollmentDate:{
        type:Date,
        default:Date.now()
    }
});
const StudentModls = mongoose.model('studentModel',studentSchema)

module.exports = StudentModls;