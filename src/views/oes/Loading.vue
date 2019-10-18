<template>
  <div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import {post} from '@/axios/api';
Vue.use(Toast);
export default {
  data() {
    return {
    }
  },
  components: {},
  computed: {},
  methods: {
   
  },
  created(){
    post("api/exam/queryDto",{
    }, "用户信息验证中").then(result =>{
      if(result.success){
        this.$store.commit('setAuthorization',result.msg); 
        this.$store.commit('setOrmToken',result.ormToken); 
        this.$router.replace('/examList');
      }else{
        Toast.fail(result.msg);
      }
       
    })
  }
}
</script>
<style  scoped>
</style>