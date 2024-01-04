import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';

const PostPage = () => {
  return (
  <div>
	<HeaderContainer></HeaderContainer>
	<PostViewerContainer></PostViewerContainer>
  </div>
  );
};

export default PostPage;
