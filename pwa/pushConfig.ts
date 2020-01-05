import { pushSubscription, pushUnsubscription } from '../core/api/pushApi';
import { IPwaSubscription } from '../types/pwa/IPwaSubscription';
import {
  ACCESS_PUSH_TOKEN,
  PUSH_APPLICATION_SERVER_KEY,
  PWA_LOG,
  PWA_NOTIFICATION_PERMISSIONS,
} from '../core/constants';

export const initSubscribe = async swRegistration => {

  await navigator.serviceWorker.ready;  // <--- WAIT
  // 사용자가 브라우저에서 강제로 알람 차단 할 경우 남아있는 키 제거
  if (Notification.permission !== PWA_NOTIFICATION_PERMISSIONS.granted) {
    removeAccessPushToken();
  }

  if (Notification.permission === PWA_NOTIFICATION_PERMISSIONS.default) {
    subscribeUser(swRegistration);
  }
};

export const subscribeUser = (swRegistration) => {
  console.log(`${PWA_LOG} subscribe`);
  const applicationServerKey = urlB64ToUint8Array(PUSH_APPLICATION_SERVER_KEY);

  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  }).then((subscription) => {
    const pwaSubscription: IPwaSubscription = JSON.parse(JSON.stringify(subscription));
    localStorage.setItem(ACCESS_PUSH_TOKEN, pwaSubscription.keys.auth);
    pushSubscription(pwaSubscription);
  }).catch(e => console.log(`${PWA_LOG} subscribe error`, e));
};

export const unSubscribeUser = (swRegistration) => {
  console.log(`${PWA_LOG} unsubscribe`);

  swRegistration.pushManager.getSubscription()
    .then((subscription) => {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch((e) => console.log(`${PWA_LOG} unsubscribe error: `, e))
    .then(() => removeAccessPushToken());
};

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const removeAccessPushToken = () => {
  console.log(`${PWA_LOG} removeAccessPushToken`);
  const pwaSubscriptionKey = localStorage.getItem(ACCESS_PUSH_TOKEN);
  if (!pwaSubscriptionKey) {
    return;
  }
  console.log(`${PWA_LOG} removeAccessPushToken key`, pwaSubscriptionKey);
  pushUnsubscription(pwaSubscriptionKey);
  localStorage.removeItem(ACCESS_PUSH_TOKEN);
};


