<template>
  <div id="display">
    <a-crad
      id="cardLogin"
      v-if="this.loading"
      :style="{
        width: '22%',
        background: '#ffffff90',
        border: '2px solid #035096',
        padding: '3%',
        borderRadius: '5%',
      }"
    >
      <a-row :gutter="[8, 8]">
        <a-col :span="24">
          <h1>Informatics System</h1>
        </a-col>
      </a-row>
      <a-row :gutter="[8, 16]">
        <a-col :span="24">
          <a-input type="text" placeholder="ชื่อผู้ใช้" v-model="username">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-col>
        <a-col :span="24">
          <a-input type="password" placeholder="รหัสผ่าน" v-model="password">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-col>
      </a-row>
      <br />

      <a-row :gutter="[8, 8]">
        <a-col :span="24">
          <a-button type="primary" :style="{ width: '100%' }" @click="login()">
            เข้าสู่ระบบ
          </a-button>
        </a-col>
      </a-row>
    </a-crad>
    <a-crad
      v-if="!this.loading"
      :style="{
        width: '22%',
        background: '#ffffff9',
        border: '2px solid #035096',
        padding: '3%',
        borderRadius: '5%',
      }"
    >
      <a-row :gutter="[8, 8]">
        <vue-loading
          type="spin"
          color="blue"
          :size="{ width: '70px', height: '70px' }"
        ></vue-loading>
      </a-row>
      <br />
      <a-row :gutter="[8, 0]">
        <a-col :span="24">
          <p><b>ตรวจสอบบัญชีผู้ใช้</b></p>
        </a-col>
      </a-row>
    </a-crad>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
const axios = require("axios");
export default {
  data() {
    return {
      loading: true,
      username: "",
      password: "",
    };
  },
  components: {
    VueLoading,
  },
  methods: {
    login() {
      if (!this.checkSpecificKey()) {
        this.$notification["warning"]({
          message: "การแจ้งเตือน",
          description: "ช่องว่างไม่สามารถกรอกได้",
          duration: 3,
        });
      } else if (this.username == "") {
        this.$notification["warning"]({
          message: "ชื่อผู้ใช้ ไม่ได้กรอกข้อมูล",
          description: "กรุณากรอกชื่อผู้ใช้",
          duration: 3,
        });
      } else if (this.password == "") {
        this.$notification["warning"]({
          message: "รหัสผ่าน ไม่ได้กรอกข้อมูล",
          description: "กรุณากรอกรหัสผ่าน",
          duration: 3,
        });
      } else {
        const self = this;
        self.loading = false;
        let params = {
          username: self.username,
          password: self.password,
        };
        axios
          .post("http://localhost:8080/personRouters/checkUser", {
            params,
          })
          .then(function(response) {
            const data = response.data;
            if (data.status) {
              self.$router.push({ path: "home" });
              self.$store.state.user.user_name = data.ProfileUser.person_name;
              self.$store.state.user.user_id = data.ProfileUser.person_id;
              self.$store.state.user_menu = data.System;
              console.log(self.$store.state.user_menu);
              sessionStorage.setItem(
                "person_name",
                data.ProfileUser.person_name
              );
              sessionStorage.setItem("person_id", data.ProfileUser.person_id);
              sessionStorage.setItem(
                "person_menu",
                JSON.stringify(self.$store.state.user_menu)
              );
              self.$store.state.status_login = true;
              self.$notification["success"]({
                message: "การแจ้งเตือน",
                description:
                  "ยินดีต้อนรับ " +
                  data.ProfileUser.person_name +
                  "\n เข้าสู่ระบบ Informatics System ",
                duration: 3,
              });
            } else {
              self.loading = true;
              self.$notification["error"]({
                message: "ไม่สามารถเข้าสู่ระบบได้",
                description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                duration: 3,
              });
            }
          })
          .catch(function(error) {
            console.log("error");
            console.log(error);
          });
      }
    },
    checkSpecificKey() {
      // var specialKey =
      //   "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < this.username.length; i++) {
        // if (specialKey.indexOf(this.username.substr(i, 1)) != -1) {
        //   return false;
        // }
        if (this.username[i] == " ") {
          return false;
        }
      }
      return true;
    },
  },
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#display {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
