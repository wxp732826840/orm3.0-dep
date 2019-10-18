<template>
  <div class="page">
    <div v-for="(item,index) in items" :key="index" class="div-exam" v-show="getShowId(index)">
      <div class="div-title">
        <ws-tag :title="getQuestionType(item.questionType)" :content="item.question">
          <span slot="header">【第{{index+1}}题】</span>
        </ws-tag>
      </div>
      <van-checkbox-group v-model="result[item.id]" :max="getMax(item.questionType)">
        <van-checkbox
          :name="showName"
          :shape="getShape(item.questionType)"
          v-show="getShow(item[showItem[order]],item.questionType,order)"
          v-for="(showName,order) in show"
          :key="order"
          
        >
          <div
            v-if="item.questionType !='30'"
            style="font-size: 16px;line-height: 30px;color: #000000;"
          >{{show[order]}}、{{ item[showItem[order]] }}</div>
          <div
            v-else
            style="font-size: 16px;line-height: 30px;color: #000000;"
          >{{ showItem[order] }}</div>
        </van-checkbox>
      </van-checkbox-group>
        <slot name="footer" :item="item"></slot>
    </div>

    <!-- <van-divider
        :style="{color: '#1989fa', borderColor: '#1989fa', padding: '0 16px',margin: '8px 0 2px 0'}"
    />-->
  </div>
</template>

<script>
import Vue from "vue";
import { Checkbox, CheckboxGroup } from "vant";
Vue.use(Checkbox).use(CheckboxGroup);
import WsTag from "@/components/common/WsTag";
export default {
  data() {
    return {
      show: ["A", "B", "C", "D", "E", "F", "true", "false"], //单选、多选
      showItem: [
        "itema",
        "itemb",
        "itemc",
        "itemd",
        "iteme",
        "itemf",
        "正确",
        "错误"
      ] //单选、多选
    };
  },
  props: {
    items: { type: Array, required: true },
    result: "",
    showId: { type: Number, default: 1 },
    showAll: { type: Boolean, default: false },
    item:{}
  },
  components: {
    WsTag
  },
  methods: {
    handleChange(evt) {
      this.$emit("click", evt); // 将当前对象 evt 传递到父组件
    },
    getMax(questionType) {
      switch (questionType) {
        case "20": {
          return 8;
          break;
        }
        default: {
          return 1;
          break;
        }
      }
    },
    getId(id, choice) {
      return id + "*" + choice;
    },
    getShape(questionType) {
      if (questionType == "20") {
        return "square";
      } else {
        return "round";
      }
    },
    getQuestionType(questionType) {
      if (questionType == "30") {
        return "判 断";
      }
      if (questionType == "20") {
        return "多 选";
      }
      if (questionType == "10") {
        return "单 选";
      }
    },
    getShow(item, questionType, order) {
      if (questionType == "30") {
        //判断根据下标
        if (order > 5) {
          return true;
        } else {
          return false;
        }
      } else {
        if (item) {
          //非判断类型，根据选项
          return true;
        } else {
          return false;
        }
      }
    },
    getShowId(index) {
      if (this.showAll) {
        return true;
      } else {
        if (this.showId == index + 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  created() {}
};
</script>

<style scoped >
.div-exam {
  margin: 0;
  padding: 6px 4px 6px 4px;
  /* min-height: 249px;
  height: auto !important;
  height: 249px; */
  line-height: 30px;
  background: #fff;
   border-bottom: 1px solid #ebedf0;
}
.div-title {
  padding-bottom: 0px;
  line-height: 30px;
  background: #fff;
}
</style>