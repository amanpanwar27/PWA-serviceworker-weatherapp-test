const cacheName = "v1";
const cacheAssets  = [
    'offline.html',
    'index.html'
];


self.addEventListener('install',(e)=>{
    console.log('service worker : installed');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log("caching files");
            cache.addAll(cacheAssets).then(()=>self.skipWaiting());
        })
    )
});


self.addEventListener('activate',(e)=>{
    console.log('service worker : activated');
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(cacheNames.map((cache)=>{
                if(cache!==cacheName)return caches.delete(cache);
            }))
        })
    )
});
self.addEventListener("fetch",(e)=>{
    console.log("fetching");
    e.respondWith(fetch(e.request).catch(()=>{
        caches.match('offline.html');    }))
})