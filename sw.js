// 元朗狂飆 — offline copy of what has been played. The page and the game script always try the network first
// (so a new version arrives at once); map data and images come from the cache when they are there.
const CACHE='ylr-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const fresh=/\.(html|js|webmanifest)$/.test(u.pathname)||u.pathname.endsWith('/');
  if(fresh){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c));return res;}).catch(()=>caches.match(r,{ignoreSearch:true})));return;}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c));}return res;})));});
