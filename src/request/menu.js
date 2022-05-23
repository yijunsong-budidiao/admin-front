import axios from '../utils/http'

// 请求菜单列表
export function getMenuList(){
    let res =  axios.get('/menulist?istree=1')
    return res
}

// 添加菜单
export function addMenu(data){
    let res = axios.post('/menuadd',data)
    return res
}

// 修改菜单
export function editMenu(data) {
    let res = axios.post('/menuedit',data)
    return res
}

// 删除菜单
export function delMenu(id) {
    let res = axios.post('/menudelete',{id:id})
    return res
}