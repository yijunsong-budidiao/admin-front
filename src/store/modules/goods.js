import {getGoodsList,goodsTotal} from '../../request/goods'
export default {
    namespaced:true,
    state(){
        return {
            // 存储商品列表
            goodsList:[],
            // 商品总数
            goodsTotal:0
        }
    },
    mutations:{
        // 初始化商品列表
        goodsInit(state,data){
            state.goodsList = data
        },
        // 修改管理总数
        setGoodsTotal(state,data){
            state.goodsTotal = data
        }
    },
    actions:{
        // 请求商品数据
        getGoodsListAction({commit,dispatch},params){
            // axios请求后台数据
            getGoodsList(params).then(res=>{
                commit('goodsInit',res.list)
                dispatch('getGoodsTotalAction')
            })
        },
        // 请求后台总数
        getGoodsTotalAction({commit}){
            // axios请求后台总数
            goodsTotal().then(res=>{
                commit('setGoodsTotal',res.list[0].total)
            })
        }
    }
}