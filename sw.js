// 工程 AI 出圖系統 — Service Worker
// 更新程式時請修改 CACHE 版本號，使用者端才會取得新版
const CACHE = 'eng-ai-draw-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

// 逐檔快取：單一檔案缺漏不會讓整個 Service Worker 安裝失敗
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u => c.add(u).catch(err => console.warn('cache skip', u, err)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 頁面：網路優先（取得最新版），離線時改用快取（忽略 ?source=pwa 等參數）
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res && res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); }
          return res;
        })
        .catch(() => caches.match('./index.html', { ignoreSearch: true }).then(r => r || caches.match('./')))
    );
    return;
  }

  // 同源靜態檔與 Google Fonts：快取優先，背景補存
  if (url.origin === location.origin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const cp = res.clone();
          caches.open(CACHE).then(c => c.put(req, cp));
        }
        return res;
      }))
    );
  }
});
