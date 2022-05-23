<template>
  <div>
    <el-table
      :data="specsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
    >
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column prop="attrs" label="规格可选值" width="300">
        <template slot-scope="scope">
          <el-tag class="tag" type="success" effect="dark" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="warning" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="specsTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
// 辅助函数
import { mapState, mapActions } from "vuex";
// 导入删除方法
import { delSpecs } from "../../request/specs";
export default {
  props: ["info", "params"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      specsList: (state) => state.specs.specsList,
      specsTotal: (state) => state.specs.specsTotal,
    }),
  },
  created() {
    this.getSpecsListAction(this.params);
  },
  methods: {
    ...mapActions("specs", ["getSpecsListAction"]),
    edit(row) {
      // 1.弹框显示
      this.info.isShow = true;
      this.info.isAdd = false;
      // 2.绑定数据
      this.$emit("setFormInfo", row);
    },
    del(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除操作
          delSpecs(id).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getSpecsListAction(this.params);
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(val);
      this.params.size = val
      this.getSpecsListAction(this.params);
    },
    handleCurrentChange(val) {
      console.log(val);
      this.params.page = val
      this.getSpecsListAction(this.params);
    },
  },
  components: {},
};
</script>
<style scoped>
.tag {
  margin-right: 5px;
}
</style>