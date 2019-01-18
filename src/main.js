// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'swiper/dist/css/swiper.css'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios;
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false
// Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)

var domain = "http://192.168.2.170:8081"; //api域名
var baseParams = { //基础参数
  token: "",
  userid: 0
  //......
};
Vue.prototype.dataGet = function(apiName, params, callback){
  var url = domain + apiName;
  var obj = initFn(params, callback, arguments[1]); //init方法实现见后
  var nparams = obj.nparams;
  callback = obj.callback;

  axios.get(url, {params: nparams}).then((response) => {
    var all = response.data; //返回所有数据
    var data = response.data.data; //根据后端实际返回修改

    //根据后端实际返回修改
    if(all.state==1){ //成功
      if(callback) callback(data, all);
    }else{ //失败
      console.log(all.state, all.message);
    }

  }).catch((error)=>{
    console.log(error);
  });
}

Vue.prototype.dataGet = function(apiName, params, callback){
  var url = domain + apiName;
  var obj = initFn(params, callback, arguments[1]);
  var nparams = obj.nparams;
  callback = obj.callback;

  axios.post(url, nparams).then((response) => {
    var all = response.data;
    var data = response.data.data; //根据后端实际返回修改

    //根据后端实际返回修改
    if(all.state==1){ //成功
      if(callback) callback(data, all);
    }else{ //失败
      console.log(all.state, all.message);
    }

  }).catch((error)=>{
    console.log(error);
  });
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
