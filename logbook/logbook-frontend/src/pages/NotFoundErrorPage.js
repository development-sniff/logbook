import React from 'react';
import Footer from '../components/common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';
import styled from 'styled-components';

const NotFoundBlock = styled.div`
	margin-top: 3rem;
	min-height: calc(100vh - 258px - 3rem);
`;

const NotFoundErrorPage = () => {
	/* 로그인 상태라면 /list로 리다이렉트 ... 할까*/
  return (
    <div>
		  <HeaderContainer/>
		  <NotFoundBlock>
			  <img src = 'img/shipimg.png' width="500px"/>
			  <br/>
			  존재하지않는 페이지입니다!<br/>
			  주소를 다시 확인해주세요!<br/>
		  </NotFoundBlock>
		  <Footer/>
	 </div>
  );
};

export default NotFoundErrorPage;
