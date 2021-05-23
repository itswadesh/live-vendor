import Vue from 'vue'
import vueLazy from 'vue-lazyload'
export default ({ store, app: {} }) => {
  Vue.use(vueLazy, {
    observer: true,
    preLoad: 1.3,
    error: '/icon.png',
    loading: '/loading.svg',
    attempt: 1,
    adapter: {
      loaded({ src, loading, error }) {
        // const CDN = store.state.settings.CDN_URL;
        // src = CDN + src;
      },
    },
    filter: {
      progressive(listener, options) {
        const CDN = (store.state.settings && store.state.settings.CDN_URL) || ''
        listener.el.setAttribute('lazy-progressive', 'true')
        if (listener.src) listener.src = CDN + listener.src
        listener.loading = listener.src + '?tr=w-2,h-3'
      },
      error(listender, Init) {},
    },
  })
}
