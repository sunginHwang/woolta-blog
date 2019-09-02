import { postInitType } from '../../store/reducers/postReducer';
import { authInitType } from '../../store/reducers/authReducer';
import { categoryInitType } from '../../store/reducers/categoryReducer';
import { layoutInitType } from '../../store/reducers/layoutReducer';
import { PostWriteInitType } from '../../store/reducers/postWriteReducer';

export type RootState = {
  postWriteReducer: PostWriteInitType;
  postReducer: postInitType;
  categoryReducer: categoryInitType;
  layoutReducer: layoutInitType;
  authReducer: authInitType
};