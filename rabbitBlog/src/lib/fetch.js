import axios from 'axios';
// import { Loading } from 'element-ui';
// import { Message } from 'element-ui';

let config = {
  // baseUrl: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
  header: {
    "content-type": "application/json"
  }
};
// let loader = null;
// let requestNum = 0;
const service = axios.create(config);

service.interceptors.request.use(
  request => {
    // requestNum++;
    // loader = Loading.service({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 0.7)"
    // });
    return request;
  },
  err => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    // requestNum--;
    // if(requestNum == 0) {
    //   loader.close();
    // }
    // if(response.data.code == 500) {
    //   Message.error(response.data.data.msg);
    // } else if(response.data.data.code == 401) {
    //   Message.error(response.data.data.msg);
    // }
    return response.data;
  },
  err => {
    // requestNum--;
    // if(requestNum == 0) {
    //   loader.close();
    // }
    return Promise.reject(err);
  }
)

export default service