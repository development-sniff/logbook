import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/posts/Pagination';

const PaginationContainer = () => {
	const [searchParams] = useSearchParams();
	const {username} = useParams();
	const tag = searchParams.get('tag');
	//page가 없으면 1을 기본 값으로 사용
	const page= parseInt(searchParams.get('page'), 10) || 1;
	const {lastPage, posts, loading} = useSelector(({posts, loading}) => ({
		lastPage : posts.lastPage,
		posts: posts.posts,
		loading: loading['posts/LIST_POSTS'],
	}));
	
	//포스트 데이터가 없거나 로딩중이면 보여주지 않음
	if (!posts || loading) return null;
	
	return(
		<Pagination
			tag={tag}
			username={username}
			page={parseInt(page, 10)}
			lastPage={lastPage}
			></Pagination>
	);
};

export default PaginationContainer;