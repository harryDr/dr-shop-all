<template>
  <div class="hello">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/index">
              <i class="el-icon-menu"></i>
              <span >首页</span>
            </el-menu-item>
            <el-menu-item index="/banner">
              <i class="el-icon-menu"></i>
              <span>banner</span>
            </el-menu-item>
            <el-menu-item index="/recommond">
              <i class="el-icon-location"></i>
              <span>recommond</span>
            </el-menu-item>
            <el-menu-item index="/goods">
              <i class="el-icon-location"></i>
              <span>goods</span>
            </el-menu-item>
            <el-menu-item index="/category">
              <i class="el-icon-location"></i>
              <span>category</span>
            </el-menu-item>
            <el-menu-item index="/subCategory">
              <i class="el-icon-location"></i>
              <span>subCategory</span>
            </el-menu-item>
            <el-menu-item index="/subCategoryDetail">
              <i class="el-icon-location"></i>
              <span>subCategoryDetail</span>
            </el-menu-item>
<!-- 
            <el-menu-item index="/catalog">
              <i class="el-icon-menu"></i>
              <span >catalog</span>
            </el-menu-item> -->
            <el-menu-item index="/artical">
              <i class="el-icon-location"></i>
              <span>artical</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
