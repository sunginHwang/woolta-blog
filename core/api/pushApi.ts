import apiCall from '../utils/apiCall';
import { BLOG_API } from '../constants';
import { IPwaSubscription } from '../../types/pwa/IPwaSubscription';

export const pushSubscription = (subscription: IPwaSubscription) => {
  apiCall.post(`${BLOG_API}/push/subscription`, {
    auth: subscription.keys.auth,
    key: subscription.keys.p256dh,
    endPoint: subscription.endpoint,
  });
};

export const pushUnsubscription = (pwaSubscriptionKey: String) => {
  apiCall.delete(`${BLOG_API}/push/subscription`, {
    data: {
      key: pwaSubscriptionKey,
    },
  });
};
