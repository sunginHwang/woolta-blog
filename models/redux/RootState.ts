import { postInitType } from '../../store/reducers/postReducer';
import { authInitType } from '../../store/reducers/authReducer';
import { categoryInitType } from '../../store/reducers/categoryReducer';
import { layoutInitType } from '../../store/reducers/layoutReducer';
import { PostWriteInitType } from '../../store/reducers/postWriteReducer';
import { postsInitType } from '../../store/reducers/postsReducer';

export type RootState = {
  postWriteReducer: PostWriteInitType;
  postsReducer: postsInitType;
  postReducer: postInitType;
  categoryReducer: categoryInitType;
  layoutReducer: layoutInitType;
  authReducer: authInitType
};