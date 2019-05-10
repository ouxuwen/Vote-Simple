<template>

  <div class="container">
    <div class="header">
      <el-button
        type="primary"
        @click="handlerAdd"
      ><i class="el-icon-plus el-icon--left"></i>New User</el-button>
    </div>

    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      border
      width="100%"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>

      <el-table-column
        property="username"
        label="Name"
      >
       </el-table-column>
      <el-table-column
        property="email"
        label="Email"
      >
      </el-table-column>
      <el-table-column
        property="group"
        label="Group"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="Create Date"
      >
       <template slot-scope="scope">
              {{scope.row.create_date | date}}
        </template>
      </el-table-column>
      <el-table-column
        label="Operation"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >Eidt</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      @close="resetForm('userForm')"
    >
      <el-form
        :model="userForm"
        :rules="userRules"
        ref="userForm"
      >
        <el-form-item
          label="User Name"
          label-width="200"
          prop="username"
        >
          <el-input
            v-model="userForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Eamil"
          label-width="200"
          prop="email"
        >
          <el-input
            autocomplete="off"
            v-model="userForm.email"
          ></el-input>
        </el-form-item>
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
          label="Group"
          label-width="200"
          prop="group"
        >
          <el-select
            v-model="userForm.group"
            placeholder="Select Group"
          >
            <el-option
              label="Java"
              value="java"
            ></el-option>
            <el-option
              label="Asp.Net"
              value="net"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible=false;resetForm('userForm')">Cancle</el-button>
        <el-button
          type="primary"
          @click="submitForm('userForm')"
        >Save</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="Warning"
      :visible.sync="confirmVisible"
      width="300px"
      center
    >
      <p>Are you sure you want to delete <span v-if="selectId"> {{tableData[selectId].username}}</span>?</p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="confirmVisible = false">Cancle</el-button>
        <el-button
          type="primary"
          @click="deleteHandler"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../service/api";
export default {
  name: "UserManagement",
  data() {
    return {
      userInfo: "",
      title: "Add User",
      dialogVisible: false,
      confirmVisible: false,
      isEdit: false,
      selectId: null,
      userForm: {
        username: "",
        password: "",
        email:"",
        group: "",
        type: 0
      },
      userRules: {
        username: [
          {
            required: true,
            message: "Please input the username",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input the email",
            trigger: "blur"
          },
          { type: 'email', message: 'Please input the valid email address', trigger: ['blur'] }
        ],
        password: [
          {
            required: true,
            message: "Please input the password",
            trigger: "blur"
          },
          { min: 6, message: "Min lenght 6", trigger: "blur" }
        ],
        group: [
          {
            required: true,
            message: "Please select the group",
            trigger: "blur"
          }
        ]
      },
      tableData: []
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
   mounted() {
    
     this.getUser();
  },
  methods: {
    getUser() {
      api.listUser(this).then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.title = "Edit User";
      this.userForm ={...this.tableData[index]};
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.selectId = index;
      this.confirmVisible = true;
    },
    deleteHandler() {
      api.deleteUser(this.tableData[this.selectId].uid).then(res => {
        this.$message({
          message: "Delete Succfully!",
          type: "success"
        });
        this.confirmVisible = false;
        this.selectId = null;
        this.getUser();
      });
    },
    handlerAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.title = "Add User";
      this.userForm = {
        username: "",
        password: "",
        group: "",
        email:'',
        type: 0
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            api.updateUser(this.userForm.uid, this.userForm, this).then(res => {
              this.dialogVisible = false;
              this.$message({
                message: "Update Succfully!",
                type: "success"
              });
              this.getUser();
            });
          } else {
            api.addUser(this.userForm, this).then(res => {
              this.dialogVisible = false;
              this.$message({
                message: "Add Succfully!",
                type: "success"
              });
              this.getUser();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
.header {
  margin-bottom: 10px;
}
</style>
