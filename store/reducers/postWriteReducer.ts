import { produce } from 'immer';
import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../../core/util/reduxUtil';
import { FluxStandardAction } from 'redux-promise-middleware';

const prefix: string = 'POST_WRITE_';


const SETTING_POST_INFO: string = `${prefix}SETTING_POST_INFO`;

interface settingPostInfoFn {
  postNo: number;
  title: string;
  content: string;
  category: any
}
export const settingPostInfo = createStandardAction(SETTING_POST_INFO)<settingPostInfoFn>();


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


export default createReducer({
  [SETTING_POST_INFO]: (state, action: FluxStandardAction) =>
    produce<PostWriteInitType>(state, draft => {
      draft.postNo = action.payload.postNo;
      draft.category = action.payload.category;
      draft.title = action.payload.title;
      draft.content = action.payload.content;
    }),
}, initialState);
