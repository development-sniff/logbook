require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');

const jwtMiddleware = require('./lib/jwtMiddleware');

const {PORT, MONGO_URI} = process.env;


mongoose.connect(MONGO_URI)
	.then(()=>{
	console.log('Connected to MongoDB')
	// createFakeData(); fake 데이터 생성
	})
	.catch(e => {
	console.error(e);
});

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); // api 라우트


//라우터 적용 전 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스터스에 라우터 적용 
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../logbook-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
	//NOT FOUND이며 주소가 /api가 아니라면
	if (ctx.status === 404 && ctx.path.indexOf('api') !== 0){
		//index.html
		await send(ctx, 'index.html', {root: buildDirectory});
	}
});

const port = PORT || 4000;

app.listen(port, () => {
	console.log('Listening to port %d', port);
});

