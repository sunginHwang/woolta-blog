import { createStandardAction } from 'typesafe-actions';
import { asyncActionTypeCreator, createReducer } from '../../core/util/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../models/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import IPosts from '../../models/post/IPosts';

const prefix: string = 'POSTS_';

const RECENT_POSTS: IAsyncAction = asyncActionTypeCreator(`${prefix}GET_RECENT_POSTS`);

export const getRecentPosts = createStandardAction(RECENT_POSTS.INDEX)<Promise<AxiosResponse<IPosts[]>>>();

export interface postsInitType {
  posts: IPosts[],
  loading: boolean
}

const initialState: postsInitType = {
  posts: [],
  loading: false,
};

export default createReducer({
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
}, initialState);

