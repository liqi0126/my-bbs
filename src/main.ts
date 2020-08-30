import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Ant Design
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

// Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

router.beforeEach((to, from, next) => {
  store.commit('disableBookmark')
  store.commit('disableHistory')
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.getters.getToken !== '') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

Vue.filter('formatEmoji', function (str) {
  // eslint-disable-next-line
  return str.replace(/\[[^\[\]]*\]/g, (emojiText) => {
    if (store.state.emoji[emojiText]) {
      return '<img src=' + store.state.emoji[emojiText] + ' />'
    } else {
      return emojiText
    }
  })
})

Vue.filter('formatTime', function (str) {
  if (!str) return ''
  const date = new Date(str)
  const time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return Math.floor((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return Math.floor((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return Math.floor(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return Math.floor(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return Math.floor(time / 2592000000) + '月前'
  } else {
    return Math.floor(time / 31536000000) + '年前'
  }
})

Vue.filter('formatTitle', function (str) {
  if (!str || !str.trim()) { return '[无标题]' } else {
    return str
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
