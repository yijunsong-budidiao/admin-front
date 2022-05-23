<template>
  <div class="login-container">
    <div class="login-box">
      <h3>小U商城后台管理系统</h3>
      <el-form
        :model="loginInfo"
        :rules="rules"
        ref="loginInfo"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="loginInfo.username" autocomplete="off">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginInfo.password"
            autocomplete="off"
            show-password
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../request/user";
export default {
  data() {
    return {
      loginInfo: {
        username: "admin",
        password: "admin888",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          userLogin(this.loginInfo).then((res) => {
            if (res.code == 200) {
              // 1.把登录接收到的信息存储到localStorage
              localStorage.setItem("userInfo", JSON.stringify(res.list));
              // 2.弹出登录成功的消息
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 3.跳转到Layout页面
              this.$router.push('/')
            } else {
              // 1.弹出失败消息
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url(../assets/imgs/loginbg.jpeg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 30px;
}
.login-box h3 {
  text-align: center;
  color: #409eff;
  margin: 40px 0;
}
.login-btn {
  width: 100%;
}
</style>