import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/redux/RootState';
import { setContent, setContentWriteIndex } from '../store/reducers/postWriteReducer';
import { toggleSpinnerLoading } from '../store/reducers/layoutReducer';
import PostWriteForm from '../components/post/write/PostWriteForm/PostWriteForm';
import useImageUpload from '../core/hooks/useImageUpload';


const WriteEditorContainer: React.FC<{}> = ({}) => {

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

  const onChangeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
    dispatch(setContentWriteIndex(e.target.selectionStart));
  }, [content]);

  const onChangeContentWriteIndex = useCallback((selectionStart: number) => {
    dispatch(setContentWriteIndex(selectionStart));
  }, []);


  return (
    <PostWriteForm content={content}
                   onChangeContent={onChangeContent}
                   onChangeContentIndex={onChangeContentWriteIndex}
    />
  );
};

export default React.memo(WriteEditorContainer);
