let mongoose=require('mongoose')
let Schema=mongoose.Schema;
let BookSchema=new Schema({
	title:String,
	author:String,
	url:String
})
module.exports=mongoose.model('book',BookSchema)