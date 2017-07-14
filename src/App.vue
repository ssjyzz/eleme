<template>
  <div id="app">
    <!-- 头部 -->
    <h-header></h-header>
    <!-- 导航栏 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
      <router-link to="/ratings">评分</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive> 
    <!-- 商品列表 -->
  </div>
</template>

<script>

import Header from './components/header/Header.vue'
export default {
  components:{
    'h-header':Header,
  },
  created: function () {
      console.log(1)
    },
    mounted: function () {
      console.log(2)
    },
    updated: function () {
      console.log(3)
    },
    beforeDestroy: function () {
      console.log(4)
    }

}
</script>

<style lang="less" scoped>
  #app{width: 100%;}
  #app .tab{
    display:flex;
    justify-content:space-between;
    width:100%;
    height:0.8rem;
    // border-bottom:1px solid #eee;
    position: relative;
    top:2.7rem;
    // background:rgba(7,17,27,0.5);
    .tab-item{
      flex:1; 
      text-align: center;
      & > a {
        background: #fff;
        font-size:0.28rem;
        line-height: 0.8rem;
        display:block;
        text-decoration: none;
        color:rgb(77,85,93);
        &.active{
          color:#3190e8;
        }
      }
    }
  }
</style>
