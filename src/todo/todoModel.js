const mongoose=require("mongoose");

const todoSchema=new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String
	}
},{timestamps:true});

const Todo=mongoose.model("Todo",todoSchema);

module.exports=Todo;
