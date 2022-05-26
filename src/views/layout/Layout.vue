<template>
  <div class="app-wrapper"
       :class="{hideSidebar:!sidebar.opened}">
    <div class="nav-wrapper">
      <Navbar />
      <p style="height:15px;background:#F5F5F5;margin:0"></p>
    </div>
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container" />
    </div>
    <div class="main-container">
      <App-main />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Navbar, Sidebar, AppMain } from 'views/layout';
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  provide() {
    return {
      provObj: new Vue({
        data() {
          return { tableHeight: 330 }
        }
      })
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  },
  mounted() {
    // 后续抽取到store中，每个页面通过store引入。因当前vue的store被抽取出去，个人没法添加公共模块，所以只能暂时使用provide方式
    this.$nextTick(function() {
      const vm = this;
      // this.tableHeight0 = window.innerHeight - 310 +'px';
      vm._provided.provObj.tableHeight = window.innerHeight - 240 // + 'px'
      // 监听窗口大小变化
      window.onresize = function() {
        // vm.tableHeight0 = window.innerHeight - 310 +'px'
        vm._provided.provObj.tableHeight = window.innerHeight - 240 // + 'px'
      }
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/assets/css/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-wrapper {
      transform: translate(-140px, 0);
      .sidebar-container {
        transform: translate(132px, 0);
      }
      &:hover {
        transform: translate(0, 0);
        .sidebar-container {
          transform: translate(0, 0);
        }
      }
    }
    .main-container {
      margin-left: 40px;
    }
  }
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .sidebar-wrapper {
    width: 220px;
    position: fixed;
    // top: 0;
    top: 65px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: all 0.28s ease-out;
    background: #F5F5F5;
  }
  .sidebar-container {
    transition: all 0.28s ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 15px;
    overflow-y: auto;
  }
  .main-container {
    min-height: 100%;
    transition: all 0.28s ease-out;
    margin-left: 220px;
    padding-top: 65px;
  }
}
</style>