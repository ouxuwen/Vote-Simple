<template>

  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
  >
    <el-form
      :model="form"
      ref="subjectForm"
      :rules="subjectRoles"
    >
      <el-form-item
        label="Subject"
        label-width="100"
        prop="subject"
      >
        <el-input
          v-model="form.subject"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Introduction"
        label-width="100"
        prop="introduction"
      >
      </el-form-item>
      <quill-editor 
        v-model="form.introduction"
        :options="editorOption"
        >
      </quill-editor>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="closeHandler">Cancle</el-button>
      <el-button
        type="primary"
        @click="handleSave"
      >Save</el-button>
    </div>
  </el-dialog>

</template>

<script>
import * as api from "../service/api";

import { quillEditor } from 'vue-quill-editor'
 
export default {
  name: "EditSubject",
  data() {
    return {
      userInfo: null,
      dialogVisible: false,
      subjectRoles: {
        subject: [{ required: true, trigger: "blur" }],
        introduction: [{ required: true, trigger: "blur" }]
      },
      editorOption:{
         modules: {
             toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'font': [] }],
              [{ 'color': [] }],
              [{ 'align': [] }],
            ]
          }
      }
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage["userInfo"]);
  },
  computed: {},
  components: {
    quillEditor
  },
  watch: {
    dialogFormVisible(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("close-event", val);
    }
  },
  props: {
    title: String,
    dialogFormVisible: Boolean,
    types: String,
    pid: Number,
    form: {
      default: () => {
        return {
          subject: "",
          introduction: ""
        };
      }
    }
  },
  methods: {
    closeHandler() {
      this.dialogVisible = false;
      this.$refs.subjectForm.resetFields();
      this.$emit("close-event", this.dialogVisible);
    },
    handleAdd() {
      console.log(this.form);
      this.$refs.subjectForm.validate(valid => {
        if (valid) {
          api
            .addSubject(
              { pid: this.pid, uid: this.userInfo.uid, ...this.form },
              this
            )
            .then(res => {
              this.dialogVisible = false;
              this.$message({
                message: "Add Succfully!",
                type: "success"
              });
              this.$refs.subjectForm.resetFields();
              this.$emit("save");
            });
        }
      });
    },
    handleEdit() {
      console.log(this.form);
      this.$refs.subjectForm.validate(valid => {
        if (valid) {
          api.updateSubject(this.form, this).then(res => {
            this.dialogVisible = false;
            this.$message({
              message: "Update Succfully!",
              type: "success"
            });
            this.$refs.subjectForm.resetFields();
            this.$emit("save");
          });
        }
      });
    },
    handleSave() {
      if (this.types === "add") {
        this.handleAdd();
      } else {
        this.handleEdit();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">

 
</style>
