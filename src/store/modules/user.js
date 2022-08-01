// import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie'

import { global } from 'src/global/global'
import { api } from 'src/global/api'
// import store from '../../store';
import { Message } from 'element-ui'

import axios from 'axios'

const user = {
  state: {
    uid: Cookies.get('userId'),
    token: Cookies.get('printToken'),
    userInfo: null,
    scrollTop: 0
  },

  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_SCROLL_TOP: (state, scrollTop) => {
      state.scrollTop = scrollTop
    },

    LOGIN_SUCCESS: () => {
      console.log('login success')
    }
    // LOGOUT_USER: state => {
    //   state.user = '';
    // }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      // const email = userInfo.email.trim();

      //
      return new Promise((resolve, reject) => {
        console.log('登录入参：', userInfo)
        global.get(
          api.login,
          { params: userInfo },
          res => {
            // 登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
            console.log('-------获取到登录返回信息：', JSON.stringify(res))
            if (res.body.resultCode == 0) {
              var res = res.body.data

              // 按一天8小时工作制设置过期时间
              Cookies.set('printToken', res.token, { expires: 7 }) // 设置token
              Cookies.set('userId', res.uid, { expires: 7 }) // 设置用户id，

              commit('SET_TOKEN', res.token)
              // 设置userInfo
              // commit('SET_USERINFO', res); //此处也可省略，放在getUserInfo中统一处理
              resolve()
            } else {
              // alert(res.body.resultMsg)
              Message({
                showClose: true,
                message: res.body.resultMsg,
                type: 'error'
              })
            }
          },
          res => {
            reject(res)
          },
        )

        return false
      })
    },

    // 获取用户信息-文印室端
    GetInfo({ dispatch, commit, state }) {
      // 不需要权限的公共路由表
      const commonRoute = {
        '/errorpage/404': false, // false意为不展示在侧边栏
        '/messageManage/messageManage': true,
        '/accountInfoManage/accountInfoManage': true
      }
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
      // 由服务端返回ID生成本地路由
      function setRouterById(ids) {
        const moduleIds = ids.split(',')
        const permissions = {}
        const fRouter = routerMap.filter(
          item => moduleIds.indexOf(item.moduleId) > -1,
        )

        for (let i = 0; i < fRouter.length; i++) {
          if (typeof fRouter[i].path == 'string') {
            permissions[fRouter[i].path] = true
          } else {
            fRouter[i].path.forEach(item => {
              permissions[item] = true
            })
          }
        }
        return Object.assign(permissions, commonRoute)
      }
      return axios
        .post('/smartprint/print-room/me/refresh')
        .then(res => {
          if (res.data.code === 20) {
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          } else if (res.data.code === 0) {
            const accountInfo = res.data.data.login.user
            commit('SET_TOKEN', accountInfo.no)
            commit('SET_USERINFO', accountInfo)
            dispatch('GenerateRoutes', setRouterById(accountInfo.moduleIds))
            this.$router.push({ path: setRouterById(accountInfo.moduleIds)[keys][0] })// 获取路由表中的第一个路由作为登录跳转路由
          }
        })
        .catch(err => err)
      // return new Promise((resolve, reject) => {
      //   global.get(
      //     api.getUserInfo,
      //     { params: { userId: state.uid } },
      //     (res) => {
      //       // console.log('-------根据id获取用户信息：', JSON.stringify(res))
      //       if (res.body.resultCode == 0) {
      //         var res = res.body.data

      //         // Cookies.set('printToken', res.token); //Cookies.get('userId')
      //         // Cookies.set('userId', res.uid); //Cookies.get('userId')

      //         commit('SET_TOKEN', res.token)
      //         // 设置userInfo
      //         commit('SET_USERINFO', res)

      //         // 获取到信息时同时设置用户菜单权限
      //         // store.dispatch('GenerateRoutes', res.permissions); 等同于
      //         dispatch('GenerateRoutes', res.permissions)

      //         resolve()
      //       } else {
      //         // alert(res.body.resultMsg)
      //         Message({
      //           showClose: true,
      //           message: res.body.resultMsg,
      //           type: 'error',
      //         })
      //       }
      //     },
      //     (res) => {
      //       reject(res)
      //     },
      //   )
      // })
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code)
        loginByThirdparty(
          state.status,
          state.email,
          state.code,
          state.auth_type,
        )
          .then(response => {
            commit('SET_TOKEN', response.data.token)
            Cookies.set('printToken', response.data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出 （头部登出）
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 换成请求登出接口

        // logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        // commit('SET_ROLES', []);
        Cookies.remove('printToken')
        Cookies.remove('userId')
        resolve()
        // }).catch(error => {
        //   reject(error);
        // });
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        // commit('SET_ROLES', [role]);
        // store.dispatch('GenerateRoutes', res.permissions);
        dispatch('GenerateRoutes', res.permissions)
        resolve()
      })
    }
  }
}

export default user
