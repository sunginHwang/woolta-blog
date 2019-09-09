import apiCall from '../utils/apiCall';
import { BLOG_API, IMAGE_API } from '../constants';

export const saveImageAndGetImageUrl = async (imageFile) => {
  let data = await new FormData();
  await data.append('imageFile', imageFile);

  try {
    const result = await apiCall.post(`${BLOG_API}/file/upload/image`, data);

    if (result.status === 200 && result.data.code === 'SUCCESS') {
      const savedImageUrl: string = `${IMAGE_API}/${result.data.data.originFileName}`;
      return savedImageUrl;
    } else {
      alert('이미지 업로드에 실패하였습니다.');
    }
  } catch (e) {
    alert('이미지 업로드에 실패하였습니다.');
  }

  return '';

};
