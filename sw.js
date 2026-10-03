const NOME_CACHE = 'escala5x1-app-v2';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar — guarda arquivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(NOME_CACHE)
      .then(cache => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

// Ativar — limpa caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(chaves => 
      Promise.all(
        chaves.filter(c => c !== NOME_CACHE).map(c => caches.delete(c))
      )
    ).then(() => self.clients.claim())
  );
});

// Busca — usa cache se sem internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
