var mongoose=require('mongoose');

var PatientSchema= new mongoose.Schema({
	username: String,
	password: String,
    ename:String,
    hospitalid:String,

});


module.exports=mongoose.model('Patient',PatientSchema)