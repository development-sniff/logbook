const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const checkLoggedIn = require('../../lib/checkLoggedIn');

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

// - 위 아래 동일 기능 -
// posts.get('/', postsCtrl.list);
// posts.post('/', postsCtrl.write);
// posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
// posts.delete('/:id',postsCtrl.checkObjectId, postsCtrl.remove);
// posts.patch('/:id',postsCtrl.checkObjectId, postsCtrl.update);

module.exports = posts;
