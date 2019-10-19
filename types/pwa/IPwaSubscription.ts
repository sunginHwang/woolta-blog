export interface IPwaSubscription {
  keys: {
    auth: string;
    p256dh: string;
  },
  endpoint: string;
}