import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import IndexComponent from '../components/index/IndexComponent';

const IndexPage = () => {
	/* 로그인 상태라면 /list로 리다이렉트 ... 할까*/
	// const { user } = useSelector(({ user }) => ({ user: user.user }));
	// const dispatch = useDispatch();
	// const onLogout = () => {
	// dispatch(logout());
	// };
	
  return (
    <div style={{backgroundColor: '#f7f8ff'}}>
		  <HeaderContainer />
		  <IndexComponent />
		  <Footer/>
	 </div>
  );
};

export default IndexPage;
