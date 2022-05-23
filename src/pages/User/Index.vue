<template>
  <el-card>
      <!-- 新增按钮 -->
      <el-button type="primary" @click="showModel" icon="el-icon-circle-plus-outline">新增</el-button>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 列表 -->
      <List :info="info" :params="params" @setFormInfo="setFormInfo"/>
      <!-- 弹框 -->
      <Model :info="info" :params="params" ref="model"/>
  </el-card>
</template>

<script>
// 导入列表
import List from './List'
// 导入弹框
import Model from './Model'
export default {
  data() {
    return {
      info:{
        isShow:false,
        isAdd:true
      },
      // 分页对象
      params:{
        page:1,
        size:10
      }
    };
  },
  created() {},
  methods: {
    showModel(){
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    setFormInfo(obj){
      this.$refs.model.setFormInfo(obj)
    }
  },
  components: {
      List,Model
  },
};
</script>
<style scoped>
</style>