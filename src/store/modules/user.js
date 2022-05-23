import {getUserList,userTotal} from '../../request/user'
export default {
    namespaced:true,
    state(){
        return {
            // 存储管理员列表
            userList:[],
            // 管理员总数
            userTotal:0
        }
    },
    mutations:{
        // 初始化管理员列表
        userInit(state,data){
            state.userList = data
        },
        // 修改管理总数
        setUserTotal(state,data){
            state.userTotal = data
        }
    },
    actions:{
        // 请求管理员数据
        getUserListAction({commit,dispatch},params){
            // axios请求后台数据
            getUserList(params).then(res=>{
                commit('userInit',res.list)
                dispatch('getUserTotalAction')
            })
        },
        // 请求后台总数
        getUserTotalAction({commit}){
            // axios请求后台总数
            userTotal().then(res=>{
                commit('setUserTotal',res.list[0].total)
            })
        }
    }
}