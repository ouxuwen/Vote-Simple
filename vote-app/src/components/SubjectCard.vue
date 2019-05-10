<template>
  <div class="subject">
    <div  class="box-card" :key="index" v-for="(su,index) in subjects">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >{{su.subject}}
        <el-badge
          :value="su.votes?su.votes.length:0"
          class="item"
        >
        
        </el-badge>
        <el-button
          style="float: right; padding: 3px 0;color:#f56c6c"
          type="text"
          @click="handleDelete(index)"
        >Delete</el-button>
        <el-button
          style="float: right; padding: 3px 5px;"
          type="text"
          @click="handleEdit(index)"
        >Edit</el-button>
      </div>
      <div  v-html="su.introduction">
     
      </div>
      
    </el-card>
    <div class="comments">
        <p class="title"> Comments:</p>
      
         <el-alert
          v-for="vo in su.votes"
          v-if="vo.comment"
          :title="vo.user.username+ ':'+vo.comment"
          type="info"
          show-icon
          :closable="false"
          >
        </el-alert>
    
    </div>
    </div>
    <edit-subject
      :dialogFormVisible="dialogVisible"
      :form="form"
      :title="title"
      types='edit'
      @close-event="handClose($event)"
      @save="handleSave"
    ></edit-subject>
    <el-dialog
      title="Warning"
      :visible.sync="confimVisible"
      width="30%"
      center
    >
      <span>Are you sure you want to delete it? </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="confimVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="deleteConfirm()"
        >Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as api from "../service/api";
import EditSubject from "@/components/EditSubject";
export default {
  name: "SubjectCard",
  data() {
    return {
      title: "Edit Subject",
      dialogVisible: false,
      confimVisible: false,
      form: {
        subject: "",
        introduction: ""
      },
      selectId: null
    };
  },
  components: {
    "edit-subject": EditSubject
  },
  props: {
    subjects: {
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    handleEdit(i) {
      console.log(i);
      this.title = "Edit Subject";
      this.form = this.subjects[i];
      this.dialogVisible = true;
    },
    handleDelete(id) {
      this.title = "Edit Subject";
      this.confimVisible = true;
      this.selectId = this.subjects[id].sid;
    },
    handClose(e) {
      this.dialogVisible = e;
    },
    handleSave() {
      this.$emit("save");
    },
    deleteConfirm() {
      api.deleteSubject(this.selectId, this).then(res => {
        this.$message({
          message: "Delete Succfully!",
          type: "success"
        });
        this.$emit("save");
        this.confimVisible = false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
.subject {
  display: flex;
  .box-card {
    width: 30%;
    margin-right: 3%;
    
    .clearfix {
      text-align: left;
    }
    .text {
      text-align: left;
    }
     /deep/ .el-badge__content.is-fixed{
   
      right: 0;
    }
    .comments{
      text-align: left;
      border-top:1px solid #d2d2d2;
      p.title{
       
        color:#4d4d4d;
      }
    }
  }
}
</style>
