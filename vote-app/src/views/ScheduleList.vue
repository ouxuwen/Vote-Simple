<template>
  <div class="container">
    <div class="phase_list">
      <el-tag
        v-for="(tag,index) in phaseList"
        :key="tag.name"
        :closable="userInfo.type == 1"
        :type="index==selectIndex?'success':'info'"
        @click='chagePhase(index)'
        @close="deleteConfirm(tag.pid)"
      >
        {{tag.name}}
      </el-tag>
      <el-button
        type="primary"
        round
        @click="handleAdd"
        v-if="userInfo.type == 1"
      >Add Phase</el-button>
    </div>
    <div class="sc_list">
      <div class="sc_item">
        <el-table
          ref="singleTable"
          :data="showList"
          highlight-current-row
          border
          @current-change="handleCurrentChange"
          width="100%"
        >
          <el-table-column
            type="index"
            width="50"
          >
          <template slot-scope="scope">
                <i v-if="scope.row.subjects.length>0" class="el-icon-document"></i>
          </template>
          
          </el-table-column>
          <el-table-column
            property="user.username"
            label="Name"
            width="120"
          >
          </el-table-column>
          <el-table-column
            property="user.group"
            label="Group"
          >
          </el-table-column>
          <el-table-column label="Share date">
            <template slot-scope="scope">
              {{scope.row.share_date | date}}
            </template>
          </el-table-column>
          <el-table-column
            label="Operation"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleVote(scope.$index, scope.row)"
              >Vote</el-button>
              <i v-if="scope.row.isSelected" class="el-icon-success" ></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        class="vote_result"
        v-if="currentRow"
      >
        <p class="v_title">Vote Result</p>
        <div
          v-if="subjects && subjects.length > 0"
          v-for="(cu,index) in subjects"
          :key="index"
        >
          <div class="vote_item">
              <b>{{cu.votes.length}}</b>
              <i :style="{height:cu.votes.length*15+'px'}"></i>
              <p>{{cu.subject}}</p>
          </div>
        </div>
        <div
          class="no_data"
          v-if="!subjects || subjects.length == 0"
        >
          No Data.
        </div>
      </div>
    </div>
    <el-dialog
      title="Add Schedule"
      :visible.sync="dialogVisible"
      width="80%"
      @close="resetForm"
    >
      <el-form
        :model="phaseForm"
        :rules="phaseRules"
        :inline="true"
        ref="phaseForm"
      >
        <el-form-item
          label="Name"
          prop="name"
        >
          <el-input
            v-model="phaseForm.name"
            type="text"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="Start Date"
          prop="create_date"
        >
          <el-date-picker
            v-model="phaseForm.create_date"
            type="date"
            placeholder="Select Date"
            :picker-options="pickerOptions"
            @change="handleChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="Time Interval"
          prop="interval"
        >
          <el-select
            v-model="phaseForm.interval"
            placeholder="Select Interval"
            @change="handleChange"
          >
            <el-option
              label="One Week"
              value="1"
            ></el-option>
            <el-option
              label="Two Week"
              value="2"
            ></el-option>
            <el-option
              label="Three Week"
              value="3"
            ></el-option>
            <el-option
              label="Four Week"
              value="4"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="success"
          @click="handleGenerate"
        >Generate</el-button>
        <el-button
          v-if="userList"
          type="primary"
          @click="handleUpset"
        >Upset</el-button>
      </el-form>
      <div class="sc_list">
        <div
          class="sc_item"
          v-for='(ull,index) in userList'
          :key="index"
        >
          <el-table
            :data="ull"
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
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="group"
              label="Group"
            >
            </el-table-column>
            <el-table-column label="Share date">
              <template slot-scope="scope">
                {{scope.row.share_date | date}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button>Cancle</el-button>
        <el-button
          type="primary"
          @click="handleSave"
        >Save</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="Warning"
      :visible.sync="confirmVisible"
      width="330px"
      center
    >
      <p>Are you sure you want to delete <span v-if="phaseList && phaseList.length>0 && selectPid"> Phase {{phaseList[selectIndex].pid}}</span>?</p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="confirmVisible = false">Cancle</el-button>
        <el-button
          type="primary"
          @click="handleDelete"
        >Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Vote"
      :visible.sync="voteVisible"
      width="1000px"
      center
      @close="tempSubject = null"
    >
      <div class="subject">
        <div
          class="box-card"
          v-for="(su,index) in subjects"
          :class="{'selected': tempSubject && tempSubject.sid == su.sid }"
          :key='index'
          @click="selectVote(su)"
        >
          <div class="header">
            <el-tooltip placement="top">
              <div slot="content" v-if="su.votes && su.votes.length>0">
                Comments:<br>
                <span v-for="v in su.votes" :key="v.vid" v-if="v.comment">{{v.comment}} ;<br></span>
              </div>
              <span>{{su.subject}}</span>
            </el-tooltip>
            <el-badge
              :value="su.votes?su.votes.length:0"
              class="item"
            >
            </el-badge>
          </div>
          <div class="text" v-html="su.introduction"></div>
          <p class="comment"> Comment:</p>
             <el-input
              v-model="su.comment"
              @change="commentChange($event)"
              type="textarea"
              autocomplete="off"
              placeholder="Write your comment in here..."
          ></el-input>
          
          <p class="comment" v-if="selectSubject && selectSubject.sid == su.sid && selectSubject.comment">History Comment: <br>{{selectSubject.comment}}</p>
         
        </div>
        <div v-if="!subjects || subjects.length == 0" style="width:100%;text-align:center">
          No data
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="voteVisible = false">Cancle</el-button>
        <el-button
          type="primary"
          @click="voteConfirm()"
        >Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import * as api from "../service/api";
let disableTime = new Date().getTime();
export default {
  name: "ScheduleList",
  data() {
    
    return {
      userInfo: "",
      dialogVisible: false,
      confirmVisible: false,
      voteVisible: false,
      phaseForm: {
        create_date: null,
        interval: null,
        name:''
      },
      userList: null,
      currentRow: null,
      subjects: null,
      phaseRules: {
        create_date: [
          {
            required: true,
            message: "Please input the start date",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "Please input the name",
            trigger: "blur"
          }
        ],
        interval: [
          {
            required: true,
            message: "Please input the interval",
            trigger: "blur"
          }
        ]
      },
      pickerOptions: {

        disabledDate(time) {
          return time.getTime() < Date.now() || time.getDay() < 4 || time.getDay() > 5 ||  time.getTime()<disableTime ;
        }
      },
      originUser: null,
      phaseList: null,
      selectPid: 0,
      selectIndex: 0,
      showList: null,
      selectSubject: null,
      tempSubject:null

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
    //
    this.getPhase();
  },
  methods: {
    getPhase() {
      api.listPhase(this).then(res => {
        this.phaseList = res.data;
        const h = this.$createElement;
        //reset disableTime
        disableTime = new Date().getTime();

        if (this.phaseList.length > 0) {
          this.phaseList.forEach(pl=>{
            
            pl.lists.map((ll,i) =>{
              if(ll.share_date > disableTime){
                disableTime = ll.share_date
              }
              if(ll.uid === this.userInfo.uid && ll.subjects.length < 3){
                if(ll.share_date > new Date().getTime() ){
                    if(!sessionStorage.getItem('notice')){
                      this.$notify({
                        title: 'Notice',
                        message: h('i', { style: 'color: teal'}, `Hey ${this.userInfo.username}, You haven't finished ${pl.name}'s share subject yet! Everybody should prepare 3 subjects .`),
                        duration: 0
                      });
                    }
                    sessionStorage.setItem('notice',1); 
                }
                
              }
              ll.subjects.map((sl,si)=>{
                sl.votes.forEach(vl=>{
                  if(vl.uid === this.userInfo.uid){
                    pl.lists[i]['isSelected'] = true;
                    
                  }
                })
              })
            })
          })
          // console.log(this.phaseList)
          this.chagePhase(0);
        }else{
          this.showList = [];
        }
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleAdd() {
      this.dialogVisible = true;
      this.phaseForm = {
        create_date: null,
        name:'',
        interval: null
      };
    },
    handleGenerate() {
      this.$refs["phaseForm"].validate(valid => {
        if (valid) {
          api.listUser(this).then(res => {
            //原始用户列
            this.originUser = res.data;
            this.upset();
            this.generateList(this.originUser);
          });
        }
      });
    },
    chagePhase(index) {
      this.selectIndex = index;
      this.showList = this.phaseList[index].lists;
      this.setCurrent(this.showList[0]);
    },

    //生成计划表
    generateList(list) {
      // 开始时间
      let startTime = new Date(this.phaseForm["create_date"]).getTime();
      let userList = {
        java: [],
        net: []
      };
      let i = 0;
      let j = 0;
      list.forEach((el,index )=> {
        // 抽取一半是周五
        if (index < list.length) {
          i++;
          el["share_date"] = new Date(
            startTime +
              i * this.phaseForm["interval"] * 60 * 60 * 1000 * 24 * 7 
          ).getTime();
          userList.java.push(el);
          // 另一半是周四
        } else {
          j++;
          el["share_date"] = new Date(
            startTime + j * this.phaseForm["interval"] * 60 * 60 * 1000 * 24 * 7 + 60 * 60 * 1000 * 24
          ).getTime();
          userList.net.push(el);
        }
      });
      this.userList = userList;
      // console.log(userList);
    },
    handleUpset() {
      this.upset();
      this.generateList(this.originUser);
    },
    upset() {
      //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      this.originUser.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
    },
    handleSave() {
      if (this.userList) {
        api
          .addPhase(
            {
              phase: {name:this.phaseForm.name},
              lists: [...this.userList.net, ...this.userList.java]
            },
            this
          )
          .then(res => {
            this.$message({
              message: "Save Successfully!",
              type: "success"
            });
            this.dialogVisible = false;
            this.getPhase();
          });
      } else {
        this.$message({
          message: "Please genearte schedule first",
          type: "error"
        });
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.getSubject();
    },
    handleVote(index, row) {
    
      if(row.subjects.length ===0){
         this.$message({
          message: "This guy  hasn't prepare his share subject yet !",
          type: "error"
        });
        return;
      }
      this.tempSubject = this.selectSubject;
      // console.log(index, this.tempSubject);
      this.voteVisible = true;
    },
    handleChange() {
      this.userList = null;
    },
    resetForm() {
      this.$refs["phaseForm"].resetFields();
      this.userList = null;
    },
    deleteConfirm(index) {
      this.selectPid = index;
      this.confirmVisible = true;
    },
    handleDelete() {
      api.deletePhase(this.selectPid, this).then(res => {
        this.$message({
          message: "Delete Successfully!",
          type: "success"
        });
        this.confirmVisible = false;
        this.getPhase();
      });
    },
    getSubject() {
      if(!this.currentRow || !this.currentRow.lid )return;
      api.listSubject({ lid: this.currentRow.lid }, this).then(res => {
        this.subjects = res.data
        // console.log(this.subjects)
        if (this.subjects && this.subjects.length > 0) {
          this.subjects.map((el,i) => {
            if (el.votes && el.votes.length > 0) {
              el.votes.forEach(vo => {
                
                if (
                  vo.uid == this.userInfo.uid &&
                  vo.author_id == el.uid &&
                  vo.pid == el.pid
                ) {
                  
              
                  this.selectSubject = {comment:vo.comment,...el};

                }
              });
            }
          });
        }
      });
    },
    voteConfirm() {
      if(!this.tempSubject)return;
      api
        .addVote(
          {
            ...this.tempSubject,
            uid: this.userInfo.uid,
            author_id: this.tempSubject.uid
          },
          this
        )
        .then(res => {
          this.$message({
            message: "Vote Successfully!",
            type: "success"
          });
          this.voteVisible = false;
          this.getPhase();
        });
    },
    selectVote(su) {
      this.tempSubject = su ;
      // console.log(this.tempSubject);
    },
    commentChange(e){
      // console.log(e)
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
.sc_list {
  display: flex;
  justify-content: space-between;
  .sc_item {
    width: 60%;
  }
  .vote_result {
    border: 1px solid #ebeef5;
    min-height: 500px;
    max-height: 700px;
    justify-content: space-between;
    flex: 1;
    display: flex;
    position: relative;
    .v_title{
      position: absolute;
      width:100%;
      text-align: center;
      top:0;
      left: 0;
    }
    > div {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    .no_data {
      width: 100%;
      justify-content: center;
    }
    .vote_item {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: center;
      i {
        width: 40px;
        display: inline-block;
        height: 0;
        transition: .5s all linear;
        background: #409eff;
      }
    }
  }
  .el-tag {
    cursor: pointer;
  }
}
.subject {
  display: flex;
  .box-card {
    width: 30%;
    margin-right: 3%;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    transition: 0.2s all linear;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.164);
    }
    &.selected {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.164);
    }
    .header {
      padding: 20px;
      border-bottom: 1px solid #f2f2f2;
    }
    .text {
      padding: 20px;
    }
    p{
      padding-left: 20px;
       border-top: 1px solid #f2f2f2;
       margin-bottom: 5px;
    }
    .el-textarea{
       /deep/ textarea{ border:none;}
    }
    .el-collapse{
       padding-left: 20px;
    }
  }
}
.el-icon-success{
  color:#67C23A;
  margin-left: 10px;
}
.el-icon-document{
  color:#409EFF;
}
</style>
