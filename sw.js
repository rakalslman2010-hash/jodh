var C="jh-v7",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;e.respondWith(fetch(r).then(function(n){var cp=n.clone();caches.open(C).then(function(c){c.put(r,cp)});return n}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}))});

self.addEventListener("notificationclick",function(e){e.notification.close();var u=(e.notification.data&&e.notification.data.url)||"./index.html#tasks";e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){for(var i=0;i<l.length;i++){if("focus" in l[i]){if(l[i].navigate)l[i].navigate(u);return l[i].focus()}}return self.clients.openWindow(u)}))});
