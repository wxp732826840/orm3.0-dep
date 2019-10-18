import axios from "axios";
import qs from "qs";
import { Toast } from 'vant';
import store from '@/store/index';
const BASE_URL ="https://mock.yonyoucloud.com/mock/1984"
//const BASE_URL ="http://83.1.1.190:8080/orm"
//const BASE_URL ="http://www.iccm.hfbankuat"
//const BASE_URL ="http://10.80.32.58:8080"
//const BASE_URL ="/"

const service = axios.create({
    baseURL: BASE_URL,  // api的base_url
    timeout: 50000  // 请求超时时间
});


/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: config.message?config.message:'加载中...'
    });
 
    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers.Authorization = store.state.Authorization;
    config.headers.ormToken = store.state.ormToken;
    //config.headers.token="111111111111111111111111"
    return config;
}, error => {  //请求错误处理
    Toast.fail(error);
    Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        Toast.clear();
        //这里根据后端提供的数据进行对应的处理
        if (response.status === 200) {
            return response.data;
        } else {
            Toast.fail(""+response.data.msg); //常规错误处         
        }
    },
    error => {  //响应错误处理
        Toast.fail(""+error); 
        return Promise.reject(error)
    }
);

export default service;