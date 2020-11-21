var mongoose=require('mongoose');

var PatientSchema= new mongoose.Schema({
	name: String,
	location: String,
    symptoms:String,
    contact:String,
    status:String,
    bg:String,
    bedno:String,
    vent:{
        type:Boolean,
        default:false
    },
    remarks:String,
    admdate:Date

});


module.exports=mongoose.model('Patient',PatientSchema)