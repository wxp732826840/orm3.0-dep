<template>
  <div class="page">
    <div class="ws-tag-detail">
      <slot name="header"></slot>
      <van-tag  :type="type" :mark="mark" :round="round" :plain="plain" class="ws-tag-detail-tag">{{title}}</van-tag>
      <span class="ws-tag-detail-span">{{content}}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag } from "vant";
Vue.use(Tag);
export default {
  data() {
    return {};
  },
  props: {
    title: { type: String },
    content: { type: String },
    type: { type: String, default: "primary" },
    plain: {
      type: Boolean,
      isValid: function(value) {
        return plain;
      }
    },
    mark: Boolean,
    plain:Boolean,
    round:Boolean
  },
  components: {},
  created() {}
};
</script>

<style scoped >
.ws-tag-detail {
  background: #fff;
  font-size: 16px;
  line-height: 30px;
}
.ws-tag-detail-tag {
  vertical-align: middle;
  margin: -4px 0px 0 0px;
}
.ws-tag-detail-span {
  margin-left: 6px;
}
</style>