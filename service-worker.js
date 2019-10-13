const CACHE_NAME = 'woolta-blog-cache';

const FILES_TO_CACHE = [
    '/offline',
];

self.addEventListener('install', function (event) {
    console.log('[ServiceWorker] Install');
    // Perform install steps
    self.skipWaiting()


    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[ServiceWorker] activate');
    event.waitUntil(
        caches.keys().then(function (cacheName) {
            return Promise.all(
                cacheName.filter(n => FILES_TO_CACHE.indexOf(n) === -1)
                    .map(n => caches.delete(n))
            )
        })
    )
})


self.addEventListener('fetch', (event) => {

    if (event.request.method !== 'GET') { // GET 요청만 캐싱 지원 처리
        return;
    }

    const fetchRequest = event.request.clone();

    event.respondWith(
        caches.match(CACHE_NAME).then((res) => {
            return res || fetch(fetchRequest)
                .then((response) => {

                    if (response.status === 200 || response.status === 0) {
                        const cloneResponse = response.clone();
                        caches.open(CACHE_NAME) // 네트워크 요청 성공시 해당 결과값 캐싱
                            .then(cache => cache.put(event.request.url, cloneResponse));
                    }

                    return response;
                })
                .catch(() => {
                    return caches.match(event.request.url)
                        .then(cache => {return cache;}) // 네트워크 요청 실패시 캐싱된 요청으로 응답.
                })
        })
    );
});

self.addEventListener('push', function (event) {
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    const pushInfo = JSON.parse(event.data.text());

    const options = { // 푸쉬 알림창에 대한 각종 설정
        body: pushInfo.content,
        icon: 'static/icon192x192.png',
        data: {
            url: pushInfo.url
        }
    };

    event.waitUntil(self.registration.showNotification(pushInfo.title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // 푸쉬 종료 처리

    event.waitUntil(
        clients.openWindow(event.notification.data.url) // 요청한 url로 새창으로 열어 이동
    );
});


