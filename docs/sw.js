if (!self.define) {
  let e,
    i = {};
  const s = (s, n) => (
    (s = new URL(s + '.js', n).href),
    i[s] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = i), document.head.appendChild(e);
        } else (e = s), importScripts(s), i();
      }).then(() => {
        let e = i[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, r) => {
    const o = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (i[o]) return;
    let t = {};
    const c = (e) => s(e, o),
      f = { module: { uri: o }, exports: t, require: c };
    i[o] = Promise.all(n.map((e) => f[e] || c(e))).then((e) => (r(...e), t));
  };
}
define(['./workbox-7cfec069'], function (e) {
  'use strict';
  self.addEventListener('message', (e) => {
    e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        { url: 'assets/index-mOwzlOXw.js', revision: null },
        { url: 'assets/index-QiyQg4F8.css', revision: null },
        { url: 'index.html', revision: 'be7799525cc7400fc6767091b5c31558' },
        { url: 'registerSW.js', revision: '9396f0418656ec2e437c5657594f53ef' },
        { url: 'favicon.ico', revision: '7daf00a1cbc9fe096854be977bc62b00' },
        { url: 'icon.svg', revision: '47c41ac404f1a1b87afe635718f003ff' },
        { url: 'manifest.webmanifest', revision: '3d375af557a927ada1bf51e3d536f5bd' }
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html')));
});
