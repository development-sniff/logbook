const Joi = require('joi');
const User = require('../../models/user');


/*
POST /api/auth/register
{
username: 'A',
password" 'B'
}
*/

exports.register = async ctx => {
	//Body 체크
	const schema = Joi.object().keys({
		username: Joi.string()
		.alphanum()
		.min(3)
		.max(20)
		.required(),
		password: Joi.string().required(),
	});
	const result = schema.validate(ctx.request.body);
	if (result.error){
		ctx.status = 400;
		ctx.body = result.error;
		return;
	}
	// 체크 끝
	const {username, password} = ctx.request.body;
	try{
		//username이 존재하는지 체크
		const exists = await User.findByUsername(username);
		if(exists){
			ctx.status = 409 // Conflict
			return;
		}
		const user = new User({
			username,
		});
		await user.setPassword(password);
		await user.save();
		
		ctx.body = user.serialize();
		
		const token = user.generateToken();
		ctx.cookies.set('access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		})
	} catch(e){
		ctx.throw(500, e);
	}
};

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;

  // username, password 가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.check = async ctx => {
	const {user} = ctx.state;
	if(!user){
		//login 중이 아니다. 
		ctx.status = 401//Unauthorized
		return;
	}
	ctx.body = user;
};

/*
POST /api/auth/logout
*/
exports.logout = async ctx => {
	ctx.cookies.set('access_token');
	ctx.status = 204; //No content
};

