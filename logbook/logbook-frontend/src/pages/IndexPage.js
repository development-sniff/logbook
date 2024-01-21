import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';

const IndexPage = () => {
	/* 로그인 상태라면 /list로 리다이렉트 ... 할까*/
  return (
    <div>
		  <HeaderContainer />
		  인덱스 페이지
		  <Footer/>
	 </div>
  );
};

export default IndexPage;
