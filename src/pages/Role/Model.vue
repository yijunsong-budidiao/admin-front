<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form
      :model="formInfo"
      label-width="120px"
      ref="formInfo"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="formInfo.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
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
// 导入新增方法
import { addRole, editRole } from "../../request/role";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  created() {
    this.getMenuListAction();
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    ...mapActions("role", ["getRoleListAction"]),
    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          /*
            this.$refs.tree.getCheckedKeys() 获取树形控件被选中的id
        */
          //  单独获取
          this.formInfo.menus = this.$refs.tree.getCheckedKeys().join(",");
          if (this.info.isAdd) {
            //   ------新增------
            addRole(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getRoleListAction();
                // 3.关闭弹窗
                this.info.isShow = false;
              }
            });
          } else {
            // ----------编辑------------------
            editRole(this.formInfo).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getRoleListAction();
                // 3.关闭弹窗
                this.info.isShow = false;
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.formInfo = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //   单独清空
      this.$refs.tree.setCheckedKeys([]);
    },
    setFormInfo(obj) {
      this.formInfo = { ...obj };
      // 单独设置
      // 在dom渲染完成后，执行内部的代码
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.formInfo.menus.split(","));
      });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>