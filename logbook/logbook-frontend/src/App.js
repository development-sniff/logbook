import { Route, Routes } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import IndexPage from './pages/IndexPage';
import NotFoundErrorPage from './pages/NotFoundErrorPage';

import {Helmet} from 'react-helmet-async';
const App = () => {
  return (
	  <div>
		  <Helmet>
		  <title>LogBook</title>
		  </Helmet>
    <Routes>
      <Route path="/" element={<IndexPage />} />
	  <Route path="/list" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/postlist/:username">
        <Route index element={<PostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
	  <Route path="/*" element={<NotFoundErrorPage />} />
    </Routes>
	</div>
  );
};
export default App;
