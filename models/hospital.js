var mongoose=require('mongoose');

var HospitalSchema= new mongoose.Schema({
	name: String,
	pattern: String,
    phone:String,
    address:String,
    beds:Number,
    ventilators:Number
 
});

module.exports=mongoose.model('Hospital',HospitalSchema);