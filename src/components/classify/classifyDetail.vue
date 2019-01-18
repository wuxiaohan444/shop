<!--分类进入分类详情-->
<template>
  <div class="classifyDetail">
    <div class="mainPage">
      <img src="../images/123.png" alt="" class="particularsGo" @click="particularsGo">
      <input type="text" class="input" v-model="searchText">
      <img src="../images/456.png" alt="" class="searchImg" @click="searchList">
    </div>
    <div class="classifyDetailList">
      <div class="advertiding" @click="advertiding">
        <span :class="{advertidingAll:colorText}">分类</span>
        <span>
          <img src="../images/展开.png" alt="" v-if="shopMasking">
          <img src="../images/收起.png" alt="" v-else>
        </span>
      </div>
      <div class="price" @click="shopPrice">
        <span :class="{advertidingAll:colorTextPrice}">价格</span>
        <span>
          <img src="../images/展开.png" alt="" v-if="shopMaskingPrice">
          <img src="../images/收起.png" alt="" v-else>
        </span>
      </div>
      <div class="festival" @click="festival">
        <span :class="{advertidingAll:colorTextFestival}">节庆</span>
        <span>
          <img src="../images/展开.png" alt="" v-if="shopMaskingFestival">
          <img src="../images/收起.png" alt="" v-else>
        </span>
      </div>
    </div>


    <!-- 分类 -->
    <div class="shopListCokeText" ref="shopListCokeText">
      <div ref="shopListOne" v-for="(item,index) in arr" @click="shopClassify(index)">{{item.name}}</div>
    </div>


    <!-- 价格 -->
    <div class="shopListPrice" ref="shopListPriceAll">
      <div class="priceList">
        <div class="shopListPriceLeft">
          价格区间
        </div>
        <div class="shopListPriceRight">
          <div ref="shopListOnePrice"  v-for="(itemPrice,index) in arrPrice" :data-startPrice="itemPrice.startPrice" :data-endPrice="itemPrice.endPrice" @click="shopListPrice(index,$event)">{{itemPrice.text}}</div>
        </div>
      </div>
      <!-- 价格筛选 -->
      <div class="filter" ref="filter">
        <div>
          价格筛选
        </div>
        <div>
          <input type="text" v-model="filterStartPrice"> - <input type="text" v-model="filterEndPrice">
        </div>
        <div>
          <button @click="BtnFilter">确定</button>
        </div>
      </div>

    </div>

    <!-- 节庆 -->
    <div class="shopFestival" ref="shopFestival">
      <div v-for="(item,index) in shopList" ref="shopFestivalOne" @click="shopFestivalSearch(index)">{{item.name}}</div>
    </div>


    <div class="shopList" ref="shopListHeight">
      <div class="shopListOne" v-for="item in shopListOne">
      <router-link :to="{path:'/particulars',query:{id:item.id}}">
        <div class="shopListOneImg">
          <img :src="item.picPath" alt="">
        </div>
        <div class="shopListText">
          <span class="priceNew">¥{{item.realPrice}}</span>
          <span class="priceOld"><s>¥{{item.marketPrice}}</s></span>
        </div>
        <div class="shopListTitle">
          {{item.fullDescription}}
        </div>
      </router-link>
      </div>

    </div>
    <!--蒙版-->
    <div class="shopListCoke" ref="shopMasking" @click="shopMaskingAll"> </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui';
    export default {
        name: "classifyDetail",
      data(){
          return{
            flag:true,
            flag1:true,
            flag2:true,
            shopMasking:true,
            colorText:false,
            arr:'',
            // nodata:false,
            // showdata:true,
            arrPrice:[
              {
                'text':'0~50',
                'startPrice':'0',
                'endPrice':'50'
              },
              {
                'text':'50~100',
                'startPrice':'50',
                'endPrice':'100'
              },
              {
                'text':'100~500',
                'startPrice':'100',
                'endPrice':'500'
              },
              {
                'text':'500~1000',
                'startPrice':'500',
                'endPrice':'1000'
              },
              {
                'text':'1000~3000',
                'startPrice':'1000',
                'endPrice':'3000'
              },
              {
                'text':'3000以上',
                'startPrice':'3000',
                'endPrice':''
              }
            ],
            shopMaskingPrice:true,
            colorTextPrice:false,

            //节庆文字
            shopMaskingFestival:true,
            colorTextFestival:false,
            //节庆
            shopList:'',
            //搜索关键字
            searchText:'',
            //搜索关键字获取的信息
            shopListOne:'',

            //记录分类的id
            shopClassifyId:'',

            //记录筛选
            filterStartPrice:'',
            filterEndPrice:"",

            //记录价格
            startPrice:'',
            endPrice:'',


            //记录节庆
            festivalId:'',
          }
      },
      created(){
        let productTypeId = this.$route.query.productTypeId
        let festivalListId = this.$route.query.festivalListId
        let startprice = this.$route.query.startprice
        let endprice   = this.$route.query.endprice;
        let flag1 = this.$route.query.flag1;

        let indexOne = this.$route.query.index
        let IndexId = this.$route.query.IndexId
        let flag  = this.$route.query.flag
        // console.log(IndexId,flag)
        // console.log(indexOne)

        if(flag1){
          this.$http.get('/showapi/product/getProductList?productTypeId=' + productTypeId +'&lowPrice=' + startprice + '&highPrice='+ endprice +'&festivalId='+ festivalListId +'')
            .then((res)=>{

              this.shopListOne = res.data.rows
            })
            .catch((err)=>{
              console.error(err)
            })
        }


        //获取下拉分类列表
        this.$http.get('/showapi/productType/getProductTypeOnList')
          .then((res)=>{
            // console.log(res)
            if (res.data.code == 0){
              this.arr = res.data.data.productTypeFirstList
              this.shopList = res.data.data.festivalList
            }
          })
          .catch((err)=>{
            console.error(err)
          })

        ///价格区间和节庆商品 点击全部
        if(indexOne == 1){
          this.$http.get('/showapi/product/getProductList')
            .then((res)=>{
              // console.log(res)
              this.shopListOne = res.data.rows
              // console.log(this.shopListOne)
            })
            .catch((err)=>{
              console.error(err)
            })
        } else if(indexOne == 2){
          // alert(12)
          this.$http.get('/showapi/product/getProductList')
            .then((res)=>{
              this.shopListOne = res.data.rows
              // console.log(this.shopListOne)
            })
            .catch((err)=>{
              console.error(err)
            })
        }

        //除了价格区间和节庆商品外 点击全部
        if(IndexId != undefined && flag == true){

          this.$http.get('/showapi/product/getProductList?productTypeId='+IndexId)
            .then((res)=>{
              this.shopListOne = res.data.rows
            })
            .catch((err)=>{
              console.error(err)
            })
        }


      },
      methods:{
        //  点击蒙版消失
        shopMaskingAll(){
          this.$refs.shopListCokeText.style.height = 0;
          this.$refs.shopListPriceAll.style.height = 0;
          this.$refs.shopFestival.style.height = 0;
          this.$refs.shopMasking.style.display = 'none';
          this.$refs.shopListCokeText.style.paddingTop = 0 + 'px';
          this.$refs.shopListPriceAll.style.paddingTop = 0 + 'px';
          this.$refs.shopFestival.style.paddingTop = 0 + 'px';
          this.shopMasking = true;
          this.colorText = false;
          this.shopMaskingPrice = true;
          this.colorTextPrice = false;
          this.shopMaskingFestival = true;
          this.colorTextFestival = false;
          this.flag = true;
          this.flag1 = true;
          this.flag2 = true;
          this.$refs.shopListHeight.style.overflow = 'scroll'
        },
        particularsGo(){
          this.$router.push({
            path:'/ShopSearch'
          })
        },
        shopStyle(index){
          // console.log(index)
          this.changeRed = index
          // console.log(this.changeRed)
        },
        //分类商品
        advertiding(){
          this.festivalId = ''
          this.startPrice = ''
          this.endPrice = ''
          this.filterStartPrice = ''
          this.filterEndPrice = ''
          if(this.$refs.shopListOne == undefined){
            Toast({
              message: '无任何数据',
              position: 'middle',
              duration: 2000
            });
          } else {

            let shopListOne = '';
            this.$refs.shopMasking.style.display = 'block';//蒙版显示于隐藏
            this.$refs.shopListHeight.style.overflow = 'hidden';
            // console.log(this.$refs.shopListOne.length)
            if (this.$refs.shopListOne.length <= 4){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 1;

            } else if (this.$refs.shopListOne.length <= 8){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 2;

            } else if (this.$refs.shopListOne.length <= 12){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 3;

            } else if (this.$refs.shopListOne.length <= 16){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 4;

            } else if (this.$refs.shopListOne.length <= 18){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 5;

            } else if (this.$refs.shopListOne.length <= 22){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 7;

            }else if (this.$refs.shopListOne.length <= 26){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 8;

            }else if (this.$refs.shopListOne.length <= 30){

              shopListOne = (this.$refs.shopListOne[0].offsetHeight + 10) * 9;
            }

            let shopListCokeText = this.$refs.shopListCokeText.offsetHeight; //默认等于0

            let _this = this;
            if(this.flag){
              this.shopMasking = false;
              this.colorText = true;
              this.shopMaskingPrice = true;
              this.colorTextPrice = false;
              this.shopMaskingFestival = true;
              this.colorTextFestival = false;
              var timer1 = setInterval(function () {

                if (shopListCokeText != shopListOne){

                  shopListCokeText += 1;
                  _this.$refs.shopListPriceAll.style.height = 0;
                  _this.$refs.shopFestival.style.height = 0;
                  _this.flag1 = true;
                  _this.flag2 = true;
                  _this.$refs.shopListCokeText.style.height = shopListCokeText + 'px';
                  _this.$refs.shopListCokeText.style.paddingTop = 10 + 'px';
                } else {

                  clearInterval(timer1)

                }
              },1)
            } else {
              this.shopMasking = true;
              this.colorText = false;
              this.$refs.shopMasking.style.display = 'none';
              this.$refs.shopListHeight.style.overflow = 'scroll'
              var timer = setInterval(function () {

                if (shopListCokeText != 0){

                  shopListCokeText -= 1;

                  _this.$refs.shopListCokeText.style.height = shopListCokeText + 'px';
                  _this.$refs.shopListCokeText.style.paddingTop = 0 + 'px';
                } else {

                  clearInterval(timer)

                }
              },1)
            }
            this.flag = !this.flag
          }

        },
        //价格区间
        shopPrice(){

          let shopListOne = '';
          this.$refs.shopMasking.style.display = 'block';//蒙版显示于隐藏
          this.$refs.shopListHeight.style.overflow = 'hidden'

          if (this.$refs.shopListOnePrice.length <= 4){

            shopListOne = (this.$refs.shopListOnePrice[0].offsetHeight + 15) * 1;

          } else if (this.$refs.shopListOnePrice.length <= 8){

            shopListOne = (this.$refs.shopListOnePrice[0].offsetHeight + 15) * 2;

          } else if (8 < this.$refs.shopListOnePrice.length <= 12){

            shopListOne = (this.$refs.shopListOnePrice[0].offsetHeight + 15) * 3;

          }else if (this.$refs.shopListOnePrice.length <= 16){

            shopListOne = (this.$refs.shopListOnePrice[0].offsetHeight + 15) * 4;

          }else if (this.$refs.shopListOnePrice.length <= 20){

            shopListOne = (this.$refs.shopListOnePrice[0].offsetHeight + 15) * 5;
          }

          let shopListCokeText = this.$refs.shopListPriceAll.offsetHeight; //默认等于0

          let filterNum = this.$refs.filter.offsetHeight;

          let _this = this;
          if(this.flag1){
            this.shopMasking = true;
            this.colorText = false;
            this.shopMaskingPrice = false;
            this.colorTextPrice = true;
            this.shopMaskingFestival = true;
            this.colorTextFestival = false;
            var timer1 = setInterval(function () {

              if (shopListCokeText != shopListOne + filterNum){

                shopListCokeText += 1;
                _this.shopMasking = true;
                _this.colorText = false;
                _this.$refs.shopListCokeText.style.height = 0;
                _this.$refs.shopFestival.style.height = 0;
                _this.$refs.shopListPriceAll.style.height = shopListCokeText + 'px';
                _this.flag = true;
                _this.flag2 = true;
                _this.$refs.shopListPriceAll.style.paddingTop = 10 + 'px';
              } else {

                clearInterval(timer1)

              }
            },1)

          } else {

            this.$refs.shopMasking.style.display = 'none';
            this.$refs.shopListHeight.style.overflow = 'scroll'
            this.shopMaskingPrice = true;
            this.colorTextPrice = false;
            var timer = setInterval(function () {

              if (shopListCokeText != 0){

                shopListCokeText -= 1;

                _this.$refs.shopListPriceAll.style.height = shopListCokeText + 'px';
                _this.$refs.shopListPriceAll.style.paddingTop = 0 + 'px';

              } else {

                clearInterval(timer)

              }
            },1)
          }
          this.flag1 = !this.flag1
        },
        //节庆
        festival(){
          if (this.$refs.shopFestivalOne == undefined){
            Toast({
              message: '无任何数据',
              position: 'middle',
              duration: 2000
            });
          } else {

            let shopListOne = '';
            this.$refs.shopMasking.style.display = 'block';//蒙版显示于隐藏
            this.$refs.shopListHeight.style.overflow = 'hidden'
            if (this.$refs.shopFestivalOne.length <= 4){

              shopListOne = (this.$refs.shopFestivalOne[0].offsetHeight + 10) * 1;

            } else if (this.$refs.shopFestivalOne.length <= 8){

              shopListOne = (this.$refs.shopFestivalOne[0].offsetHeight + 10) * 2;
            } else if (8 < this.$refs.shopFestivalOne.length <= 12){

              shopListOne = (this.$refs.shopFestivalOne[0].offsetHeight + 10) * 3;

            }else if (this.$refs.shopFestivalOne.length <= 16){

              shopListOne = (this.$refs.shopFestivalOne[0].offsetHeight + 10) * 4;

            }else if (this.$refs.shopFestivalOne.length <= 20){

              shopListOne = (this.$refs.shopFestivalOne[0].offsetHeight + 10) * 5;
            }

            let shopListCokeText = this.$refs.shopFestival.offsetHeight; //默认等于0

            let _this = this;
            if(this.flag2){
              this.shopMasking = true;
              this.colorText = false;
              this.shopMaskingPrice = true;
              this.colorTextPrice = false;
              this.shopMaskingFestival = false;
              this.colorTextFestival = true;
              var timer1 = setInterval(function () {

                if (shopListCokeText != shopListOne){

                  shopListCokeText += 1;
                  _this.$refs.shopListCokeText.style.height = 0;
                  _this.$refs.shopListPriceAll.style.height = 0;
                  _this.$refs.shopFestival.style.height = shopListCokeText + 'px';
                  _this.flag = true;
                  _this.flag1s = true;
                  _this.$refs.shopFestival.style.paddingTop = 10 + 'px';

                } else {

                  clearInterval(timer1)

                }
              },1)
            } else {
                this.shopMaskingFestival = true;//控制蒙版显示与隐藏
                this.colorTextFestival = false//控制文字颜色变化
              this.$refs.shopMasking.style.display = 'none';
              this.$refs.shopListHeight.style.overflow = 'scroll'
              var timer = setInterval(function () {

                if (shopListCokeText != 0){

                  shopListCokeText -= 1;

                  _this.$refs.shopFestival.style.height = shopListCokeText + 'px';
                  _this.$refs.shopFestival.style.paddingTop = 0 + 'px';
                } else {

                  clearInterval(timer)

                }
              },1)
            }
            this.flag2 = !this.flag2
          }
        },
        //搜索接口
        searchList(){
          this.$http('/showapi/product/getProductList?keywords=' + this.searchText)
            .then((res)=>{
              this.shopListOne = res.data.rows
              // console.log(this.shopListOne)
            })
            .catch((err)=>{
              console.error(err)
            })
        },

        //小 -- 分类 shopClassify
        shopClassify(index){
          let _this = this
          this.shopClassifyId = this.arr[index].id;
          // console.log(this.shopClassifyId)
          this.$refs.shopListCokeText.style.height = 0;
          this.$refs.shopListPriceAll.style.height = 0;
          this.$refs.shopFestival.style.height     = 0;
          this.$refs.shopListCokeText.style.paddingTop = 0 + 'px';
          this.$refs.shopListHeight.style.overflow = 'scroll'
          this.shopMasking = true;
          this.colorText = false;
          this.flag = true
          this.$refs.shopMasking.style.display = 'none';
          this.$http.get('/showapi/product/getProductList?productTypeId=' + this.shopClassifyId +'&lowPrice=' + this.filterStartPrice+ '&highPrice='+ this.filterEndPrice +'&beginPrice=' + this.startPrice +'&endPrice='+this.endPrice+'&festivalId='+this.festivalId+'')
            .then((res)=>{

                this.shopListOne = res.data.rows
                if(this.shopListOne == ''){
                  Toast({
                    message: '没有此商品，请重新搜索',
                    position: 'middle',
                    duration: 2000
                  });
                }
            })
            .catch((err)=>{
              console.error(err)
            })
        },

        //小 -- 价格 shopListPrice

        shopListPrice(index,e){
          this.startPrice = this.$refs.shopListOnePrice[index].dataset.startprice
          this.endPrice = this.$refs.shopListOnePrice[index].dataset.endprice
          //console.log(startPrice)
          this.$refs.shopListCokeText.style.height = 0;
          this.$refs.shopListPriceAll.style.height = 0;
          this.$refs.shopFestival.style.height     = 0;
          this.$refs.shopListPriceAll.style.paddingTop = 0 + 'px';
          this.$refs.shopListHeight.style.overflow = 'scroll'
          this.shopMaskingPrice = true;
          this.colorTextPrice = false;
          this.$refs.shopMasking.style.display = 'none';
          this.flag1 = true
          this.$http.get('/showapi/product/getProductList?productTypeId=' + this.shopClassifyId +'&lowPrice=' + this.startPrice+ '&highPrice='+ this.endPrice +'&festivalId='+ this.festivalId +'')
            .then((res)=>{
              this.shopListOne = res.data.rows
              if(this.shopListOne == ''){
                Toast({
                  message: '没有此价格的商品，请重新搜索',
                  position: 'middle',
                  duration: 2000
                });
              }
            })
            .catch((err)=>{
              console.error(err)
            })
        },
        //点击筛选
        BtnFilter(){
          let filterstartPrice = this.filterStartPrice;
          let filterEndPrice   = this.filterEndPrice;
          this.$refs.shopListCokeText.style.height = 0;
          this.$refs.shopListPriceAll.style.height = 0;
          this.$refs.shopFestival.style.height     = 0;
          this.$refs.shopListPriceAll.style.paddingTop = 0 + 'px';
          this.$refs.shopListHeight.style.overflow = 'scroll';
          this.$refs.shopMasking.style.display = 'none';
          this.shopMaskingPrice = true;
          this.colorTextPrice = false;
          this.flag1 = true
          this.$http.get('/showapi/product/getProductList?productTypeId=' + this.shopClassifyId +'&lowPrice=' +filterstartPrice+ '&highPrice='+filterEndPrice+'&festivalId='+ this.festivalId +'')
            .then((res)=>{
              this.shopListOne = res.data.rows
              if(this.shopListOne == ''){
                Toast({
                  message: '没有此价格的商品，请重新搜索',
                  position: 'middle',
                  duration: 2000
                });
              }
            })
            .catch((err)=>{
              console.error(err)
            })
        },
        //   小节庆
        shopFestivalSearch(index){
            this.festivalId = this.shopList[index].id   //&festivalId='+ this.festivalId +'
            this.shopMaskingFestival = true;
            this.colorTextFestival   = false;
            this.flag2 = true
            this.$refs.shopListCokeText.style.height = 0;
            this.$refs.shopListPriceAll.style.height = 0;
            this.$refs.shopFestival.style.height     = 0;
            this.$refs.shopFestival.style.paddingTop = 0 + 'px';
            this.$refs.shopMasking.style.display = 'none';
            this.$refs.shopListHeight.style.overflow = 'scroll'
            this.$http.get('/showapi/product/getProductList?productTypeId=' + this.shopClassifyId +'&lowPrice=' + this.filterStartPrice+ '&highPrice='+ this.filterEndPrice +'&beginPrice=' + this.startPrice +'&endPrice='+this.endPrice+'&festivalId='+this.festivalId+'')
              .then((res)=>{
                this.shopListOne = res.data.rows
                if(this.shopListOne == ''){
                  Toast({
                    message: '没有此类型的商品，请重新搜索',
                    position: 'middle',
                    duration: 2000
                  });
                }
              })
              .catch((err)=>{
                console.error(err)
              })
        },
        public(Dad,child,flag){
          let shopListOne = '';
          this.$refs.shopMasking.style.display = 'block';//蒙版显示于隐藏
          this.$refs.shopListHeight.style.overflow = 'scroll'
          if (child.length <= 4){

            shopListOne = (child[0].offsetHeight + 10) * 1;

          } else if (child.length <= 8){

            shopListOne = (child[0].offsetHeight + 10) * 2;
          } else if (8 < child.length <= 12){

            shopListOne = (child[0].offsetHeight + 10) * 3;
          }

          let shopListCokeText = Dad.offsetHeight; //默认等于0

          let _this = this;
          if(flag){

            var timer1 = setInterval(function () {

              if (shopListCokeText != shopListOne){

                shopListCokeText += 1;
                //_this.$refs.shopListCokeText.style.height = 0;
                Dad.style.height = shopListCokeText + 'px';

              } else {

                clearInterval(timer1)

              }
            },1)
          } else {
            this.$refs.shopMasking.style.display = 'none';
            this.$refs.shopListHeight.style.overflow = 'scroll'
            var timer = setInterval(function () {

              if (shopListCokeText != 0){

                shopListCokeText -= 1;

                Dad.style.height = shopListCokeText + 'px';

              } else {

                clearInterval(timer)

              }
            },1)
          }
          //flag = !flag
        }
      },
    }
</script>

<style scoped lang="less" type="text/less">
.classifyDetail{
  width: 100%;
  height: 100%;
  background:#F1F1F1;
  position: relative;
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
  }
  .classifyDetailList{
    display: flex;
    margin-top: 10px;
    background: #ffffff;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 28px;

    .advertiding{
      /*padding: 18px 24px 18px 204px;*/
      flex: 1;
      img{
        width: 20px;
        height: 12px;

        font-family:PingFang-SC-Regular;
        color: #333333;
      }
    }
    .advertidingAll{
      color:rgba(89,92,161,1);
      font-size: 28px;
    }
    .price{
      /*padding: 18px 204px 18px 24px;*/
      flex: 1;
      img{
        width: 20px;
        height: 12px;
        font-size: 24px;
        font-family:PingFang-SC-Regular;
        color: #333333;
      }
    }
    .festival{
      flex:1;
      img{
        width: 20px;
        height: 12px;
        font-size: 24px;
        font-family:PingFang-SC-Regular;
        color: #333333;
      }
    }
  }
  .shopListCokeText{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #ffffff;
    height: 0;
    position: absolute;
    top: 150px;
    left: 0;
    overflow: scroll;
    overflow: hidden;
    z-index: 100;
    /*padding-top: 20px;*/
    div{
      width: 186px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
      color: #666666;
      font-size: 28px;

    }
  }
  .shopListPrice{
    width: 100%;
    position: absolute;
    top: 150px;
    left: 0;
    height: 0;
    background: #ffffff;
    overflow: scroll;
    overflow: hidden;
    z-index: 100;
    .priceList{
      display: flex;
      .shopListPriceLeft{
        width: 150px;
        box-sizing: border-box;
        padding-top: 10px;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        color:rgba(102,102,102,1);
      }
      .shopListPriceRight{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        div{
          width: 186px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          margin-bottom: 20px;
          color: #666666;
          font-size: 28px;
        }
      }
    }
    .filter{
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      div{
        flex: 1;
        text-align: center;
      }
      div:nth-of-type(2){
        input{
          width: 90px;
          height: 42px;
          background:rgba(241,241,241,1);
          outline: none;
          border: 0;
        }
      }
      div:nth-of-type(3){
        button{
          background:rgba(89,92,161,1);
          color: white;
          width: 80px;
          height: 42px;
          border: 0;
          border-radius:28px;
        }
      }
    }

  }
  .shopFestival{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #ffffff;
    height: 0;
    position: absolute;
    top: 150px;
    left: 0;
    overflow: hidden;
    z-index: 100;
    div{
      width: 186px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
      color: #666666;
      font-size: 28px;

    }
  }
  .nodata{
    text-align: center;
    padding-top: 150px;
    div:nth-of-type(2){
      font-size: 30px;
    }
  }
  .shopList{
    /*display: flex;*/
    width: 100%;
    padding: 10px;
    /*flex-wrap: wrap;*/
    box-sizing: border-box;
    /*height: 1200px;*/
    height: calc(100% - 150px);
    overflow: scroll;
    position: relative;
    .div{
      background: red;
    }
    .shopListOne{
      width: 360px;
      height: 500px;
      box-sizing: border-box;
      padding: 20px;
      background: #ffffff;
      margin-right: 10px;
      margin-top: 10px;
      float: left;
      .shopListOneImg{
        img{
          width: 320px;
          height: 300px;
        }
      }
      .shopListText{
        margin-top: 30px;
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
      .shopListTitle{
        color: #333333;
        opacity: 1;
        font-size: 26px;
        /*width: 214px;*/
        height: 70px;
        margin-top: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
      }
    }
    .shopListOne:nth-of-type(2n){
      margin-right: 0;
    }
    .shopListOne:nth-of-type(1){
      margin-top: 0;
    }
    .shopListOne:nth-of-type(2){
      margin-top: 0;
    }

  }
  .shopListCoke{
    position: absolute;
    top: 150px;
    left: 0;
    height: calc(100% - 150px);
    width: 100%;
    background: rgba(0,0,0,0.7);
    display: none;
  }
}
</style>
