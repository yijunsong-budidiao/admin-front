// 导入
import Vue from 'vue'
import Vuex from 'vuex'

// 注册
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'

// 创建实例
let store = new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        menu,role,user,cate,specs,goods
    }
})

export default store