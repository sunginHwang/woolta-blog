import axios from 'axios';
import { ACCESS_HEADER_TOKEN, ACCESS_TOKEN } from '../constants';

let apiCall = axios.create();

if(typeof(Storage) !== "undefined"){
  apiCall.defaults.headers.common[ACCESS_HEADER_TOKEN] = localStorage.getItem(ACCESS_TOKEN);
}

apiCall.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
apiCall.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
apiCall.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default apiCall;


const requests = [];

let progress = 0;
let timerId = null;

function setProgress(value) {
  progress = value;
  // @ts-ignore
  if (typeof window !== 'undefined' && window.nanoBarLoading) {
    // @ts-ignore
    window.nanoBarLoading.go(progress);
  }
}

function timer() {
  if (progress < 98) {
    const diff = 100 - progress; // 75
    const inc = diff / (10 + progress * (1 + progress / 100));
    setProgress(progress + inc);
  }
  timerId = setTimeout(timer, 50);
}

export function nanoBarLoadingSetup() {
  apiCall.interceptors.request.use((req) => {
    if (requests.length === 0) {
      setProgress(25);
      timer();
    }
    requests.push(req);
    return req;
  });

  const responseHandler = (res) => {
    setTimeout(() => {
      requests.pop();
      if (requests.length === 0) {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
        setProgress(100);
      }
    }, 150);
    return res;
  };

  const errorHandler = (response) => {
    setTimeout(() => {
      requests.pop();
      if (requests.length === 0) {
        if (timerId) {
          clearTimeout(timerId);
          timerId = null;
        }
        setProgress(100);
      }
    }, 150);
    return Promise.reject(response);
  };

  apiCall.interceptors.response.use(responseHandler, errorHandler);
}

export function settingAccessHeaderToken(accessToken: string) {
  apiCall.defaults.headers.common[ACCESS_HEADER_TOKEN] = accessToken;
}
