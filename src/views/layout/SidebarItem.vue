<template>
  <div>
    <!-- 注意：路由表不能配置在后端，不然前端无法配置跳转到某些路由，例如提交成功后返回至某个固定路由 lss 2017-6-27 -->
    <!-- 菜单权限json（调试专用）：==={{ routes | json }} -->

    <!-- 后期改为动态路由（但是使用aync时 刷新会导致404） -->
    <template v-if="routes">

      <el-submenu index="订单管理"
                  v-if="routes['/orderManage/orderManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/book_slider_icon.png">
          订单管理
        </template>

        <router-link class="menu-indent"
                     :to="'/orderManage/orderManage?randomID='+randomID"
                     v-if="routes['/orderManage/orderManage']">
          <el-menu-item index="/orderManage/orderManage">
            学科订单
          </el-menu-item>
        </router-link>
        <router-link class="menu-indent"
                     :to="'/orderManage/officeOrderManage?randomID='+randomID"
                     v-if="routes['/orderManage/officeOrderManage']">
          <el-menu-item index="/orderManage/officeOrderManage">
            科室订单
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="年级管理"
                  v-if="routes['/classManage/permissionsManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/book_slider_icon.png">
          年级管理
        </template>
        <router-link class="menu-indent"
                     :to="'/classManage/permissionsManage?randomID='+randomID"
                     v-if="routes['/classManage/permissionsManage']">
          <el-menu-item index="/classManage/permissionsManage">
            年级列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="班级管理"
                  v-if="routes['/classRoomManage/permissionsManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/print_slider_icon.png"> 班级管理
        </template>

        <router-link class="menu-indent"
                     :to="'/classRoomManage/permissionsManage?randomID='+randomID"
                     v-if="routes['/classRoomManage/permissionsManage']">
          <el-menu-item index="/classRoomManage/permissionsManage">
            班级列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="学生管理"
                  v-if="routes['/studentManage/studentManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/book_slider_icon.png"> 学生管理
        </template>

        <router-link class="menu-indent"
                     :to="'/studentManage/studentManage?randomID='+randomID"
                     v-if="routes['/studentManage/studentManage']">
          <el-menu-item index="/studentManage/studentManage">
            学生列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="科室管理"
                  v-if="routes['/department/department']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/print_slider_icon.png"> 科室管理
        </template>

        <router-link class="menu-indent"
                     :to="'/department/department?randomID='+randomID"
                     v-if="routes['/department/department']">
          <el-menu-item index="/department/department">
            科室列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="学科管理"
                  v-if="routes['/subject/subject']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/person_slider_icon.png"> 学科管理
        </template>

        <router-link class="menu-indent"
                     :to="'/subject/subject?randomID='+randomID"
                     v-if="routes['/subject/subject']">
          <el-menu-item index="/subject/subject">
            学科列表
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="教职工管理"
                  v-if="routes['/teacherManage/teacherManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/person_slider_icon.png"> 教职工管理
        </template>

        <router-link class="menu-indent"
                     :to="'/teacherManage/teacherManage?randomID='+randomID"
                     v-if="routes['/teacherManage/teacherManage']">
          <el-menu-item index="/teacherManage/teacherManage">
            教职工列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="消息管理"
                  v-if="routes['/messageManage/messageManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/person_slider_icon.png"> 消息管理
        </template>

        <router-link class="menu-indent"
                     :to="'/messageManage/messageManage?randomID='+randomID"
                     v-if="routes['/messageManage/messageManage']">
          <el-menu-item index="/messageManage/messageManage">
            消息列表
          </el-menu-item>
        </router-link>
      </el-submenu>
      <el-submenu index="个人信息"
                  v-if="routes['/accountInfoManage/accountInfoManage']">
        <template slot="title">
          <img style="width:18px"
               src="../../assets/img/person_slider_icon.png"> 个人信息
        </template>
        <router-link class="menu-indent"
                     :to="'/accountInfoManage/accountInfoManage?randomID='+randomID"
                     v-if="routes['/accountInfoManage/accountInfoManage']">
          <el-menu-item index="/accountInfoManage/accountInfoManage">
            个人信息
          </el-menu-item>
        </router-link>
      </el-submenu>
    </template>

  </div>
</template>

<script>
// 获取vuex中的菜单权限 进行菜单show展示。登陆成功时直接 返回菜单json 并包含帐户信息
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      // type: Array
    }
  },
  data() {
    return {
      // randomID: null,
      timer: null

    }
  },
  watch: {
    // $route(to, from) {
    //   const reloadPath = ['orderManage', 'teacherManage']// 这些数组中包含的路径需要强制刷新浏览器窗口
    //   reloadPath.forEach(item => {
    //     to.path.includes(item) ? location.reload() : ''
    //   })
    // }
  },
  computed: {
    randomID() {
      // console.log(this.routes)
      if (this.$route.name) return +new Date().getTime()
    }
  },
  mounted() {
    // console.log(this.$props.routes)
    // this.timer = setInterval(() => {
    //   this.randomID = new Date().getTime()
    // }, 2000)
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
  margin-right: 10px;
}
.fa {
  margin-right: 10px;
}
.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
</style>

