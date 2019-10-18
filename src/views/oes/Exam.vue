<template>
  <div>
    <div class="div-count-down">
      <van-count-down :time="time" @finish="finishCountDown">
        <template v-slot="timeData">
          <van-tag type="primary" size="medium">{{ timeData.minutes }} 分</van-tag>
          <van-tag type="primary" size="medium">{{ timeData.seconds }} 秒</van-tag>
        </template>
      </van-count-down>
    </div>
    <ws-checkbox-group :items="items" :result="result" :show-id="showId"></ws-checkbox-group>
    <van-pagination v-model="showId" :page-count="total" mode="simple" prev-text="上一题" next-text="下一题"/>

    <van-button type="info"  @click="submitExam()"  :disabled="getButtonStatus()" loading-text="交卷中..." size="large" >交&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卷</van-button>
    <van-grid square :column-num="5">
      <van-grid-item v-for="value in total" :key="value" :text="getGridItem(value)" @click="setGridItem(value)">
        <van-icon :name="getIcon(value)" size="35" color="#1989fa" slot="icon" />
      </van-grid-item>
    </van-grid>
    <van-dialog v-model="show" title="提示" :message="message" @confirm="confirm"></van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import WsTag from "@/components/common/WsTag";
import WsCheckboxGroup from "@/components/common/WsCheckboxGroup";
import {Pagination,CountDown,Button,Grid,GridItem,Icon,Dialog } from "vant";
import {dict,pickerSplit,post} from '@/axios/api';
Vue.use(Pagination).use(CountDown).use(Button).use(Grid).use(GridItem).use(Icon).use(Dialog);
export default {
  data() {
    return {
      time: 0,
      showId: 1,
      total: 0,
      items: [],
      result: {},
      examId: "",
      show:false,
      message:""
    };
  },
  components: { WsTag,WsCheckboxGroup },
  computed: {},
  methods: {
    
    
    finishCountDown() {
      console.info("倒计时提交数据");
    },
    getIcon(index) {
      //如果是当前显示的为正在编辑图标
      //选过的为解锁图标
      //未打过的为锁图标
      if (this.showId == index) {
        return "edit";
      } else {
        let item = this.items[index - 1];
        if (this.result[item.id].length > 0) {
          return "certificate";
        } else {
          return "lock";
        }
      }
    },
    getGridItem(index) {
      return "第" + index + "题";
    },
    setGridItem(index) {
      this.getIcon(index);
      this.showId = index;
    },
    getButtonStatus() {
      for (let item of this.items) {
        if (this.result[item.id].length == 0) {
          return true;
        }
      }
      return false;
    },
    submitExam(){
      console.info( eval('(' + JSON.stringify(this.result) + ')'));
      var data = {"examId":this.examId}
      var dataJson = eval('(' + JSON.stringify(this.result) + ')')
      for(let item in dataJson){
        //console.info("item="+item);
        let value = dataJson[item].join(",");
        //console.info("item="+value);
        data[item]= value;
      }
      //console.info(data);
      post("api/exam/saveResult",data).then(result =>{
        if(result.success){
          this.message = result.msg+"\n本次考试所得分数"+result.Score;
          this.show =true;
        }else{
           this.message = result.msg;
          this.show =true;
        }
         
      });
    },
    confirm(){
      this.items = [];
      this.result = [];
      this.$router.replace('/examList');
    }
  },
  created() {
    let type = this.$route.params.type;
    post("api/exam/startExam/"+type,{}).then(result =>{
      this.items = result.list;
      this.total = result.listsize;
      this.examId = result.examId;
      this.time = result.examLength* 60 * 1000;
       for (let item of  this.items) {
        this.$set(this.result, item.id, []);
      }
    });
  }
};
</script>
<style  scoped>
div {
  padding: 2px 0px 2px 0px;
}
.div-count-down {
  text-align: center;
}
</style>
