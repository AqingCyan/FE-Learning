<template>
  <div id="app">
    <van-nav-bar fixed title="CreatShare在线答题">
    </van-nav-bar>
    <transition name="van-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/home">题池</van-tabbar-item>
      <van-tabbar-item icon="exchange" to="/data">历史</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/loginUser">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data () {
            return {
                active: 3,
                path: ''
            }
        },
        created () {
            this.path = this.$route.path
            switch (this.path) {
                case 'home': this.active = 0;break;
                case 'data': this.active = 1;break;
                case 'loginUser': this.active = 2;break;
            }
        }
    }
</script>

<style>
  .top {
    height: 46px;
  }
  .bottom {
    height: 46px;
  }
</style>
