<template>
  <div class="mainPage">
    <img src="../images/123.png" alt="" class="particularsGo" @click="particularsGo">
    <input type="text" class="input">
    <img src="../images/456.png" alt="" class="searchImg">
    <span class="search" @click="classifyDetail">搜索</span>
  </div>
</template>

<script>
    export default {
        name: "productSearch",
        data(){
          return{}
        },
        methods:{
          particularsGo(){
            this.$router.go(-1)
          },
          classifyDetail(){
            this.$router.push({
              path:"/classifyDetail"
            })
          }
        }
    }
</script>

<style scoped type="text/less" lang="less">
  .mainPage{
    width: 100%;
    height: 90px;
    text-align: center;
    line-height: 90px;
    color: white;
    font-size: 36px;
    position: relative;
    background: #ffffff;
    .particularsGo{
      position: absolute;
      left: 26px;
      top: 30px;
      width: 20px;
      height: 36px;
    }
    .input{
      width: 600px;
      height: 60px;
      background: #F1F1F1;
      outline: none;
      border: 0;
      border-radius: 8px;
      position: relative;
      text-indent: 3em;
    }
    .searchImg{
      position: absolute;
      top: 32px;
      left: 100px;
      width: 30px;
      height: 30px;
    }
    .search{
      position: absolute;
      right: 5px;
      top: 0;
      font-size:26px;
      font-family:PingFang-SC-Regular;
      color:rgba(51,51,51,1);
    }
  }
</style>
