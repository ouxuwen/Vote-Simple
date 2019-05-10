<template>

  <div class="container">
    <div class="phase_list">
      <el-tag
        v-for="(tag,index) in phaseList"
        :key="tag.pid"
        :type="selectPid == tag.pid?'':'info'"
        @click="changePhase(index)"
      >
        {{tag.phase.name}}
      </el-tag>
      <el-button
        type="primary"
        round
        @click="handleAdd"
        v-if="(!subjects || subjects.length<3 ) && selectPid"
      >Add Subject</el-button>
    </div>
    <div class="subject_list">
      <subject-card :subjects="subjects" 
      @save='getSubject'></subject-card>
    </div>
    <add-subject
      :dialogFormVisible="dialogVisible"
      :form="form"
      :title="title"
      :types="type"
      :pid='selectPid'
      @save='getSubject'
      @close-event="handClose($event)"
    ></add-subject>
  </div>
</template>

<script>
import * as api from "../service/api";
import SubjectCard from "@/components/SubjectCard";
import EditSubject from "@/components/EditSubject";
export default {
  name: "MySchedule",
  data() {
    return {
      
      dialogVisible: false,
      title: "Add Subject",
      form: {
        subject: "",
        introduction: ""
      },
      userInfo: null,
      phaseList: null,
      pid: null,
      type: "add",
      selectPid: null,
      selectIndex: 0,
      subjects:null
    };
  },
  components: {
    "subject-card": SubjectCard,
    "add-subject": EditSubject
  },
  computed: {},
  created() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push("/Login");
    } else {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    this.getSubject();
  },
  methods: {
    handleAdd() {
      this.type = "add";
      this.dialogVisible = true;
    },
    handClose(e) {
      this.dialogVisible = e;
      this.form={
        subject: "",
        introduction: ""
      }
    },
    getSubject() {
      api.listUserPhase(this.userInfo.uid, this).then(res => {
        this.phaseList = res.data;
        if (res.data && res.data.length>0) {
          this.selectPid = res.data[this.selectIndex].pid;
          this.subjects = res.data[this.selectIndex].subjects;
        }
      });
    },
    changePhase(index) {
      this.selectIndex = index;
      this.selectPid = this.phaseList[index].pid;
      this.subjects = this.phaseList[index].subjects;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
.phase_list {
  text-align: left;
  padding: 10px 0;
  .el-tag {
    margin-left: 10px;
    cursor: pointer;
  }
  button {
    float: right;
    margin-top: -4px;
  }
}
</style>
