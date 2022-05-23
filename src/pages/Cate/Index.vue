<template>
 <el-card>
     <!-- 新增按钮 -->
     <el-button type="primary" @click="showModel" icon="el-icon-circle-plus-outline">新增</el-button>
     <!-- 分割线 -->
     <el-divider></el-divider>
     <!-- 表格 -->
     <List :info="info" @setFromInfo="setFromInfo"/>
     <!-- model对话框 -->
     <Model :info="info" ref="model"/>
 </el-card>
</template>

<script>
// 导入组件
import List from './List'
import Model from './Model'
export default {
    data(){
         return{
             info:{
                //  控制对话框显示和隐藏的
                 isShow:false,
                 isAdd:true
             }
         }
    },
    created(){},
    methods:{
        showModel(){
            this.info.isAdd = true
            this.info.isShow = true
        },
        setFromInfo(obj){
            // 把数据传递给Model,通过利用ref调用Model下的方法
            this.$refs.model.setFromInfo(obj)
        }
    },
    components:{
        List,Model
    }
}

</script>
<style scoped>
</style>