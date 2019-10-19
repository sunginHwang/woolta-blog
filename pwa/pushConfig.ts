import { pushSubscription } from '../core/api/pushApi';

const applicationServerPublicKey = 'BBUmILImgSCb6wcUMIDPKj1B-kxu_x4VtHeQYVkLIRAlFCtTTFblcRsANxQCBfBYR8jOSx4OsvoFjObsyWc5p9Y';

export const subscribeUser = (swRegistration) => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey,
  }).then((subscription) => {
    console.log('has subscription ==========',subscription);
    pushSubscription(JSON.parse(JSON.stringify(subscription)));
  }).catch(e=>{
    console.log(e);
  });
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


