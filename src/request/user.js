import axios from '../utils/http'

// 管理员登录
export function userLogin(data) {
    let res =  axios.post('/userlogin', data)
    return res
}

// 管理员总数
export function userTotal() {
    let res =  axios.get('/usercount')
    return res
}

// 请求管理员列表
export function getUserList(params){
    let res =  axios.get('/userlist',{params:params})
    return res
}

// 添加管理员
export function addUser(data){
    let res = axios.post('/useradd',data)
    return res
}

// 修改管理员
export function editUser(data) {
    let res = axios.post('/useredit',data)
    return res
}

// 删除管理员
export function delUser(uid) {
    let res = axios.post('/userdelete',{uid:uid})
    return res
}
