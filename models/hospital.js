var mongoose=require('mongoose');

var HospitalSchema= new mongoose.Schema({
	name: String,
	pattern: String,
    phone:String,
    address:String,
    beds:Number,
    ventilators:Number,
    recovered:{
        type:Number,
        default:100
    },
    deceased:{
        type:Number,
        default:50
    },
    admitted:{
        type:Number,
        default:60
    }

});

module.exports=mongoose.model('Hospital',HospitalSchema);