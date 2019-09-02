import { createStandardAction } from 'typesafe-actions';
import { asyncActionTypeCreator, createReducer } from '../../core/util/reduxUtil';

import { produce } from 'immer';
import { ICategory } from '../../models/post/ICategory';
import IAsyncAction from '../../models/redux/IAsyncAction';
import { FluxStandardAction } from 'redux-promise-middleware';
import { AxiosResponse } from 'axios';

const prefix: string = 'CATEGORY_';



export const CATEGORIES: IAsyncAction = asyncActionTypeCreator(`${prefix}FETCH_CATEGORIES`);
export const getCategories = createStandardAction(CATEGORIES.INDEX)<Promise<AxiosResponse<ICategory[]>>>();

export interface categoryInitType {
  categories: ICategory[]
}

const initialState: categoryInitType = {
  categories: [],
};

export default createReducer({
  [CATEGORIES.FULFILLED]: (state, action: FluxStandardAction) =>
    produce<categoryInitType>(state, draft => {
      draft.categories = action.payload.data.data;
    }),
  [CATEGORIES.REJECTED]: (state) =>
    produce<categoryInitType>(state, draft => {
      draft.categories = initialState.categories;
    }),
}, initialState);


