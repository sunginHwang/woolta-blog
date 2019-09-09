import { produce } from 'immer';
import { createAsyncAction, createReducer, createStandardAction } from 'typesafe-actions';
import { FluxStandardAction } from 'redux-promise-middleware';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { asyncActionTypeCreator } from '../../core/utils/reduxUtil';
import { AxiosResponse } from 'axios';
import { IApiRes } from '../../types/IApiRes';
import { ICategory } from '../../types/post/ICategory';

const prefix: string = 'POST_WRITE_';


const SETTING_POST_INFO: string = `${prefix}SETTING_POST_INFO`;
const SET_TITLE: string = `${prefix}SET_TITLE`;
const SET_CONTENT: string = `${prefix}SET_CONTENT`;
const SET_CATEGORY: string = `${prefix}SET_CATEGORY`;
const TOGGLE_ORIGIN_PREVIEW_MODAL: string = `${prefix}TOGGLE_ORIGIN_PREVIEW_MODAL`;
const TOGGLE_ERROR: string = `${prefix}TOGGLE_ERROR`;
const UPSERT_POST: IAsyncAction = asyncActionTypeCreator(`${prefix}UPSERT_POST`);

interface settingPostInfoFn {
  postNo: number;
  title: string;
  content: string;
  category: any
}

export const settingPostInfo = createStandardAction(SETTING_POST_INFO)<settingPostInfoFn>();
export const setTitle = createStandardAction(SET_TITLE)<string>();
export const setContent = createStandardAction(SET_CONTENT)<string>();
export const setCategory = createStandardAction(SET_CATEGORY)<ICategory>();
export const toggleOriginPreviewModal = createStandardAction(TOGGLE_ORIGIN_PREVIEW_MODAL)<boolean>();
export const upsertPost = createStandardAction(UPSERT_POST.INDEX)<Promise<AxiosResponse<IApiRes>>>();
// 임시 에러 처리 방법
export const toggleError = createStandardAction(TOGGLE_ERROR)<boolean>();

export interface PostWriteInitType {
  postNo: number
  category: any,
  title: string,
  content: string,
  error: boolean,
  errorMsg: string,
  previewModal: boolean
}

const initialState: PostWriteInitType = {
  postNo: 0,
  category: null,
  title: '',
  content: '',
  error: false,
  errorMsg: '',
  previewModal: false,
};


export default createReducer(initialState, {
  [SETTING_POST_INFO]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.postNo = action.payload.postNo;
      draft.category = action.payload.category;
      draft.title = action.payload.title;
      draft.content = action.payload.content;
    }),
  [UPSERT_POST.FULFILLED]: state =>
    produce<PostWriteInitType>(state, draft => {
      draft.postNo = initialState.postNo;
      draft.category = initialState.category;
      draft.title = initialState.title;
      draft.content = initialState.content;
    }),
  [UPSERT_POST.REJECTED]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.error = true;
      draft.errorMsg = action.payload.message;
    }),
  [SET_CATEGORY]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.category = action.payload
    }),
  [SET_TITLE]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.title = action.payload
    }),
  [SET_CONTENT]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.content = action.payload
    }),
  [TOGGLE_ERROR]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.error = action.payload
    }),
  [TOGGLE_ORIGIN_PREVIEW_MODAL]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.previewModal = action.payload
    }),
});
