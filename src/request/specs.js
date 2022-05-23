import axios from '../utils/http'

// 规格总数
export function specsTotal() {
    let res =  axios.get('/specscount')
    return res
}

// 请求规格列表
export function getSpecsList(params){
    let res =  axios.get('/specslist',{params:params})
    return res
}

// 请求规格所有数据的列表
export function getAllSpecsList(total){
    let res =  axios.get('/specslist',{params:{page:1,size:total}})
    return res
}

// 添加规格
export function addSpecs(data){
    let res = axios.post('/specsadd',data)
    return res
}

// 修改规格
export function editSpecs(data) {
    let res = axios.post('/specsedit',data)
    return res
}

// 删除规格
export function delSpecs(id) {
    let res = axios.post('/specsdelete',{id:id})
    return res
}
