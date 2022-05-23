<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form
      :model="formInfo"
      label-width="120px"
      :rules="rules"
      ref="formInfo"
    >
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formInfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级" v-if="formInfo.type == 2">
        <el-select v-model="formInfo.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="title">
        <el-input v-model="formInfo.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" v-if="formInfo.type == 2">
        <el-input v-model="formInfo.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图标" v-if="formInfo.type == 1">
        <el-input v-model="formInfo.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--  -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="info.isShow = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 辅助函数
import { mapState, mapActions } from "vuex";
// 导入
import { addMenu,editMenu } from "../../request/menu";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "  ",
        status: 1,
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {},
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          if (this.info.isAdd) {
            // -----------新增--------------------
            addMenu(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getMenuListAction();
                // 3.关闭对话框
                this.info.isShow = false;
              } else {
                // 1.弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
            // -------------------------------
          } else {
            // -----------编辑--------------
            editMenu(this.formInfo).then(res=>{
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getMenuListAction();
                // 3.关闭对话框
                this.info.isShow = false;
              } else {
                // 1.弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置对话框
    reset() {
      this.formInfo = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "  ",
        status: 1,
      };
    },
    setFromInfo(obj){
      // 把obj赋值给this.formInfo
      // 拷贝
      this.formInfo = {...obj}
    }
  },
  components: {},
};
</script>
<style scoped>
</style>