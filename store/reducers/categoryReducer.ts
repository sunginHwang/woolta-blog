import { createStandardAction } from 'typesafe-actions';
import { createReducer } from '../../core/util/reduxUtil';

import { produce } from 'immer';
import { ICategory } from '../../models/post/ICategory';

const prefix: string = 'CATEGORY_';

const TOGGLE_SPINNER_LOADING_A: string = `${prefix}TOGGLE_SPINNER_LOADING_A`;


export const increaseCounter = createStandardAction(TOGGLE_SPINNER_LOADING_A)<number>();


export interface categoryInitType {
  categories: ICategory[]
}

const initialState: categoryInitType = {
  categories : []
};

export default createReducer({
  [TOGGLE_SPINNER_LOADING_A]: (state, action) =>
    produce<categoryInitType>(state, draft => {
      draft.categories = state.categories + action.payload;
    }),
}, initialState);


