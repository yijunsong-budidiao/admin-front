<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '226px'">
        <h3 class="logo">小U商城后台</h3>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>

          <div v-for="(item, index) in menus" :key="item.id">
            <!-- 有下拉 -->
            <el-submenu :index="String(index)" v-if="item.type == 1">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="a in item.children"
                :key="a.id"
                :index="a.url"
              >
                <span slot="title">{{ a.title }}</span>
              </el-menu-item>
            </el-submenu>
            <!-- 没有下拉直接点击 -->
            <el-menu-item :index="item.url" v-else>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <el-button
              class="btn"
              @click="isCollapse = !isCollapse"
              type="primary"
              icon="el-icon-s-fold"
              size="mini"
            ></el-button>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                >管理中心</el-breadcrumb-item
              >
              <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="fullscreen">
                    <i class="el-icon-full-screen"></i>
                    全屏展示
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="quit">
                    <i class="el-icon-switch-button"></i>
                    安全退出
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <!-- 二级路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
// 1.导入
import Vue from "vue";
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);
export default {
  data() {
    return {
      isCollapse: false,
      menus: [],
      username:''
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    this.menus = userInfo.menus;
    this.username = userInfo.username
    console.log(userInfo)
  },
  methods: {
    quit() {
      // 1.清空localStorage
      localStorage.removeItem("userInfo");
      // 2.弹出退出成功弹框
      this.$message({
        message: "退出成功",
        type: "success",
      });
      // 3.跳转到登录页面
      this.$router.push("/login");
    },
    fullscreen() {
      this.$refs.fullscreen.toggle();
    },
  },
  components: {},
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  box-shadow: 0 0 5px #000;
  z-index: 1;
  justify-content: space-between;
}

.el-aside {
  background-color: #333;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-weight: 400;
  letter-spacing: 3px;
  background-color: #555;
}
.el-menu {
  border: 0;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.left {
  display: flex;
  align-items: center;
}
.btn {
  margin-right: 10px;
}
</style>