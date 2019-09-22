import { createReducer } from 'typesafe-actions';
import { apiRequestThunk, asyncActionTypeCreator } from '../../core/utils/reduxUtil';

import { produce } from 'immer';
import { ICategory } from '../../types/post/ICategory';
import IAsyncAction from '../../types/redux/IAsyncAction';
import { FluxStandardAction } from 'redux-promise-middleware';
import { fetchCategories } from '../../core/api/blogApi';

const prefix: string = 'CATEGORY_';


export const CATEGORIES: IAsyncAction = asyncActionTypeCreator(`${prefix}FETCH_CATEGORIES`);
export const getCategories = apiRequestThunk(CATEGORIES, fetchCategories);

export interface categoryInitType {
  categories: ICategory[]
}

const initialState: categoryInitType = {
  categories: [],
};

export default createReducer(initialState, {
  [CATEGORIES.SUCCESS]: (state, action: FluxStandardAction) =>
    produce<categoryInitType>(state, draft => {
      draft.categories = action.payload;
    }),
  [CATEGORIES.FAILURE]: (state) =>
    produce<categoryInitType>(state, draft => {
      draft.categories = initialState.categories;
    }),
});


