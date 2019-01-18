<!-- 搜索产品 -->
<template>
  <div class="ShopSearch">
    <div class="ShopSearchTop">
      <span>
        <img src="../images/return.png" alt="" @click="goIndex">
      </span>
      <span>分类</span>
      <span>
        <img src="../images/搜索.png" alt="" @click="goSearch">
      </span>
    </div>
    <div class="searchAll">
      <div class="searchAllLeft">
        <ul>
          <!---->
          <li v-for="(item,index) in shopListAllWarp" :class="{div:changeRed == index}" :data="index" @click="setStyle(index)">
            {{item.name}}
          </li>
          <!--<li>居家生活</li>-->
          <!--<li>户外运动</li>-->
          <!--<li>数码通讯</li>-->
          <!--<li>轻奢生活</li>-->
          <!--<li>办公用品</li>-->
          <!--<li>母婴用品</li>-->
          <!--<li>海外购  </li>-->
          <div class="searchAllLeftSolid"></div>
        </ul>
      </div>
      <div class="searchAllRight">
        <div>
          <!--  价格区间  -->
          <div class="priceRange" v-show="showarrPrice">
            <div class="sort" style="width: 100%;">
              <div>
                {{arrPrice.name}}
              </div>
              <div @click="allList(1)">
                <span>全部</span>
                <span><img src="../images/right.png" alt=""></span>
              </div>

            </div>
            <div class="sortDetail">
              <div :data-startPrice="item.lowPrice" :data-endPrice="item.highPrice" v-for="(item,index) in arrPrice.productTypeSecondList" ref="sortPrice" @click="sortDetail($event,index)">{{item.priceDesc}}</div>
            </div>
          </div>
          <!--  节庆商品  -->
          <div class="priceRange" v-show="showfestivalList">
            <div class="sort" style="width: 100%;">
              <div>
                {{festivalList.name}}
              </div>
              <div @click="allList(2)">
                <span>全部</span>
                <span><img src="../images/right.png" alt=""></span>
              </div>
            </div>
            <div class="sortDetail">
              <div v-for="(item,index) in festivalList.productTypeSecondList" @click="sortPrice(index)">{{item.name}}</div>
            </div>
          </div>

          <div v-for="item in shopListOne.productTypeSecondList" v-show="showShopListOne">
              <div class="searchDetails">
                <div class="sort" style="width: 100%;">
                  <div>
                     {{item.name}}
                  </div>
                  <div @click="allListProductType(item.parentId)">
                    <span>全部</span>
                    <span><img src="../images/right.png" alt=""></span>
                  </div>
                </div>
                <div class="sortDetailsAll">
                  <div class="sortDetails" v-for="(items,index) in item.productTypeThirdList" @click="sortDetails(items.id)">
                    <div class="searchOne">
                      <p>
                        <img :src="items.headImg" alt="">
                      </p>
                      <p>{{items.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import index from "../../router"; ///引入butter-scroll
    export default {
        name: "ShopSearch",
      data(){
          return{
            //价格区间
            arrPrice:'',
            changeRed:0,
            //全部商品
            shopListAllWarp:'',
            //节庆festivalList
            festivalList:'',
            //二级分类商品
            shopListOne:'',
            //showfestivalList 显示
            showfestivalList:false,
            //showarrPrice 显示
            showarrPrice:true,
            // shopListOne 显示
            showShopListOne:false,

            flag1:true
          }
      },
      created(){
        this.$http.get('/showapi/productType/getProductType')
          .then((res)=>{
            console.log(res)
            if (res.data.code == 0){
              this.shopListAllWarp = res.data.data.productTypeFirstList
              this.arrPrice = res.data.data.productTypeFirstList[0]
            }

          })
          .catch((err)=>{
            console.error(err)
          })
      },
      methods:{
        goIndex(){
          this.$router.push('/')
        },
        goSearch(){
          this.$router.push({
            path:'/classifyDetail',
            query:{
              'flag1':this.flag1
            }
          })
        },
        setStyle(index){
          this.changeRed = index
          if(index == 0){
            this.showarrPrice = true
            this.showfestivalList = false;
            this.showShopListOne = false
            this.arrPrice = this.shopListAllWarp[index]

          }
          if(index == 1){
            this.festivalList = this.shopListAllWarp[index];
            this.showfestivalList = true;
            this.showarrPrice = false;
            this.showShopListOne = false
          }
          if(index > 1){
            this.shopListOne = this.shopListAllWarp[index]
            this.showfestivalList = false
            this.showarrPrice = false;
            this.showShopListOne = true
          }
        },

        //点击全部进入商品详情页
        allList(index){
          let indexOne = index
          this.$router.push({
            path:'/classifyDetail',
            query:{
              index:indexOne
            }
          })
        },
        allListProductType(indexId){
          let IndexId = indexId;
          let flag = true
          this.$router.push({
            path:'/classifyDetail',
            query:{
              IndexId:IndexId,
              flag:true
            }
          })
        },
        //----------------点击三级列表进入商品详情页-------------------
        //点击三级分类的价格区间
        sortDetail(e,index){
          // console.log(this.$refs.sortPrice[index].dataset.startprice)
                this.$router.push({
                  path:'/classifyDetail',
                  query:{
                    'startprice':this.$refs.sortPrice[index].dataset.startprice,
                    'endprice'  :this.$refs.sortPrice[index].dataset.endprice,
                      'flag1':this.flag1
                  }
                })
        },
        // 点击三级分类的节庆商品
        sortPrice(index){
          let festivalListId = this.festivalList.productTypeSecondList[index].id
                this.$router.push({
                  path:'/classifyDetail',
                  query:{
                    'festivalListId':festivalListId,
                    'flag1':this.flag1
                  }
            })
        },

        sortDetails(id){
          let productTypeId = id
             this.$router.push({
                path:'/classifyDetail',
                query:{
                  'productTypeId':productTypeId,
                  'flag1':this.flag1
                }
            })
          }
      },
    }
</script>

<style scoped type="text/less" lang="less">
  .ShopSearch{
    width: 100%;
    height: 100%;
    .ShopSearchTop{
      width:100%;
      /*height: 32px;*/
      padding: 26px 30px;
      display: flex;
      background: #595CA1;
      justify-content: space-between;
      box-sizing: border-box;
      font-size:36px;
      font-family:PingFang-SC-Regular;
      color:rgba(255,255,255,1);
      span:nth-of-type(1){
        img{
          width: 20px;
          height: 36px;
        }
      }
      span:nth-of-type(3){
        img{
          width: 34px;
          height: 34px;

        }
      }

    }
    .searchAll{
      display: flex;
      height: calc(100% - 99px);
      .searchAllLeft{
        width: 200px;
        height: 100%;
        overflow: scroll;
        ul{

          padding-bottom: 30px;
          height: 100%;
          li{
            list-style: none;
            width: 100%;
            height: 120px;
            text-align: center;
            line-height: 120px;
            font-size:28px;
            font-family:PingFang-SC-Regular;
            color:rgba(51,51,51,1);
            position: relative;
            background: #F2F2F2;
          }
          .div{
            background: white;
            border-left: 3px solid #595CA1;
          }
          .searchAllLeftSolid{
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 1px;
            background: red;
          }
        }
      }
      .searchAllRight{
        flex: 1;
        background: #ffffff;
        height: 90%;
        /*overflow: hidden;*/
        overflow: scroll;
        .priceRange{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .sort{
            padding: 26px;
            box-sizing: border-box;
            text-align: left;
            font-size:26px;
            font-family:PingFang-SC-Regular;
            color:rgba(51,51,51,1);
            display: flex;
            justify-content: space-between;
            div:nth-of-type(2){
              display: flex;
              align-items: center;
              justify-items: center;
              font-size: 26px;
              span:nth-of-type(1){
                margin-right: 5px;
              }
              img{
                width: 20px;
                height: 25px;
              }
            }
          }
          .sortDetail{
            padding-left: 25px;
            padding-right: 25px;
            display: flex;
            flex-wrap: wrap;
            div{
              width:150px;
              height:60px;
              background:rgba(242,242,242,1);
              border-radius:8px;
              line-height: 60px;
              text-align: center;
              margin-right: 5px;
              margin-bottom: 20px;
            }
          }
        }
        .searchDetails{
          width: 100%;
          .sort{
            padding: 26px;
            box-sizing: border-box;
            text-align: left;
            font-size:26px;
            font-family:PingFang-SC-Regular;
            color:rgba(51,51,51,1);
            display: flex;
            justify-content: space-between;
            div:nth-of-type(2){
              display: flex;
              align-items: center;
              justify-items: center;
              font-size: 26px;
              span:nth-of-type(1){
                margin-right: 5px;
              }
              img{
                width: 20px;
                height: 25px;
              }
            }
          }
          .sortDetailsAll{
            display: flex;
            flex-wrap: wrap;
            padding: 26px;
            box-sizing: border-box;
            .sortDetails{
              display: flex;
              flex-wrap: wrap;
              box-sizing: border-box;
              width: 100px;
              margin-right: 75px;
              .searchOne{
                margin-bottom: 42px;
                width: 100px;
                p{
                  width: 100%;
                  text-align: center;
                }
                p:nth-of-type(1){
                  img{
                    width: 100px;
                    height: 120px;
                  }
                }
                p:nth-of-type(2){
                  font-size:24px;
                  font-family:PingFang-SC-Regular;
                  color:rgba(51,51,51,1);
                }
              }
              .searchOne:nth-of-type(3n-1){
                margin:  0 75px;
              }
            }
            .sortDetails:nth-of-type(3n){
              margin-right: 0;
            }
          }

        }
      }
    }
  }

</style>
