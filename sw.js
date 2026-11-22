// 오프라인용 서비스 워커: 먼저 인터넷에서 받고(최신 유지), 4초 안에 안 오거나 끊기면 저장본을 쓴다.
// 같은 사이트 파일만 저장한다. Google 지도는 인터넷이 있어야 열린다.
const CACHE = 'chura-guide-v5';
const FILES = ['./', './index.html', './data.js?v=5', './icon.svg', './manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const fromNet = fetch(e.request).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return res;
  });
  const timeout = new Promise((_, reject) => setTimeout(reject, 4000));
  e.respondWith(Promise.race([fromNet, timeout]).catch(() =>
    caches.match(e.request).then((hit) => hit || fromNet.catch(() => caches.match('./')))));
});
