import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import Footer from '../components/common/Footer';
import styled from 'styled-components';


const PostPage = () => {
  return (
  <div>
	<HeaderContainer></HeaderContainer>
	<PostViewerContainer></PostViewerContainer>
	<Footer></Footer>
  </div>
  );
};

export default PostPage;
