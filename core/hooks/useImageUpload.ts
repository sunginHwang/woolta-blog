import * as FileApi from '../api/FileApi';
import { convertImageToCodeImage } from '../utils/imageUtil';
import { useCallback } from 'react';


export default function useImageUpload(){

  const onImageUpload = useCallback(async (file) => {
    const savedImageUrl = await FileApi.saveImageAndGetImageUrl(file);
    return convertImageToCodeImage(savedImageUrl);
  },[]);

  const addImageTag = useCallback((image: string, content: string, addIndex: number)=>{
    return content.slice(0, addIndex) + image + content.slice(addIndex);
  },[])

  return [onImageUpload, addImageTag] as [typeof onImageUpload, typeof addImageTag];
}