<template>
  <div class="login">
    <el-form :data="userForm">
      <el-form-item label="用户名">
        <el-input  v-model="userForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="regin">注册</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    regin() {
      this.$axios.post("/api/login/regin", this.userForm).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          //注册成功
          console.log("注册成功");
          this.userForm = {};
        } else {
          alert(data.msg);
        }
      });
    },
    login() {
      console.log("123123");
      this.$axios.post("/api/login/login", this.userForm).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          //注册成功
          console.log("登录成功！");
          this.$router.push("/");
          sessionStorage.setItem('userName',this.userForm.user)   //session中存储用户信息
          this.$store.state.userName = this.userForm.user
        } else {
          alert(data.msg);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  width: 420px;
  text-align: center;
  margin: 120px auto;
}
</style>
