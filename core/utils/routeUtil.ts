import Router from 'next/router';

export const goPostListPage = (categoryNo: number) => {
  window.scrollTo(0, 0);
  Router.push(`/posts?categoryNo=${categoryNo}`, `/categories/${categoryNo}`);
};

export const goPostDetailPage = (categoryNo: number, postNo: number) => {
  window.scrollTo(0, 0);
  Router.push(`/post?postNo=${postNo}&categoryNo=${categoryNo}`, `/categories/${categoryNo}/posts/${postNo}`);
};

export const goPostEditPage = () => {
  window.scrollTo(0, 0);
  Router.push('/postEdit', '/edit');
};

export const goMainPage = () => {
  window.scrollTo(0, 0);
  Router.push('/', '/');
};

export const goLoginPage = () => {
  window.scrollTo(0, 0);
  Router.push('/login', '/login');
};

export const goBack = () => {
  Router.back();
};
