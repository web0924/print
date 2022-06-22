<template>
  <div class="">
    <el-menu class="navbar"
             mode="horizontal">
      <!-- 
      <i class="fa fa-bars"
         @click="toggleSideBar"
         :isActive="sidebar.opened"></i> -->
      <span class="bars-title">{{accountInfo.printRoom &&(accountInfo.printRoom.schoolName +accountInfo.printRoom.name)}}</span>
      <!-- <tabs-view></tabs-view> -->

      <error-log v-if="log.length>0"
                 class="errLog-container"
                 :logsList="log"></error-log>
      <screenfull class='screenfull'></screenfull>
      <div class="account-caontainer">
        <span>姓名：{{accountInfo.name}}</span>
        <span style="margin-left:15px">账号：{{accountInfo.account}}</span>
      </div>
      <el-button @click="logout"
                 size="mini"
                 class="loginout-btn">
        退出
        <img style="width:15px;height:13px;position:relative;top:2px"
             src="../../assets/img/login_out.png">
      </el-button>
      <!-- <el-dropdown class="avatar-container"
                   trigger="click">
        <div class="avatar-wrapper">
          <span class="user-name">{{userInfo.nickname}}</span>
          <img class="user-avatar"
               :src="userInfo.avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown"
                          slot="dropdown">
          <router-link class='inlineBlock'
                       to="/index/personalInfo">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="dialogFormVisible = true">修改密码</span>
          </el-dropdown-item>

          <el-dropdown-item>
            <span @click="dialogVisible = true">切换主题</span>
          </el-dropdown-item>
          <el-dropdown-item divided><span @click="logout"
                  style="display:block;">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </el-menu>

    <!-- 修改密码弹窗 -->
    <el-dialog title="密码修改"
               :visible.sync="dialogFormVisible">

      <el-form class="small-space"
               :model="passwordForm"
               :rules="passwordFormRules"
               ref="passwordForm"
               label-position="right"
               label-width="100px"
               style='width: 400px; margin-left:50px;'>

        <el-form-item label="原密码"
                      prop="oldPassword">
          <el-input type="password"
                    v-model="passwordForm.oldPassword"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码"
                      prop="newPassword">
          <el-input type="password"
                    v-model="passwordForm.newPassword"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="重复新密码"
                      prop="newPassword2">
          <el-input type="password"
                    v-model="passwordForm.newPassword2"
                    auto-complete="off"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="handlePwdModifySubmit(passwordForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 换肤弹窗 -->
    <el-dialog title="更改主题颜色"
               :visible.sync="dialogVisible">
      <el-form class="small-space"
               label-position="left"
               label-width="130px"
               style='width: 400px; margin-left:50px;'>

        <el-form-item label="请选择主题颜色："
                      prop="resource">
          <el-radio-group v-model="themeValue">
            <el-radio label="blue">蓝色</el-radio>
            <el-radio label="green">绿色</el-radio>
            <el-radio label="red">红色</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="handleChangeTheme">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TabsView from './TabsView'

import Screenfull from 'components/Screenfull'
import ErrorLog from 'components/ErrLog'
import errLogStore from 'store/errLog'
import { global } from 'src/global/global'
import Cookies from 'js-cookie'
import md5 from 'blueimp-md5'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    TabsView,

    ErrorLog,
    Screenfull
  },
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (md5('@lss' + value) !== md5('@lss123456')) {
        callback(new Error('旧密码不正确！'))
      } else {
        callback()
      }
    }
    const validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      timer: null,
      accountInfo: {},
      log: errLogStore.state.errLog,
      dialogVisible: false,
      dialogFormVisible: false,
      themeValue: localStorage.getItem('themeValue')
        ? localStorage.getItem('themeValue')
        : 'blue',
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      passwordFormRules: {
        oldPassword: [
          { required: true, trigger: 'blur', message: '旧密码不能为空！' },
          { required: true, trigger: 'blur', validator: validateOldPassword }
        ],
        newPassword: [
          { required: true, trigger: 'blur', message: '新密码不能为空！' }
        ],
        newPassword2: [
          { required: true, trigger: 'blur', message: '重复密码不能为空！' },
          { required: true, trigger: 'blur', validator: validateNewPassword2 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'userInfo'])
  },
  mounted() {
    this.polling()// 消息推送
    const vm = this
    try {
      axios
        .post('/smartprint/me/refresh')
        .then(res => {
          if (res.data.code === 0) {
            this.accountInfo = res.data.data.login.user
          }
        })
        .catch(err => err)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    // 换肤
    handleChangeTheme() {
      const vm = this
      global.changeTheme(vm.themeValue)
      this.dialogVisible = false
    },
    handlePwdModifySubmit(formName) {
      const vm = this
      console.log('---', this.passwordForm)
      vm.$refs.passwordForm.validate(valid => {
        if (valid) {
          alert('恭喜:旧密码验证成功!')
          const par = {
            oldPassword: md5('@lss123456'),
            newPassword: md5('@lss' + vm.passwordForm.newPassword),
            newPassword2: md5('@lss' + vm.passwordForm.newPassword2)
          }
          console.log('密码修改入参为：', par)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toggleSideBar() {
      // 6-28
      $(this).toggleClass('is-active')
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    // 轮训
    polling() {
      axios.post('/smartprint/me/get-messages', qs.stringify({ getted: 0, sorts: 'id', orders: 'asc' }))
        .then(res => {
          this.timer = setTimeout(() => {
            clearTimeout(this.timer)
            const messages = res.data.data.messages
            if (messages) {
              this.creatNotify(messages)
            }
            this.polling()
          }, 20000)
        })
    },
    creatNotify(messages) {
      messages = messages.filter(item => item.viewed !== 1)
      let notifyPromise = Promise.resolve()
      for (let i = 0; i < messages.length; i++) {
        notifyPromise = notifyPromise.then(() => {
          this.$notify({
            title: '通知',
            dangerouslyUseHTMLString: true,
            duration: 0,
            onClick: () => {
              axios.post('/smartprint/me/view-message', qs.stringify({ messageId: messages[i].id })).then(res => {
                this.$router.push({
                  path: '/orderManage/orderManage',
                  query: { extra: 'edit', id: messages[i].linkId }
                })
              })
            },
            message: `<a style="color:#409EFF"><i>${messages[i].content}</i></a>`
          });
        })
      }
    },
    linkToOrder() {
      console.log(1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #0053b5 !important;
  .bars-title {
    position: absolute;
    left: 54px;
    color: #fff;
  }
  .fa-bars {
    cursor: pointer;
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 15px;
  }
  /*.hideSidebar .fa-bars{
            display: none;
        }*/
  .fa-bars[isactive] {
    transform: rotate(90deg);
  }
  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .loginout-btn {
    position: absolute;
    right: 60px;
    top: 10px;
    background: transparent;
    color: #fff;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      /* margin-top:5px;*/
      padding: 5px;
      position: relative;
      height: 40px;
      line-height: 40px;
      .user-name {
        float: left;
        margin-right: 5px;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

.account-caontainer {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 160px;
  color: #fff;
}
</style>