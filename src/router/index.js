import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// 所以只在生产中使用延迟加载

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* components */
// const Tinymce = _import('components/tinymce');
// const Mixin = _import('components/mixin');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');


const PersonalInfo = _import('index/personalInfo');
const Readme = _import('index/readme');
/* example*/
const TableList = _import('example/tableList');

// 豆瓣电影
// const NewMovie = _import('movie/newMovie');
// const MovieSearch = _import('movie/movieSearch/index');


const Form = _import('example/form');
const Tinymce = _import('example/tinymce');
const Mixin = _import('example/mixin');

/* 系统管理*/
const PermissionsManage = _import('systemSet/permissionsManage');
/* 年级管理 */
const SchoolManage = _import('class-manage/permissionsManage');
// 班级管理
const PrintManage = _import('classRoom-manage/permissionsManage');
// 科室管理
const Department = _import('department/department');
// 教职工管理
const teacherManage = _import('teacherManage/teacherManage');
// 学科管理
const Subject = _import('subject/subjects');
// 订单管理
const OrderManage = _import('order-manage/orderManage');
const officeOrderManage = _import('order-manage/officeOrderManage');

// 学生管理
const StudentManage = _import('student-manage/studentManage');

// 消息管理
const messageManage = _import('message-manage/messageManage');

// 个人信息
const accountInfoManage = _import('account-info/accountInfo');

/* 学生管理*/
// const StudentList = _import('student/studentInfo/index');
// const StudentAdd = _import('student/studentInfo/modal/studentAdd'); /* 新增修改后期改成同一个弹窗*/
// const StudentUpdate = _import('student/studentInfo/modal/studentUpdate');

/* 机构管理*/
const OrgManager = _import('org-manage/org-manager/index');


Vue.use(Router);

/**
 * icon : 菜单图标
 * hidden : true不显示在菜单栏
 * redirect : noredirect 为不重定向
 * noDropdown : true 不显示子菜单
 * meta : { role: ['admin'] }  will control the page role
 **/
const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/authredirect', component: authRedirect, hidden: true },
  { path: '/sendpwd', component: sendPWD, hidden: true },
  { path: '/reset', component: reset, hidden: true },
  { path: '/404', component: Err404, hidden: true },  // 假地址时重定向
  { path: '/401', component: Err401, hidden: true },  // 无权限时重定向
  {
    path: '/',
    // component: Layout,
    // redirect: '/index/readme',  // 重定向到默认首页
    redirect: '/accountInfoManage/accountInfoManage',  // 重定向到默认首页
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: 'EXCEL',
    noDropdown: true,
    children: [
      { path: 'readme', component: Readme, name: '系统说明' },
      { path: 'personalInfo', component: PersonalInfo, name: '教职工管理' }
    ]
  },



  // {
  //   path: '/movie',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '',
  //   // icon: 'EXCEL',
  //   noDropdown: true,
  //   children: [
  //     { path: 'newMovie', component: NewMovie, name: '热映电影列表' },
  //     { path: 'movieSearch', component: MovieSearch, name: '电影搜索' }
  //   ]
  // },

  {
    path: '/errorpage',
    component: Layout,
    redirect: 'noredirect',
    name: '错误页面',
    // icon: '404',
    children: [
      { path: '401', component: Err401, name: '401' },
      { path: '404', component: Err404, name: '404' }
    ]
  },
  {
    path: '/systemSet',
    component: Layout,
    redirect: 'noredirect',
    name: '系统设置',
    // icon: '404',
    children: [
      { path: 'permissionsManage', component: PermissionsManage, name: '权限管理' }

    ]
  },
  {
    path: '/orderManage',
    component: Layout,
    redirect: 'noredirect',
    name: '订单管理',
    // icon: '404',
    children: [
      { path: 'orderManage', meta: { keepAlive: true }, component: OrderManage, name: 'orderList' },
      { path: 'officeOrderManage', component: officeOrderManage, name: '科室订单' }
    ]
  },
  {
    path: '/classManage',
    component: Layout,
    redirect: 'noredirect',
    name: '年级管理',
    // icon: '404',
    children: [
      { path: 'permissionsManage', component: SchoolManage, name: '年级列表' }
    ]
  },
  {
    path: '/classRoomManage',
    component: Layout,
    redirect: 'noredirect',
    name: '班级管理',
    // icon: '404',
    children: [
      { path: 'permissionsManage', component: PrintManage, name: '班级列表' }
    ]
  },
  {
    path: '/studentManage',
    component: Layout,
    redirect: 'noredirect',
    name: '学生管理',
    // icon: '404',
    children: [
      { path: 'studentManage', component: StudentManage, name: '学生列表' }
    ]
  },
  {
    path: '/department',
    component: Layout,
    redirect: 'noredirect',
    name: '科室管理',
    // icon: '404',
    children: [
      { path: 'department', component: Department, name: '科室列表' }
    ]
  },
  {
    path: '/messageManage',
    component: Layout,
    redirect: 'noredirect',
    name: '消息管理',
    // icon: '404',
    children: [
      { path: 'messageManage', component: messageManage, name: '消息管理' }
    ]
  },
  {
    path: '/teacherManage',
    component: Layout,
    redirect: 'noredirect',
    name: '教职工管理',
    // icon: '404',
    children: [
      { path: 'teacherManage', component: teacherManage, name: '教职工管理' }
    ]
  },
  {
    path: '/accountInfoManage',
    component: Layout,
    redirect: 'noredirect',
    name: '账号管理',
    // icon: '404',
    children: [
      { path: 'accountInfoManage', component: accountInfoManage, name: '个人信息' }
    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: 'noredirect',
    name: '',
    // icon: '404',
    children: [
      { path: 'subject', component: Subject, name: '学科管理' }
    ]
  },
  {
    path: '/orgManage',
    component: Layout,
    redirect: 'noredirect',
    name: '机构管理',
    children: [
      { path: 'orgManager', component: OrgManager, name: '机构列表' }

    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '综合实例',
    // icon: 'zonghe',
    children: [
      { path: 'tableList', component: TableList, name: '示例表格' },
      { path: 'form', component: Form, name: 'form表单编辑' },

      { path: 'tinymce', component: Tinymce, name: '富文本编辑器' },
      { path: 'mixin', component: Mixin, name: '小组件' },
      { path: '31', component: Form, name: '三级菜单1' }
    ]
  },
  // { path: '/', redirect: '/excel', hidden: true },
  { path: '*', redirect: '/404', hidden: true }


  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   hidden: true,
  //   children: [{ path: 'dashboard', component: dashboard, name: '首页'  }]
  // },


]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes: constantRouterMap
});

// export const asyncRouterMap = [

// ];
