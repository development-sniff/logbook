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
		.required()
		.messages({
			'string.alphanum': '아이디는 영문자 및 숫자로만 이루어질 수 있습니다.',
			'string.min': '아이디는 3자 이상이어야합니다.',
			'string.max': '아이디는 20자를 넘을 수 없습니다.',
			'any.required': '아이디를 입력해주세요.'
		}),
		password: Joi.string()
		.min(6)
		.max(20)
		.regex(/^[!@#$%^&*a-zA-Z0-9]{3,30}$/)
		.regex(/[a-z]/, '비밀번호는 영어 소문자를 포함해야합니다.')
		.regex(/[A-Z]/, '비밀번호는 영어 대문자를 포함해야합니다.')
		.regex(/[0-9]/, '비밀번호는 숫자를 포함해야합니다.')
		.regex(/[!@#$%^&*]/, '비밀번호는 특수문자를 포함해야합니다.')
		.required()
		.messages({
			'string.min': '비밀번호는 6자 이상이어야합니다.',
			'string.max': '비밀번호는 20자를 넘을 수 없습니다.',
			'string.pattern.base': '비밀번호는 영문자 대/소, 숫자, 일부 특수문자(!@#$%^&*)만 사용하실 수 있습니다.',
			'any.required': '비밀번호를 입력해주세요.'
		}),
	});
	const result = schema.validate(ctx.request.body);
	if (result.error){
		//regex를 여러 개 적용할 때는 messages를 이용한 타입 감별만으로는 커스텀 메시지를 만들 수 없음.
		//따라서 name 필드를 메시지로 이용, name => message로 포팅해서 front-end에 메시지를 전달.  
		if(result.error.details[0].type === 'string.pattern.name'){
			result.error.details[0].message = result.error.details[0].context.name;
		}
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

