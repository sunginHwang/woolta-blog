import React, { useCallback, useEffect, useRef } from 'react';
import cn from './WriteEditorContainer.scss';
import { ICategory } from '../../types/post/ICategory';
import { addElement } from '../../core/utils/domUtil';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types/redux/RootState';
import { setCategory, setContent, setTitle } from '../../store/reducers/postWriteReducer';
import { toggleSpinnerLoading } from '../../store/reducers/layoutReducer';
import * as FileApi from '../../core/api/FileApi';
import { convertImageToCodeImage } from '../../core/utils/imageUtil';
import PostWriteHeader from '../../components/post/write/PostWriteHeader/PostWriteHeader';
import PostWriteTitle from '../../components/post/write/PostWriteTitle/PostWriteTitle';

interface WriteEditorProps {
}

const WriteEditorContainer: React.FC<WriteEditorProps> = ({}) => {

  const contentRef = useRef(null);
  const { authInfo, title, content, category, categories } = useSelector((state: RootState) => ({
    authInfo: state.authReducer.authInfo,
    postNo: state.postWriteReducer.postNo,
    title: state.postWriteReducer.title,
    content: state.postWriteReducer.content,
    category: state.postWriteReducer.category,
    categories: state.categoryReducer.categories,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    window && window.addEventListener('drop', onDnd); //dnd Event
    (document && document.body) && document.body.addEventListener('paste', onPaste);// paste Event
    return () => {
      window && window.removeEventListener('drop', onDnd);
      (document && document.body) && document.body.removeEventListener('paste', onPaste);
    };
  }, []);

  const onChangeCategories = (selectedCategory: ICategory) => dispatch(setCategory(selectedCategory));
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setContent(e.target.value));
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setTitle(e.target.value));

  // 이미지 업로드
  const uploadImage = async (file) => {
    const savedImageUrl = await FileApi.saveImageAndGetImageUrl(file);
    return convertImageToCodeImage(savedImageUrl);
  };

  const onPaste = useCallback(async (e) => {
    const { items } = e.clipboardData || e.originalEvent.clipboardData;
    if (items.length !== 2) return;
    if (items[1].kind !== 'file') return;

    const file = items[1].getAsFile();

    dispatch(toggleSpinnerLoading(true));
    const markdownImg = await uploadImage(file);
    addImage(markdownImg, contentRef.current.selectionStart);
    dispatch(toggleSpinnerLoading(false));
    e.preventDefault();
  }, []);

  const onDnd = useCallback(async (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    dispatch(toggleSpinnerLoading(true));

    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      imagePromises.push(uploadImage(files[i]));
    }

    const images = await Promise.all(imagePromises);
    addImage(images.flat(), contentRef.current.selectionStart);
    dispatch(toggleSpinnerLoading(false));
  }, []);

  /*이미지 버튼 삽입*/
  const onUploadImage = useCallback(() => {
    const fileInput = addElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async () => {
      if (!fileInput.files) return;
      dispatch(toggleSpinnerLoading(true));
      const markdownImg = await uploadImage(fileInput.files[0]);
      addImage(markdownImg, contentRef.current.selectionStart);
      dispatch(toggleSpinnerLoading(false));
    };
    fileInput.click();
  }, []);

  const addImage = (image, addIndex) => dispatch(setContent(content.slice(0, addIndex) + image + content.slice(addIndex)));

  return (
    <div className={cn.writeEditor}>
      <PostWriteHeader userInfo={authInfo}/>
      <PostWriteTitle category={category}
                      categories={categories}
                      title={title}
                      onUploadImage={onUploadImage}
                      onChangeTitle={onChangeTitle}
                      onChangeCategories={onChangeCategories}
      />
      <textarea className={cn.writeEditor__markDownEditor}
                ref={contentRef}
                value={content}
                placeholder='작성할 내용을 입력해 주세요.'
                onChange={onChangeContent}
      />
    </div>
  );
};

export default WriteEditorContainer;
