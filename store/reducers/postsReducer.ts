import { createReducer } from 'typesafe-actions';
import { apiRequestThunk, asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { IPost } from '../../types/post/IPost';
import { fetchPosts, fetchRecentPosts } from '../../core/api/blogApi';

const prefix: string = 'POSTS_';

const GET_RECENT_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_RECENT_POSTS`);
const GET_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_POSTS`);

export const getPosts = apiRequestThunk(GET_POSTS, fetchPosts);
export const getRecentPosts = apiRequestThunk(GET_RECENT_POSTS, fetchRecentPosts);

export interface postsInitType {
  posts: IPost[],
  loading: boolean
}

const initialState: postsInitType = {
  posts: [],
  loading: false,
};

export default createReducer(initialState, {
  [GET_POSTS.PENDING]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = true;
    }),
  [GET_POSTS.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = action.payload;
    }),
  [GET_POSTS.FAILURE]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = initialState.posts;
    }),
  [GET_RECENT_POSTS.PENDING]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = true;
    }),
  [GET_RECENT_POSTS.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = action.payload;
    }),
  [GET_RECENT_POSTS.FAILURE]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = initialState.posts;
    }),
});

