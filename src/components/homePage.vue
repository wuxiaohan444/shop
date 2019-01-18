<template>
  <div class="homePage">
    <!--首页-->
    <div class="mainPage">
      添米网
    </div>
    <!--轮播图-->
    <div class="swiperTop">
      <mt-swipe :auto="3000">
        <mt-swipe-item style="width: 100%;height: 100%" v-for="(item,index) in adList" :key="index">
          <img :src="item.picPath" alt="" style="width: 100%;height: 100%">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="recommendation">
      <!--今日推荐-->
      今日推荐
    </div>
    <div class="recommendationShop">

        <div class="recommendationShopList" v-for="item in recommendList">
          <!--/particulars-->
          <router-link :to="{path:'/particulars',query:{id:item.id}}">
          <div>
            <img :src="item.picPath" alt="">
          </div>
          <div>
            <span class="priceNew">¥{{item.realPrice}}</span>
            <span class="priceOld"><s>¥{{item.marketPrice}}</s></span>
          </div>
          <div>
            {{item.name}}
          </div>
          </router-link>
        </div>

    </div>
    <!--热销产品-->
    <div class="hotProducts">
      热销产品
    </div>
    <!--热销产品列表-->
    <div class="hotProductsShop">

      <div v-for="item in sellList">
        <router-link :to="{path:'/particulars',query:{id:item.id}}" tag="div" class="hotProductsList">
          <div class="hotProductsShopImg">
              <img :src="item.picPath" alt="">
          </div>
          <div class="hotProductsShopImgText">
            <div>
              {{item.name}}
            </div>
            <div>
              <button class="btn">¥{{item.marketPrice}}</button>
            </div>
          </div>
        </router-link>
      </div>

    </div>
    <div class="action" @click="action">
      <img src='./images/分类icon.png' alt="">
    </div>
  </div>
</template>

<script>
  // import Swiper from 'swiper';
  // import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {

  name: 'homePage',
  data () {
    return {
      adList:'',//首页轮播图数据
      recommendList:'',//今日推荐产品数据
      sellList:'',//热销产品
      autoPlay:true,
      showIndicator:true,
    }
  },
  components : {

  },
  methods:{
    action(){
      this.$router.push('/ShopSearch')
    }
  },
  mounted(){
    let _this = this
    this.$nextTick(()=>{
      //this.mySwiper()
    })
  },
  created(){
    let _this = this
    this.$http.get('/showapi/index/getIndex').then((res)=>{
      // console.log(res)
      if(res.data.code == 0){
        this.adList = res.data.data.adList;
        this.recommendList = res.data.data.recommendList;
        console.log(this.recommendList)
        this.sellList = res.data.data.sellList;
      }
    }).catch((err)=>{
      console.error(err)
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/less" lang="less">
.homePage{
  width: 100%;
  /*height: 100%;*/
  background:#F1F1F1;
  .mainPage{
    width: 100%;
    height: 90px;
    background:#595CA1;
    text-align: center;
    line-height: 90px;
    color: white;
    font-size: 36px;
  }
  .swiperTop{
    width: 100%;
    height: 340px;

  }
  .recommendation{
    width: 100%;
    height: 90px;
    background: #ffffff;
    padding-left: 10px;
    line-height: 90px;
    color: black;
    font-size: 32px;
    box-sizing: border-box;
    font-family: PingFang-SC-Regular;
  }
  .recommendationShop{
    width: 100%;
    height: 364px;
    padding: 10px;
    display: flex;
    box-sizing: border-box;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .recommendationShopList{
      width: 256px;
      height: 344px;
      background: #ffffff;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 22px;
      margin-right: 10px;
      div:nth-of-type(1){
        img{
          width: 214px;
          height: 170px;
        }
      }
      div:nth-of-type(2){
        .priceNew{
          color: #595CA1;
          opacity: 1;
          font-size: 30px;
          font-family: PingFang-SC-Regular;
        }
        .priceOld{
          color: #999999;
          opacity: 1;
          font-size: 20px;
          font-family: PingFang-SC-Regular;
        }
      }
      div:nth-of-type(3){
        color: #333333;
        opacity: 1;
        font-size: 26px;
        width: 214px;
        height: 70px;
        margin-top: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .hotProducts{
    width: 100%;
    height: 90px;
    background: #ffffff;
    text-align: center;
    line-height: 90px;
    color: black;
    font-size: 32px;
    margin-bottom: 10px;
    font-family: PingFang-SC-Regular;
  }
  .hotProductsShop{
    width: 100%;
    .hotProductsList{
      width: 100%;
      height: 242px;
      padding: 22px 0 20px 50px;
      display: flex;
      box-sizing: border-box;
      background: #ffffff;
      margin-bottom: 10px;
      .hotProductsShopImg{
        margin-right: 20px;
        img{
          width: 240px;
          height: 200px;
        }
      }
      .hotProductsShopImgText{
        width: 354px;
        height: 70px;
        font-size: 26px;
        font-family: PingFang-SC-Regular;
        div:nth-of-type(1){
          margin-top: 20px;
          margin-bottom: 58px;
          /*height: 34px;*/
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;

        }
        div:nth-of-type(2){
          text-align: left;
          .btn{
            width: 152px;
            height: 52px;
            border-radius: 25px;
            background: #595CA1;
            outline: none;
            border: none;
            text-align: center;
            line-height: 52px;
            color: white;
            font-size: 26px;
            font-family: PingFang-SC-Regular;
          }
        }
      }
    }
  }
  .action{
    position: fixed;
    bottom: 100px;
    left: 70px;
    img{
      width: 80px;
      height: 80px;
    }
  }
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
