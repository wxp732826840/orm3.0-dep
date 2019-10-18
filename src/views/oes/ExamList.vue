<template>
  <div>
    <van-nav-bar title="在线考试"  fixed left-arrow @click-left="onClickLeft" class=""/>
    <van-search v-model="type" placeholder="请选择业务类型" input-align="center" left-icon readonly @click="showPopup()" @search="showPopup()">
      <span slot="right-icon"><van-icon name="search" size="26" @click="showPopup()" /></span>
    </van-search>
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">单击
      <span class="center-vertical"><van-icon name="search" size="16" /></span>选择业务类型
    </van-notice-bar>
    <van-button type="info" icon="star-o" @click="examDialog()" size="large" :disabled="getButtonStatus()">开始考试</van-button>
    {{this.$store.state.path}}
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <van-picker :columns="columns" show-toolbar title="业务类型" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    <div class="exam-list">
      <div class="exam-detail" v-for="(exam,index) in examResult" :key="index">
          <ws-tag title="期数类型" plain :content="getTypeName(exam.halfYear,exam.type)"></ws-tag>
          <ws-tag title="积分原因" type="danger" plain :content="exam.pointReason" v-show="exam.pointReason != null"></ws-tag>
          <ws-tag title="部门日期" type="success" plain :content="exam.groupName +' '+exam.createdTimeString"></ws-tag>
          <van-row type="flex"  justify="space-around">
            <van-col span="6"><van-tag color="#7232dd" plain>积分：{{exam.sumPoints}} 积分</van-tag></van-col>
            <van-col span="6"><van-tag color="#7232dd" plain>得分：{{exam.score}} 分</van-tag></van-col>
            <van-col span="6"><van-tag type="warning"  plain  @click="getMoreInfo(exam.id)">详细信息 ...</van-tag></van-col>
          </van-row>
      </div>
    </div>
    <van-popup v-model="showPop" lazy-render @click-overlay="setMoreInfo" close-icon="close" position="bottom" :style="{ height: '90%' }">
      <ws-checkbox-group :items="items" :result="result" :show-all="showAll">
        <div slot="footer" slot-scope="props">
           <ws-tag title="提交答案" plain :content="props.item.submitAnswer"></ws-tag>
           <ws-tag title="制度编号" plain :content="props.item.regCode"></ws-tag>
           <ws-tag title="制度名称" plain :content="props.item.regName"></ws-tag>    
        </div>
      </ws-checkbox-group>
    </van-popup>
    <quick-menu :menu-count=count :icon-class=icons :menu-url-list=list :position="position"></quick-menu> 
    <van-dialog v-model="dialogShow" title="考试说明及注意事项" confirm-button-text="已知晓，继续考试"  @confirm="startExam" cancel-button-text="不考试" show-cancel-button>
      <exam-dialog></exam-dialog>
      <span slot="title">考试说明及注意事项</span>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {Popup,Button,Picker,Search,Icon,NoticeBar,Tag,Row,Col,Sticky,Dialog,NavBar } from "vant";
Vue.use(Popup).use(Button).use(Picker).use(Search).use(Icon).use(NoticeBar).use(Button).use(Tag).use(Row).use(Col).use(Sticky).use(Dialog).use(NavBar);
import {dict,pickerSplit,post} from '@/axios/api';
import WsTag from '@/components/common/WsTag';
import Exam from '@/views/oes/Exam';
import ExamDialog from '@/views/oes/ExamDialog';
import WsCheckboxGroup from "@/components/common/WsCheckboxGroup";
import quickMenu from '@/components/content/quickMenu';
export default {
  name: "ExamList",
  data() {
    return {
      type: "",
      typeValue: "",
      typeData:{},
      show: false,
      columns: [],
      columnsValues: [],
      examResult:{},
      showPop:false,
      items:[],
      result:[],
      showAll:true,
      dialogShow:false,
      count:4,
      icons:[
        "iconfont icon-jifenguizeguankong2",
        "iconfont icon-daiban2",
        "iconfont icon-exam4",
        "iconfont icon-daibanshixiang",
      ],
      list:[
        {isLink:false,url:'/Test2'},
        {isLink:false,url:'/Test2'},
        {isLink:false,url:'/Home'},
        {isLink:false,url:'/Home'},
      ],
      position:"bottom-right",
      headers:{}
    };
  },
  components:{
    WsTag,Exam,WsCheckboxGroup,quickMenu,ExamDialog
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.type = value;
      this.typeValue = this.columnsValues[index];
      console.info(`当前值：${value}, 当前索引：` + this.columnsValues[index]);
      this.show = false;
    },
    getTypeName(key,value){
      return key+"     "+this.typeData[value];
    },
    onCancel() {
      this.show = false;
    },
    getButtonStatus() {
      return this.typeValue ? false : true;
    },
    getMoreInfo(examId) {
      post("api/exam/view/"+examId,{}).then(result =>{
        for (var item of result.list) {
        this.$set(this.result, item.id, []);
        }
        this.items = result.list;
        this.showPop=true;
      })
    },
    setMoreInfo(){
      this.result= [];
      this.items = [];
      this.showPop=false;
    },
    examDialog(){
      this.dialogShow =true;
    },
    startExam(){ 
      this.dialogShow =false;
      this.examResult = [];
      this.$router.replace('/exam/'+this.typeValue);
    },
    onClickLeft(){
      this.$router.go(-1);
    }
  },
  created() {
    dict('OES_SERVICE_TYPE').then(result =>{
      let data =  pickerSplit(result);
      this.typeData = data.json;
      this.columnsValues = data.values;
      this.columns = data.keys;
    });
    post("api/exam/queryDto",{
      "_EQS_createdById": this.$store.state.Authorization,
      "page": 1,
      "rows": 10
    }).then(result =>{
      this.examResult = result.rows;
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-cell {
  line-height: 35px;
  font-size: 16px;
}
.van-notice-bar {
  height: 26px;
  font-size: 14px;
}
.center-vertical {
  display: inline-block;
  vertical-align: middle;
  line-height: 12px;
}
.van-button--large {
  height: 38px;
  line-height: 36px;
}
.exam-list {
  height: 100%;
  background: #fff;
  border-top: 1px solid #ebedf0;
  /*margin-bottom: 50px;*/
}
.exam-detail {
  border-bottom: 1px solid #ebedf0;
  padding: 10px 5px;
  margin: 0 5px 0 5px;
}
.van-search{
  padding: 0px 0px;
  padding-top: 66px;
}
.van-nav-bar{
  padding-top: 20px;
}
</style>