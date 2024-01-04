next 함수는 Promise를 반환  - koa가 express와 차별화되는 부분

.env  
PORT=4000  
MONGO_URI=mongodb://52.79.183.214:27017/blog  
JWT_SECRET='비밀키'  
  
jwt . . .  
토큰을 localStorage, sessionStorage에 답음면 XSS에 취약,  
쿠키에 담았을때 httpOnly로 악성스크립트는 막을 수 있음다. 하지만 CSRF에 취약해짐  
그래도 CSRF는 CSRF토큰을 쓰거나 Referer 검증 등등 방법으로 어떻게든 막을 수 있다.  
그렇기에 이번 blog에는 토큰을 쿠키에 담아서 사용  