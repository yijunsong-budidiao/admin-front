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
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="formInfo.pid" placeholder="请选择上级分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="formInfo.catename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图片" v-if="formInfo.pid != 0">
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="change"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { addCate, editCate } from "../../request/cate";
export default {
  props: ["info"],
  data() {
    return {
      formInfo: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择分类", trigger: "blur" }],
        catename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl:''
    };
  },
  computed: {
    ...mapState({ cateList: (state) => state.cate.cateList }),
  },
  created() {},
  methods: {
    ...mapActions("cate", ["getCateListAction"]),
    submit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // 上传一个formData对象
          let fd = new FormData();
          for(let k in this.formInfo) {
            fd.append(k,this.formInfo[k])
          }

          if (this.info.isAdd) {
            // -----------新增--------------------
            addCate(fd).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getCateListAction();
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
            editCate(fd).then((res) => {
              if (res.code == 200) {
                // 1.弹出成功提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2.刷新列表
                this.getCateListAction();
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
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = ''
    },
    setFromInfo(obj) {
      // 把obj赋值给this.formInfo
      // 拷贝
      this.formInfo = { ...obj };
      this.imageUrl = this.$imgBaseUrl + this.formInfo.img
    },
    change(res, file) {
      // res上传图片的文件对象,file是上传文件的数组对象
      this.imageUrl = URL.createObjectURL(res.raw);
      this.formInfo.img = res.raw
    },
  },
  components: {},
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
  border-radius: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>