import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { setContent, setContentPosition, setContentWriteIndex } from '../store/reducers/postWriteReducer';
import { toggleSpinnerLoading } from '../store/reducers/layoutReducer';
import PostWriteForm from '../components/post/write/PostWriteForm/PostWriteForm';
import useImageUpload from '../core/hooks/useImageUpload';


const WriteEditorContainer = () => {

  const dispatch = useDispatch();
  const [onImageUpload, addImageTag] = useImageUpload();
  const { content, contentWriteIndex } = useSelector((state: RootState) => state.postWriteReducer);

  useEffect(() => {
    window && window.addEventListener('drop', onDnd); //dnd Event
    (document && document.body) && document.body.addEventListener('paste', onPaste);// paste Event

    return () => {
      window && window.removeEventListener('drop', onDnd);
      (document && document.body) && document.body.removeEventListener('paste', onPaste);
    };
  }, [content, contentWriteIndex]);

  const onPaste = async (e) => {
    const { items } = e.clipboardData || e.originalEvent.clipboardData;

    if (items.length !== 2) return;
    if (items[1].kind !== 'file') return;
    //  file paste event prevent
    e.preventDefault();

    const file = items[1].getAsFile();

    dispatch(toggleSpinnerLoading(true));
    const markdownImg = await onImageUpload(file);
    addImage(markdownImg, contentWriteIndex);
    dispatch(toggleSpinnerLoading(false));
  };

  const onDnd = async (e) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    dispatch(toggleSpinnerLoading(true));
    const imagePromises = [];
    for (let i = 0; i < files.length; i++) {
      imagePromises.push(onImageUpload(files[i]));
    }

    const images = await Promise.all(imagePromises);
    addImage(images.flat(), contentWriteIndex);
    dispatch(toggleSpinnerLoading(false));
  };


  const addImage = useCallback((image, addIndex) => {
    dispatch(setContent(addImageTag(image, content, addIndex)));
  }, [content, contentWriteIndex]);

  const changeContent = useCallback((content: string) => dispatch(setContent(content)), [content]);

  const changeContentWriteIndex = useCallback((selectionStart: number) => {
    dispatch(setContentWriteIndex(selectionStart));
  }, []);

  const changeScrollPosition = useCallback((scrollPosition) => dispatch(setContentPosition(scrollPosition)), [dispatch]);

  return (
    <PostWriteForm content={content}
                   changeContent={changeContent}
                   changeContentWriteIndex={changeContentWriteIndex}
                   changeScrollPosition={changeScrollPosition}/>
  );
};

export default React.memo(WriteEditorContainer);
