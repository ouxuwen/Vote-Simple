<template>
  <div class="home-container">
    <div class="header">
      <img
        src="../assets/logo.png"
        alt=""
      >
      <span class="brand">Personal Dashbord</span>
      <el-button
        type="danger"
        @click="logout()"
      >Logout</el-button>
      <el-button
        type="primary"
        @click="reset()"
      >Reset Passwrod</el-button>
      <span class="user">Welcome , {{userInfo["username"]}}</span>
    </div>
    <div class="section">
      <div class="nav">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <router-link to="ScheduleList">
            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">Schedule List</span>
            </el-menu-item>
          </router-link>
          <router-link
            to="MySchedule"
            v-if="userInfo.type == 0"
          >
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">My Schedule</span>
            </el-menu-item>
          </router-link>
          <router-link
            to="UserManagement"
            v-if="userInfo.type == 1"
          >
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">User Management</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <div class="content">
        <router-view />
      </div>
      <el-dialog
        title="Reset Password"
        :visible.sync="dialogVisible"
        width="600px"
        @close="handleClose('userForm')"
      >
        <el-form
          :model="userForm"
          :rules="userRules"
          ref="userForm"
        >

          <el-form-item
            label="Password"
            label-width="200"
            prop="password"
          >
            <el-input
              autocomplete="off"
              v-model="userForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="New Password"
            label-width="200"
            prop="newPassword"
          >
            <el-input
              autocomplete="off"
              v-model="userForm.newPassword"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleClose('userForm')">Cancle</el-button>
          <el-button
            type="primary"
            @click="submitForm()"
          >Save</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as api from "../service/api";
export default {
  name: "Home",
  data() {
    return {
      userInfo: null,
      dialogVisible: false,
      userForm: {
        password: "",
        newPassword: ""
      },
      userRules: {
        newPassword: [
          {
            required: true,
            message: "Please input the new password",
            trigger: "blur"
          },
          { min: 6, message: "Min lenght 6", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "Please input the password",
            trigger: "blur"
          },
          { min: 6, message: "Min lenght 6", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  created() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push("/Login");
    } else {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  methods: {
    handleOpen() {},
    handleClose(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    logout() {
      this.$router.push("/Login");
      localStorage.clear();
      sessionStorage.clear();
    },
    reset() {
      this.dialogVisible = true;

      this.userForm = {
        password: "",
        newPassword: ""
      };
    },

    submitForm() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          api
            .updatePassword(this.userInfo.uid, this.userForm, this)
            .then(res => {
              this.dialogVisible = false;
              this.$message({
                message: "Update Succfully!",
                type: "success"
              });
              this.getUser();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
  .header {
    height: 50px;
    background: rgb(84, 92, 100);
    z-index: 10;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
    color: #fff;
    img {
      height: 50px;
      margin-left: 15px;
      vertical-align: middle;
      float: left;
    }
    span {
      display: inline-block;
      line-height: 50px;
      padding: 0 15px;
      float: left;
    }
    .brand {
      font-size: 16px;
      font-weight: bold;
    }
    .user {
      line-height: 50px;
      float: right;
    }
    button {
      float: right;
      margin-right: 15px;
      margin-top: 25px;
      transform: translateY(-50%);
    }
  }
  .el-menu-item {
    text-align: left;
  }
  .section {
    flex: 1;
    display: flex;
    .nav {
      background: rgb(84, 92, 100);
      border-right: solid 1px #e6e6e6;
      ul {
        border: none;
      }
    }
    .content {
      flex: 1;
      padding: 10px;
    }
  }
}
</style>
