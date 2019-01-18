<!--详情页-->
<template>
  <div class="particulars">
    <div class="mainPage">
      <img src="../images/return.png" alt="" class="particularsGo" @click="particularsGo">
      商品详情
    </div>
    <div class="particularsImg">
      <mt-swipe :auto="3000">
        <mt-swipe-item style="width: 100%;height: 100%" v-for="(item,index) in particularsImg" :key="index">
          <img :src="item" alt="" style="width: 100%;height: 100%">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="particularsPrice">
      <div>
        <span class="priceNew">¥{{particularsList.realPrice}}</span>
        <span class="priceOld">
          <s>¥{{particularsList.marketPrice}}</s>
        </span>
      </div>
      <div>
        {{particularsList.name}}
      </div>
      <div>
        {{particularsList.fullDescription}}
      </div>
    </div>
    <div class="activity" v-if="particularsList.festival">
      <span>活动</span>
      <span class="activeDays">{{particularsList.festival.name}}</span>
    </div>
    <!--商品参数-->
    <div class="parameter">
      <div class="particularsParameter">
        商品参数
      </div>
      <div class="particularsList" ref="nums">
        <div class="particularsLeft">
          <ul ref="liOne">
            <li v-for="item in particularsList.productParamList">{{item.name}}</li>
            <!--<li>原装配件</li>-->
            <!--<li>声道</li>-->
            <!--<li>连接方式</li>-->
            <!--<li>有无显示屏</li>-->
            <!--<li>是否防水</li>-->
            <!--<li>售后服务</li>-->
            <!--<li>产地</li>-->
            <!--<li>备注</li>-->
            <!--<li>编号</li>-->
          </ul>
        </div>
        <div class="particularsRight">
          <ul>
            <li v-for="item in particularsList.productParamList">{{item.description}}</li>
            <!--<li>小米原装</li>-->
            <!--<li>2.0声道</li>-->
            <!--<li>Wi-Fi连接，蓝牙连接</li>-->
            <!--<li>无</li>-->
            <!--<li>否</li>-->
            <!--<li>全国联保</li>-->
            <!--<li>中国</li>-->
            <!--<li>官方标配</li>-->
            <!--<li>XM-18556</li>-->
          </ul>
        </div>
      </div>
      <!--收起-->
      <div class="packUp" @click="packUpImg">
        <img src="../images/收起.png" alt="" class="packUpImg" v-if="showImg">
        <img src="../images/展开.png" alt="" class="packUpImg" v-else>
        <span ref="packUPmessage">展开</span>
      </div>
    </div>

    <!--图文详情-->
    <div class="particularsPriceList">
      图文详情
    </div>
    <div class="particularsLast">
      <!--<img :src="item" alt="" v-for="item in particularsLast">-->
      <!--<img src="../images/图文详情1.png" alt="">-->
      <!--<img src="../images/图文详情2.png" alt="">-->
      <!--<img src="../images/图文详情3.png" alt="">-->
      <p v-html="particularsList.detailDesc"></p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "particulars",
      data(){
          return{
            a:'',
            b:'',
            flag:true,
            showImg:true,
            particularsList:'',
            //商品详情轮播
            particularsImg:[],
            //图文详情
            particularsLast:[],
            festival:'',
          }
      },
      created(){
          var id = this.$route.query.id
          this.$http.get('/showapi/product/getProductDetail?productId='+id)
            .then((res)=>{
              // console.log(res)
              if (res.data.code == 0){
                this.particularsList = res.data.data
                // // console.log(this.particularsList.festival.name)
                // if(this.particularsList.festival == ''){
                //   console.log(this.festival)
                // } else {
                //   this.festival = this.particularsList.festival.name
                // }
                this.particularsList.productBannerList.forEach((item)=>{
                    this.particularsImg.push(item.picPath)
                    // console.log(this.particularsImg)
                })
              }
            })
            .catch((err)=>{
              console.error(err)
            })
      },
      methods:{
        packUpImg(){
          if (this.flag){
            this.showImg = true
            let _this = this
            let lineOneHeight = this.$refs.liOne.offsetHeight

            var timer =  setInterval(function () {

              this.a = _this.$refs.nums.offsetHeight
              sessionStorage.setItem('Nums',this.a)
              this.a += lineOneHeight - _this.$refs.nums.offsetHeight
              if (this.a == lineOneHeight){
                clearInterval(timer)
                _this.$refs.nums.style.height = this.a + 'px'
                _this.$refs.packUPmessage.innerHTML = '收起'
              }
            },10)
          } else {
            this.showImg = false
            let _this = this
            var timer1 =  setInterval(function () {

              this.a = _this.$refs.nums.offsetHeight
              this.a -= _this.$refs.nums.offsetHeight - sessionStorage.getItem('Nums')
              if (this.a == sessionStorage.getItem('Nums')){
                clearInterval(timer1)
                _this.$refs.packUPmessage.innerHTML = '展开'
                _this.$refs.nums.style.height = this.a + 'px'

              }
            },10)
          }
          this.flag = !this.flag
        },
        particularsGo(){
          this.$router.go(-1);
        }
      },
    }
</script>

<style lang="less" type="text/less">
  .particulars{
    width: 100%;
    background:#F1F1F1;
    .mainPage{
      width: 100%;
      height: 90px;
      background:#595CA1;
      text-align: center;
      line-height: 90px;
      color: white;
      font-size: 36px;
      position: relative;
      .particularsGo{
        position: absolute;
        left: 26px;
        top: 30px;
        width: 20px;
        height: 36px;
      }
    }
    .particularsImg{
      width: 100%;
      height: 420px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .particularsPrice{
      width: 100%;
      box-sizing: border-box;
      /*height: 160px;*/
      padding: 20px 0 16px 30px;
      background: #ffffff;
      margin-bottom: 10px;
      div:nth-of-type(1){
        .priceNew{
          color: #595CA1;
          opacity: 1;
          font-size: 32px;
          font-family: PingFang-SC-Regular;
        }
        .priceOld{
          color: #999999;
          opacity: 1;
          font-size: 20px;
          font-family: PingFang-SC-Regular;
        }
      }
      div:nth-of-type(2){
        margin-top: 26px;
        color:#333333;
        font-size: 28px;
        font-family: PingFang-SC-Regular;
      }
      div:nth-of-type(3){
        margin-top: 26px;
        color:#999999;
        font-size: 24px;
        font-family: PingFang-SC-Regular;
      }
    }
    .activity{
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 20px 0 20px 30px;
      width: 100%;
      background: #ffffff;
      span:nth-of-type(1){
        font-size: 24px;
        font-family: PingFang-SC-Regular;
        color:#999999;
        margin-right: 46px;
      }
      .activeDays{
        color:#999999;
        display: inline-block;
        /*width: 100px;*/
        line-height: 40px;
        height: 40px;
        background: #F2F2F2;
        border-radius: 8px;
        font-size: 20px;
        margin-right: 5px;
        font-family: PingFang-SC-Regular;
        color:#999999;
        text-align: center;
        padding: 5px;
      }
    }
    .parameter{
      width: 100%;
      background: #ffffff;
      .particularsParameter{
        width: 100%;
        padding: 28px 0 30px 32px;
        text-align: left;
        box-sizing: border-box;
        font-size: 28px;
        font-family: PingFang-SC-Regular;
        color:#333333;
      }
      .particularsList{
        display: flex;
        padding-left: 32px;
        overflow: hidden;
        height: 150px;
        .particularsLeft{
          margin-right: 30px;
          ul li{
            margin-bottom: 20px;
            font-family:PingFang-SC-Regular;
            font-size: 24px;
            color: #999999;
          }
        }
        .particularsRight{
          margin-right: 10px;
          ul li{
            margin-bottom: 20px;
            font-family:PingFang-SC-Regular;
            font-size: 24px;
            color: #333333;
          }
        }
      }
      .packUp{
        text-align: right;
        padding-right: 70px;
        position: relative;
        padding-bottom: 20px;
        font-size: 22px;
        font-family: PingFang-SC-Regular;
        color:#999999;
        .packUpImg{
          position: absolute;
          top: 10px;
          right: 20px;
          width: 24px;
          height: 14px;
        }
      }
    }
    .particularsPriceList{
      box-sizing: border-box;
      padding: 28px 0 28px 32px;
      background: #ffffff;
      font-size: 26px;
      color:#333333;
      margin-top: 10px;
    }
    .particularsLast{
      width: 100%;
      /*img{*/
        /*width: 100%;*/
        /*height: 1003px;*/
      /*}*/
      padding-left: 10px;
      padding-right: 20px;
      background: white;
      box-sizing: border-box;
      p{
        width: 100%;
          img{
            width: 100%;
          }
      }
    }
  }
</style>
