import {getRoleList} from '../../request/role'
export default {
    namespaced:true,
    state(){
        return {
            // 存储角色列表
            roleList:[]
        }
    },
    mutations:{
        // 初始化角色列表
        roleInit(state,data){
            state.roleList = data
        }
    },
    actions:{
        // 请求角色数据
        getRoleListAction({commit}){
            // axios请求后台数据
            getRoleList().then(res=>{
                commit('roleInit',res.list)
            })
        }
    }
}