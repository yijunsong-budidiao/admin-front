import {getCateList} from '../../request/cate'
export default {
    namespaced:true,
    state(){
        return {
            // 存储分类列表
            cateList:[]
        }
    },
    mutations:{
        // 初始化分类列表
        cateInit(state,data){
            state.cateList = data
        }
    },
    actions:{
        // 请求分类数据
        getCateListAction({commit}){
            // axios请求后台数据
            getCateList().then(res=>{
                commit('cateInit',res.list)
            })
        }
    }
}