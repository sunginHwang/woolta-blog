import { createReducer, createStandardAction } from 'typesafe-actions';
import { asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import IPosts from '../../types/post/IPosts';

const prefix: string = 'POSTS_';

const RECENT_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_RECENT_POSTS`);
const GET_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_POSTS`);

export const getPosts = createStandardAction(GET_POSTS.INDEX)<Promise<AxiosResponse<IPosts[]>>>();
export const getRecentPosts = createStandardAction(RECENT_POSTS.INDEX)<Promise<AxiosResponse<IPosts[]>>>();

export interface postsInitType {
  posts: IPosts[],
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
  [GET_POSTS.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<postsInitType>(state, draft => {
      console.log('getIn');
      draft.loading = false;
      draft.posts = action.payload.data.data;
    }),
  [GET_POSTS.REJECTED]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = initialState.posts;
    }),
  [RECENT_POSTS.PENDING]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = true;
    }),
  [RECENT_POSTS.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<postsInitType>(state, draft => {
      console.log('getIn');
      draft.loading = false;
      draft.posts = action.payload.data.data;
    }),
  [RECENT_POSTS.REJECTED]: (state) =>
    produce<postsInitType>(state, draft => {
      draft.loading = false;
      draft.posts = initialState.posts;
    }),
});

