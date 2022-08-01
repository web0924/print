<template>
  <div class="login-container">
    <el-form autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-position="left"
             label-width="0rem"
             class="card-box login-form">
      <p class="title"
         style="font-size:28rem;color:#000">欢迎登录</p>
      <h2 class="title"
          style="font-size:38rem;color:#0053b5">文印室管理系统</h2>
      <p style="text-align:center;font-size: 16rem;margin-top: 30rem;">{{loginType===1?'密码登录':'验证码登录'}}</p>
      <div v-if="loginType===1">
        <el-form-item prop="account">
          <div style="font-size: 16rem;">账号</div>
          <el-input name="account"
                    type="text"
                    v-model="loginForm.account"
                    autoComplete="off"
                    placeholder="请输入您的账号/手机号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <div style="font-size: 16rem;">密码</div>
          <el-input name="pwd"
                    type="password"
                    v-model="loginForm.pwd"
                    autoComplete="off"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 50rem;">
          <el-button type="primary"
                     style="width:100%"
                     :loading="loading"
                     @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text"
                     style="width:100%;color:#000;border: 1rem solid #333333;"
                     @click.native.prevent="loginType=2">
            验证码登录
          </el-button>
        </el-form-item>
      </div>
      <div v-if="loginType===2">
        <el-form-item prop="account">
          <div style="font-size: 16rem;">手机号</div>
          <el-input name="account"
                    type="text"
                    v-model="loginForm.phone"
                    autoComplete="off"
                    placeholder="请输入您的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="vcode">
          <div style="font-size: 16rem;">验证码</div>
          <el-input style="width:60%"
                    name="vcode"
                    type="vcode"
                    v-model="loginForm.vcode"
                    autoComplete="off"
                    placeholder="请输入验证码"></el-input>
          <div style="display:inline-block;width:30%">
            <vccode :phone="loginForm.phone" />
          </div>
        </el-form-item>
        <el-form-item style="margin-top: 50rem;">
          <el-button type="primary"
                     style="width:100%;"
                     :loading="loading"
                     @click.native.prevent="handleLoginBysms">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text"
                     style="width:100%;color:#000;border: 1rem solid #333333;"
                     @click.native.prevent="loginType=1">
            密码登录
          </el-button>
        </el-form-item>
      </div>
      <!-- <div class='tips'>测试帐号为:81438234@qq.com 密码：123456</div> -->

      <!-- <router-link to="/sendpwd"
                   class="forget-pwd">
        忘记密码?(或首次登录)
      </router-link> -->
    </el-form>

  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import md5 from 'blueimp-md5'
import { global } from 'src/global/global'
import { api } from 'src/global/api'
import axios from 'axios'
import qs from 'qs'

import vccode from '../../components/vccode'
// import { getQueryObject } from 'utils';

export default {
  name: 'login',
  components: {
    vccode
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号/手机号'))
      } else {
        callback()
      }
    }
    // const validateAccount = (rule, value, callback) => {
    //   if (value !== '81438234@qq.com') {
    //     callback(new Error('帐号不存在！'));
    //   } else {
    //     callback();
    //   }
    // };
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码/密码'))
      } else {
        callback()
      }
    }
    // const validatePass2 = (rule, value, callback) => {
    //   if (md5('@lss' + value) !== md5('@lss123456')) {
    //     callback(new Error('密码错误！'));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      loginType: 1,
      loginForm: {
        // account: '81438234@qq.com',
        account: '',
        pwd: '',
        phone: '',
        vcode: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        pwd: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      showDialog: false
    }
  },
  computed: {
    // ...mapGetters([
    //   // 映射 this.auth_type 为 store.getters.auth_type。已删除
    //   'auth_type'
    // ])
  },
  mounted() {
    const vm = this
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const par = JSON.parse(JSON.stringify(this.loginForm))
          par.pwd = md5(md5(par.pwd))
          axios
            .post('/smartprint/print-room/login-by-pwd', qs.stringify(par))
            .then(response => {
              this.loading = false
              if (response.data.code !== 0) { return this.$message.error(response.data.msg) }
              axios
                .post('/smartprint/print-room/me/refresh')
                .then(res2 => {
                  if (res2.data.code !== 0) { return vm.$message.error(res2.data.msg) }
                  this.$store.dispatch('LoginByEmail', par).then(() => {
                    this.loading = false
                    // this.$router.push({ path: '/orderManage/orderManage' });
                    const moduleIds = res2.data.data.login.user.moduleIds
                    this.$router.push({ path: loginToPath(moduleIds) });
                    // 登陆后的跳转
                    function loginToPath(ids) {
                      const path = '/'

                      // 本地路由表
                      const routerMap = [
                        {
                          moduleId: '7',
                          moduleName: '学科管理',
                          path: '/subject/subject'
                        },
                        {
                          moduleId: '6',
                          moduleName: '订单管理',
                          path: ['/orderManage/orderManage', '/orderManage/officeOrderManage']
                        },
                        {
                          moduleId: '1',
                          moduleName: '年级管理',
                          path: '/orderManage/officeOrderManage'
                        },
                        {
                          moduleId: '2',
                          moduleName: '班级管理',
                          path: '/classRoomManage/permissionsManage'
                        },
                        {
                          moduleId: '4',
                          moduleName: '学生管理',
                          path: '/studentManage/studentManage'
                        },
                        {
                          moduleId: '5',
                          moduleName: '科室管理',
                          path: '/department/department'
                        },
                        {
                          moduleId: '3',
                          moduleName: '教职工管理',
                          path: '/teacherManage/teacherManage'
                        }
                      ]

                      if (!ids) return path
                      const fistRoutes = ids.split(',')[0]
                      return routerMap.filter(item => item.moduleId == fistRoutes)[0].path
                    }
                  })
                })
                .catch(err => err)

                .catch(err => {
                  this.$message.error(err)
                  this.loading = false
                })
            })
            .catch(error => {
              console.log('错误信息')
              console.log(error)
            })
          // this.$store.dispatch('LoginByEmail', par).then(() => {
          //   this.loading = false;

          //   console.log('登陆成功即将跳转--------')
          //   this.$router.push({ path: '/schoolManage/permissionsManage' });

          //   // this.showDialog = true;
          // })
          //   .catch(err => {
          //     this.$message.error(err);
          //     this.loading = false;
          //   });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleLoginBysms() { },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      //   alert('第三方登录失败');
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
    window.axios = axios
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/assets/css/mixin.scss";
.tips {
  font-size: 14rem;
  color: #fff;
  margin-bottom: 5rem;
}
.login-container {
  @include relative;
  height: 100vh;
  /*background-color: #2d3a4b;*/

  background: url("../../assets/img/login_bg.png") no-repeat;
  background-size: cover;
  // background-size: 100% auto;
  background-position: center center;
  // background-attachment:fixed;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0rem 1000rem #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
    background-position: center 0;
  }
  input {
    background: transparent;
    border: 0rem;
    -webkit-appearance: none;
    border-radius: 0rem;
    padding: 0rem;
    color: #333;
    height: 30rem;
  }
  .el-input {
    display: inline-block;
    height: 30rem;
    width: 85%;
    font-size: 14rem;
  }
  .el-form-item__content {
    line-height: 30rem;
  }
  .svg-container {
    padding: 6rem 5rem 6rem 15rem;
    width: 40rem;
    float: left;
    text-align: center;
    color: #889aa4;
    font-size: 20rem;
  }

  .title {
    font-size: 26rem;
    font-weight: 400;
    color: #eeeeee;
    margin: 0rem auto 10rem auto;
    text-align: center;
    font-weight: bold;
  }

  .login-form {
    position: absolute;
    // left: 0;
    top: 15%;
    right: 24%;
    width: 450rem;
    padding: 35rem 35rem 15rem 35rem;
    margin: 40rem auto 0;
    // margin: 0 auto;
  }

  .el-form-item {
    // border: 1rem solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    // border-radius: 5rem;
    border-bottom: 1rem solid #dddddd;
    color: #333;
  }

  .forget-pwd {
    color: #fff;
  }
}
</style>
