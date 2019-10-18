<template>
  <div>
      <div class="content">
        <p>三合一系统将对每个用户的合规在线考试情况计算相应的合规积分，总行法律合规部将定期以总行一级部门、一级分行为单位进行人均积分统算。</p>
		<p>1.积分规则</p>
		<span>考试内容以我行现行有效的各项规章制度为出题依据。各岗位人员可任意选取一项考试科目进行考试。</span><br>
        <span>考试时间共计5分钟，试卷包括3道单选题、3道多选题，4道判断题，每次答题满分为100分。</span><br>
        <span>成绩低于90分不积分，达到90分可积5分。每人每科目考试最多5次有效积分。</span>
		<p>2.考场纪律</p>
		<span>我行员工应当认真学习制度规定，通过在线考试模块掌握制度规定重点，熟悉我行业务操作规范。</span><br>
		<span>进入考试后，请注意屏幕左上方倒计时。请于考试倒计时结束前提交试卷。考试系统默认考试必须作答完毕方可交卷，倒计时结束后系统自动交卷，如在考试中关闭考试页面本次考试积分为零。</span><br>
		<span>参加考试人员应独立答题，考试中不可替代他人考试，不得弄虚作假。如发现立即清零所在机构的积分。</span>
      </div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  components: {},
  computed: {},
  methods: {},
}
</script>
<style  scoped>
    .content{
        height: 285px;
        overflow-y: auto;
         background: #f8f8f8;
    }
    p,span{text-indent:2em}
    span{display:block}
</style>