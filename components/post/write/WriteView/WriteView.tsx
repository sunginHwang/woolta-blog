import React from 'react';
import classNames from 'classnames/bind';
import WriteEditor from '../WriteEditor/WriteEditor';
import MarkDownView from '../../../view/MarkDownView/MarkDownView';
// @ts-ignore
import cn from './WriteView.scss';
import { IUserInfo } from '../../../../types/user/IUserInfo';
import { ICategory } from '../../../../types/post/ICategory';

const cx = classNames.bind(cn);

interface WriteViewProps {
  title: string;
  content: string;
  authInfo: IUserInfo;
  categories: ICategory[];
  selectedCategory: string;
  onClickShowOriginPreview: () => void;
  onChangeContent: (content: string) => void;
  onChangeTitle: (content: string) => void;
  onChangeCategories: (category: ICategory) => void;
  uploadImage: any;
  upsertPost: () => void;
}

const WriteView: React.FC<WriteViewProps> = ({
                                               title,
                                               content,
                                               authInfo,
                                               categories,
                                               selectedCategory,
                                               onClickShowOriginPreview,
                                               onChangeContent,
                                               onChangeTitle,
                                               onChangeCategories,
                                               uploadImage,
                                               upsertPost,
                                             }) => {
  return (
    <div className={cn.write}>
      <div className={cx(cn.markDownWrapper, cn.edit)}>
        {/*writeEditorContainer*/}
        <WriteEditor
          title={title}
          authInfo={authInfo}
          content={content}
          categories={categories}
          selectedCategory={selectedCategory}
          onChangeCategories={onChangeCategories}
          onChangeContent={onChangeContent}
          onChangeTitle={(e) => onChangeTitle(e)}
          uploadImage={uploadImage}/>
      </div>
      {/*writeViewContainer*/}
      <div className={cx(cn.markDownWrapper, cn.view)}>
        <div className={cn.titleArea}>
          <span className={cn.previewTitle}>preview</span>
          <div className={cn.saveBtn} onClick={() => upsertPost()}>
            저장하기
          </div>
        </div>
        <div className={cn.contentArea} onClick={() => onClickShowOriginPreview()}>
          <MarkDownView content={content}
                        skipHtml={false}
                        escapeHtml={false}/>
        </div>
      </div>
    </div>
  );
};
export default WriteView;


