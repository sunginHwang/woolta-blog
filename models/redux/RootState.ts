import { initType } from '../../store/reducers/postReducer';
import { authInitType } from '../../store/reducers/authReducer';
import { categoryInitType } from '../../store/reducers/categoryReducer';
import { layoutInitType } from '../../store/reducers/layoutReducer';

export type RootState = {
  postReducer: initType;
  categoryReducer: categoryInitType;
  layoutReducer: layoutInitType;
  authReducer: authInitType
};