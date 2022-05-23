// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入element.js
import './utils/element'
// 导入http.js
import './utils/http'
// 导入store
import store from './store'

// 全局图片基础路径
Vue.prototype.$imgBaseUrl = 'http://localhost:3000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 挂载
  store,
  components: { App },
  template: '<App/>'
})
