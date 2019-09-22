import { createReducer, createStandardAction } from 'typesafe-actions';
import { apiRequestThunk, asyncActionTypeCreator, asyncActionTypeCreator2 } from '../../core/utils/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

import { produce } from 'immer';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { AxiosResponse } from 'axios';
import { IPost } from '../../types/post/IPost';
import { fetchPostInfo } from '../../core/api/blogApi';

const prefix: string = 'POST_';

const GET_POST: IAsyncAction = asyncActionTypeCreator2(`${prefix}GET_POST`);
const DELETE_POST: IAsyncAction = asyncActionTypeCreator(`${prefix}DELETE_POST`);
const POST_INFO_INITIALIZE: string = `${prefix}POST_INFO_INITIALIZE`;
const MODIFY_POST: string = `${prefix}MODIFY_POST`;

export const modifyPost = createStandardAction(MODIFY_POST)<void>();
export const postInfoInitialize = createStandardAction(POST_INFO_INITIALIZE)<void>();
export const getPost = apiRequestThunk(GET_POST, fetchPostInfo);
export const deletePost = createStandardAction(DELETE_POST.INDEX)<Promise<AxiosResponse<void>>>();


export interface postInitType {
  post: IPost;
  loading: boolean
}

const initialState: postInitType = {
  post: {
    postNo: 0,
    title: '',
    content: '',
    writer: {
      no: 0,
      nickName: '',
      imageUrl: '',
    },
    authorNo: '',
    categoryLabel: '',
    createdAt: '',
  },
  loading: false,
};

export default createReducer(initialState, {
  [GET_POST.PENDING]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = true;
    }),
  [GET_POST.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = action.payload;
    }),
  [GET_POST.FAILURE]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = initialState.post;
    }),
  [DELETE_POST.PENDING]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = true;
    }),
  [DELETE_POST.FULFILLED]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
      draft.post = initialState.post;
    }),
  [DELETE_POST.REJECTED]: (state) =>
    produce<postInitType>(state, draft => {
      draft.loading = false;
    }),
  [POST_INFO_INITIALIZE]: (state) =>
    produce<postInitType>(state, draft => {
      draft.post = initialState.post;
    }),
});





