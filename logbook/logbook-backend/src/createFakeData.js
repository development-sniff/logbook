
const Post = require('./models/post');
module.exports = function createFakeData(){
	//0, 1, ... 39 로 이루어진 배열을 생성, post 데이터로 변환
	const posts = [...Array(40).keys()].map(i => ({
		title: `포스트 #${i}`,
		body: "Lorem ipsum dolor sit amet, ore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		tags: ['가짜', 'data']
	}));
	
	Post.insertMany(posts).then((data) => {
    console.log('데이터 삽입 성공!');
    console.log('--------------------');
    console.log(data);
  })
  .catch((err) => console.log(err));
}