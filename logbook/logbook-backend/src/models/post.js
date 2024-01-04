// import mongoose from 'mongoose'; // ES6
const mongoose = require('mongoose'); // common js 
const {Schema} = mongoose;

const PostSchema = new Schema({
	title:String,
	body: String,
	tags: [String],
	publishedDate: {
		type: Date,
		default: Date.now, //현재 날짜를 기본으로 지정
	},
	user:{
		_id : mongoose.Types.ObjectId,
		username:String,
	},
});

const Post = mongoose.model('Post', PostSchema);
// export default Post;
module.exports = Post;