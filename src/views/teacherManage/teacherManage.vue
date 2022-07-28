<template>
  <div class="app-container">
    <div v-show="viewType===0"
         style="padding-bottom:30px">
      <div style="height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/teacherManage/teacherManage' }">教职工列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-input @keyup.enter.native="handleSearch"
                    size="small"
                    style="width: 280px;"
                    class="filter-item"
                    placeholder="输入关键字搜索"
                    v-model="listQuery.kw">
          </el-input>
          <el-select clearable
                     class="filter-item"
                     style="width: 280px"
                     v-model="listQuery.officeId"
                     size="small"
                     placeholder="选择科室">
            <el-option v-for="item in  officeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>

          <el-button class="filter-item"
                     type="primary"
                     @click="handleSearch"
                     size="small"
                     icon="edit">搜索</el-button>
          <el-button class="filter-item"
                     @click="handleReset"
                     size="small"
                     icon="edit">重置</el-button>
          <el-button class="filter-item"
                     style="position:absolute;right:280px;background:#000"
                     type="primary"
                     @click="handleImport"
                     size="small"
                     icon="edit">模板导入</el-button>
          <el-button class="filter-item"
                     @click="handleDowload"
                     style="position:absolute;right:180px;background:#000"
                     type="primary"
                     size="small"
                     icon="edit">下载模板</el-button>
          <el-button class="filter-item"
                     style="position:absolute;right:40px;background:#000"
                     type="primary"
                     @click="handleCreate"
                     size="small"
                     icon="edit">添加教职工</el-button>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>

      <!-- 表格 -->
      <el-table ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="list"
                v-loading.body="listLoading"
                element-loading-text=""
                border
                fit
                highlight-current-row>
        <!-- <el-table-column type="selection"
                       width="65">
      </el-table-column> -->

        <el-table-column align="center"
                         label='序号'
                         width="100">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="教职工名称"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="联系电话"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userPhone}}
          </template>
        </el-table-column>
        <el-table-column label="所属学科"
                         width="">
          <template slot-scope="scope">
            {{scope.row.subjectName}}
          </template>
        </el-table-column>

        <!-- <el-table-column label="教职工名称"
                         width="100">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.userName  }} &nbsp; &nbsp;</span>
            </template>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="联系电话"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userPhone">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column> -->
        <!-- <el-table-column label="所属学科"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column> -->
        <el-table-column label="是否注册小程序"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <!-- <el-button icon="edit"
                       size="small"
                       @click="setPermissions(scope.$index, scope.row)">设置权限</el-button> -->
            <el-button icon="edit"
                       size="small"
                       type="success"
                       plain
                       @click="createICCard(scope.$index, scope.row)">制作IC卡</el-button>
            <el-button icon="edit"
                       size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <template>
              <el-popconfirm @confirm="handleDelete(scope.$index, scope.row)"
                             title="确定删除吗？">
                <el-button slot="reference"
                           icon="delete"
                           size="small"
                           type="danger">删除</el-button>
              </el-popconfirm>
            </template>

          </template>

        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.currPage"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="listQuery.count"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-show="viewType==='add'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/teacherManage/teacherManage' }">教职工列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加教职工</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="120px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="教职工名称">
            <el-input v-model="roleTemp.userName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="roleTemp.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="所属年级">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.gradeId">
              <el-option v-for="item in  gradeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属学科">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.subjectId">
              <el-option v-for="item in  subjectList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属科室">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.officeId">
              <el-option v-for="item in  officeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <p style="width:200%;height:1px; background: #eee;margin:50px 0"></p>
          <el-form-item label="账号">
            <el-input v-model="roleTemp.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="初始密码为：123456"
                      v-model="roleTemp.userPwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="教职工层次">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary"
                       @click="onAddSubmit">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="viewType==='edit'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/teacherManage/teacherManage' }">教职工列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑教职工</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp2"
                 label-position="left"
                 label-width="120px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="教职工名称">
            <el-input v-model="roleTemp2.userName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="roleTemp2.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="所属年级">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp2.gradeId">
              <el-option v-for="item in  gradeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属学科">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp2.subjectId">
              <el-option v-for="item in  subjectList"
                         :key="item.id"
                         :label="subjectLabel(item)"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属科室">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp2.officeId">
              <el-option v-for="item in  officeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <p style="width:200%;height:1px; background: #eee;margin:50px 0"></p>
          <el-form-item label="账号">
            <el-input v-model="roleTemp2.userAccount"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password"
                      v-model="userPwd"
                      :placeholder="roleTemp2.userPwd"></el-input>
          </el-form-item>
          <!-- <el-form-item label="教职工层次">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary"
                       @click="onEditSubmit">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="制卡"
               :visible.sync="dialogPermissionsVisible">
      <p>{{this.tips}}</p>
      <el-steps :active="active"
                finish-status="success">
        <el-step title="连接设备"></el-step>
        <el-step :description="tfUID"
                 title="获取卡号"></el-step>
        <el-step :description="tfBlockData"
                 title="读取卡内数据"></el-step>
        <el-step title="写入完成"></el-step>
      </el-steps>
      <el-button v-if="active<=3"
                 style="margin-top: 12px;"
                 @click="next">下一步</el-button>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPermissionsVisible = false"
                   type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getList } from 'api/article';
import { global } from 'src/global/global'
import { api } from 'src/global/api'
import axios from 'axios'
import qs from 'qs'
import md5 from 'blueimp-md5';

import store from '@/store'

import $Reader from '../../assets/js/rdapi'


const GFUNC = {
  M1_findCard: 1,
  M1_authentication: 2,
  M1_read: 3,
  M1_write: 4,
  M1_initVal: 5,
  M1_increment: 6,
  M1_decrement: 7,
  M1_readVal: 8,
  M1_updateKey: 9
};

const g_device = '00'; // 设备句柄号
let g_isOpen = false;
let g_blockAddr = 2;
let g_blockData;
const g_key = 'FFFFFFFFFFFF'
const g_keyType = 60;
let g_vale;
let g_wantFunc = 0;

export default {
  data() {
    return {
      active: 0,
      tips: '', // 提示
      tfUID: '', // 卡号
      tfBlockData: '', // 读取的数据

      typeOptions: {
        Common: '公共',
        WenKe: '文科',
        LiKe: '理科'
      },

      userPwd: '',
      // list: null,
      listLoading: false,

      list: null, // 表格list
      smMenuBeanDtoList: null, // 菜单
      total: null,
      // listLoading: true,
      listQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },
      roleTemp: {},
      roleTemp2: {},
      ruleForm: {
        permissions: []
      },
      dialogFormVisible: false,
      dialogPermissionsVisible: false,
      multipleSelection: [],

      viewType: 0, // 0 | add | edit
      gradeList: [],
      classList: [],
      subjectList: [],
      officeList: []
    }
  },
  mounted() {
    const vm = this

    vm.getList()
    this.getListLen()
    this.setViewByQuery()
    this.editView()
    this.getgradeList()
    this.getclassList()
    this.getsubjectList()
    this.getofficeList()
    $Reader.createSocket()// 页面加载创建新的socket
    this.icTips()
    // console.log(this.onResult)
  },
  activated() {
    this.editView()
    this.getList()
    this.getListLen()
  },
  methods: {
    // 获取年级数据
    getgradeList() {
      const vm = this
      axios
        .post('/smartprint/print-room/grade/get-grades')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.gradeList = res.data.data.grades
        })
        .catch(err => err)
    },
    // 获取班级数据
    getclassList() {
      const vm = this
      axios
        .post('/smartprint/print-room/class/get-classes')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.classList = res.data.data.classes
        })
        .catch(err => err)
    },
    // 获取学科数据
    getsubjectList() {
      const vm = this
      axios
        .post('/smartprint/print-room/subject/get-subjects')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.subjectList = res.data.data.subjects
        })
        .catch(err => err)
    },
    // 获取科室数据
    getofficeList() {
      const vm = this
      axios
        .post('/smartprint/print-room/office/get-offices')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.officeList = res.data.data.offices
        })
        .catch(err => err)
    },
    // 获取列表数据
    getList() {
      const vm = this

      vm.listLoading = true
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;
      //   this.listLoading = false;
      // })
      axios
        .post(
          '/smartprint/print-room/staff/get-staffs',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.list = res.data.data.staffs
          console.log('列表数据：', vm.list)
          // vm.listQuery.currPage = data.data.currPage;
          // vm.listQuery.count = data.data.count;
          // vm.total = data.data.total;
        })
        .catch(err => err)
      // return
      // global.get(api.roleAndUser, { params: vm.listQuery }, res => {
      //   // console.log('-------获取到数据：',JSON.stringify(res) )
      //   const data = res.body;
      //   if (data.resultCode == 0) {
      //     vm.list = data.data.data;
      //     console.log('列表数据：', vm.list);
      //     vm.listQuery.currPage = data.data.currPage;
      //     vm.listQuery.count = data.data.count;
      //     vm.total = data.data.total;

      //     vm.listLoading = false;
      //   } else {
      //     // alert(res.body.resultMsg)
      //     Message({
      //       showClose: true,
      //       message: res.body.resultMsg,
      //       type: 'error'
      //     });
      //     vm.listLoading = false;
      //   }
      // }, res => {
      //   vm.listLoading = false;
      // }, false)
      vm.listLoading = false
    },
    // 获取列表数据总数
    getListLen() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      params.isSum = 1
      axios
        .post('/smartprint/print-room/staff/get-staffs', qs.stringify(params))
        .then(res => {
          this.total = res.data.data.sum.count
          console.log(this.total)
        })
        .catch(err => console.log(err))
    },
    // 根据当前路由参数切换视图
    setViewByQuery() {
      const { extra } = this.$route.query
      if (!extra) this.viewType = 0
      else this.viewType = extra
    },
    // 编辑回显
    editView() {
      const { id } = this.$route.query
      if (id) {
        axios
          .post(
            '/smartprint/print-room/staff/get-staff',
            qs.stringify({ staffId: id })
          )
          .then(res => {
            console.log(res)
            if (res.data.code !== 0) return this.$message.error(res.data.msg)
            this.roleTemp2 = res.data.data.staff
          })
          .catch(err => console.log(err))
      }
    },
    // 编辑
    handleEdit(index, { id }) {
      const vm = this
      console.log('编辑的row：', index, '-----', id)
      // 跳页面进行修改
      // this.$router.push('/example/form');
      this.$router.push({
        path: '/teacherManage/teacherManage',
        query: { extra: 'edit', id }
      }) // 带参跳转
      this.editView()
    },
    // 编辑上传
    onEditSubmit() {
      this.roleTemp2.staffId = this.roleTemp2.id
      this.roleTemp2.userPwd = this.userPwd ? md5(md5(this.userPwd)) : ''
      axios
        .post(
          '/smartprint/print-room/staff/update-staff',
          qs.stringify(this.roleTemp2)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('修改成功')
          this.editView()
        })
        .catch(err => err)
    },
    // 单个删除
    handleDelete(index, { id }) {
      const vm = this
      axios
        .post(
          '/smartprint/print-room/staff/delete-staff',
          qs.stringify({ staffId: id })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('删除成功')
          this.getListLen()
          // 前端删除。
          vm.list.splice(index, 1)
        })
        .then(err => err)
    },
    // 批量删除
    handleDelAll() {
      const vm = this
      console.log('批量删除选择的row：', vm.multipleSelection)
    },
    // 搜索
    handleFilter() {
      this.getList()
    },
    // 操作分页
    handleSizeChange(val) {
      this.listQuery.count = val

      this.getList()
    },
    // 操作分页
    handleCurrentChange(val) {
      console.log('--------', val)
      this.listQuery.currPage = val
      this.listQuery.start = this.listQuery.count * (val - 1) + 1

      this.getList()
    },
    // 新增
    handleCreate() {
      // this.dialogFormVisible = true;
      this.$router.push({
        path: '/teacherManage/teacherManage',
        query: { extra: 'add' }
      }) // 带参跳转
    },
    // 新增提交
    onAddSubmit() {
      const vm = this
      console.log('新增入参：', vm.roleTemp)
      this.roleTemp.userPwd = md5(md5(this.roleTemp.userPwd || 123456))
      axios
        .post(
          '/smartprint/print-room/staff/create-staff',
          qs.stringify(vm.roleTemp)
        )
        .then(res => {
          console.log(res.data.code)
          if (res.data.code !== 0) return vm.$message.error(res.data.msg)
          vm.$message.success('新增成功')
          for (const key in this.roleTemp) {
            this.roleTemp[key] = ''
          }
        })
        .catch(err => console.log(err))
    },
    subjectLabel(item) {
      const name = item.name || ''
      const type = this.typeOptions[item.type]
      return name + ' / ' + type
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleSearch() {
      this.getList()
      this.getListLen()
    },
    handleReset() {
      this.listQuery = {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      }
      this.handleSearch()
      this.receiveGroupCancle()
    },
    createICCard(index, { userId }) {
      this.active = 0
      this.tips = '' // 提示
      this.tfUID = '' // 卡号
      this.tfBlockData = '' // 读取的数据
      g_blockData = userId
      // this.dialogPermissionsVisible = true
      this.Connect()
      setTimeout(() => {
        this.WriteBlock()
      }, 200)
      setTimeout(() => {
        this.$message.info(this.tips)
      }, 400)
    },
    // ic卡返回提示
    icTips() {
      $Reader.onResult(rData => {
        switch (rData.strCmdCode) {
          case '0007': // Sys_Open
            if (rData.strStatus != '00') {
              // this.tips = 'Failed to connect device ! ' + 'Error code: 0x' + rData.strStatus;
              this.tips = 'Failed to connect device ! ' + 'Error code: 0x' + rData.strStatus;
            } else {
              g_isOpen = true;
              // this.tips = 'Reader connected successfully !';
              this.tips = 'Reader connected successfully !';
            }
            break;

          case '0009': // Sys_Close
            if (rData.strStatus != '00') {
              this.tips = 'Failed to disconnect device !';
            } else {
              this.tips = 'Reader disconnected successfully !';
            }
            break;

          case '0106': // Sys_SetBuzzer
            break;

          case '0105': // Sys_GetSnr
            if (rData.strStatus != '00') {
              this.tips = 'Sys_GetSnr faild !';
            } else {
              this.tips = rData.strData;
              this.tips = 'Get device serial number successfully !';
            }
            break;

          case '1001': // TyA_Request
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Request faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_findCard:
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                $Reader.send(g_device + '1002'); // TyA_Anticollision
                break;
            }

            break;

          case '1002': // TyA_Anticollision
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Anticollision faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_findCard:
                // document.getElementById('tfUID').value = rData.strData;
                this.tfUID = rData.strData;
                this.tips = 'Found card !';
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                $Reader.send(g_device + '1003' + rData.strData); // TyA_Select
                break;
            }

            break;

          case '1003': // TyA_Select
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Select faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                $Reader.send(g_device + '100A' + g_keyType + g_blockAddr + g_key); // TyA_CS_Authentication2
                break;
            }

            break;

          case '100A': // TyA_CS_Authentication2
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Authentication2 faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_read:
                $Reader.send(g_device + '100B' + g_blockAddr); // TyA_CS_Read
                break;

              case GFUNC.M1_write:
                $Reader.send(g_device + '100C' + g_blockAddr + g_blockData);
                break;

              case GFUNC.M1_initVal:
                $Reader.send(g_device + '100D' + g_blockAddr + g_value);
                break;

              case GFUNC.M1_readVal:
                $Reader.send(g_device + '100E' + g_blockAddr);
                break;

              case GFUNC.M1_decrement:
                $Reader.send(g_device + '100F' + g_blockAddr + g_value);
                break;

              case GFUNC.M1_increment:
                $Reader.send(g_device + '1010' + g_blockAddr + g_value);
                break;
            }

            break;

          case '100B': // TyA_CS_Read
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Read faild !';
            } else {
              // document.getElementById('tfBlockData').value = rData.strData;
              this.tfBlockData = rData.strData;
              this.tips = 'Read block successfully !';
            }
            break;

          case '100C': // TyA_CS_Write
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Write faild !';
            } else {
              // this.tips = 'Write block successfully !';
              this.tips = 'IC卡制作成功！';
            }
            break;

          case '100D': // TyA_CS_InitValue
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_InitValue faild !';
            } else {
              this.tips = 'Initialize the wallet value successfully !';
            }
            break;

          case '100E': // TyA_CS_ReadValue
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_ReadValue faild !';
            } else {
              let hexValue = rData.strData;
              hexValue = hexValue.substr(6, 2) + hexValue.substr(4, 2) + hexValue.substr(2, 2) + hexValue.substr(0, 2); // Reverse sorting of high and low bytes (高低字节反过来排序)
              const decValue = parseInt(hexValue, 16); // Convert hexadecimal string to decimal string (十六进制字符串转换为十进制字符串)
              document.getElementById('tfValue').value = decValue; // Show wallet balance (显示电子钱包余额)
              this.tips = 'Read value successfully !';
            }
            break;

          case '100F': // TyA_CS_Decrement
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Decrement faild !';
            } else {
              this.tips = 'Decrement value successfully !';
            }
            break;

          case '1010': // TyA_CS_Increment
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Increment faild !';
            } else {
              this.tips = 'Increment value successfully !';
            }
            break;
        }
      }
      )
    },
    next() {
      if (this.active == 0) { // 连接设备
        this.Connect()
      }
      if (this.active == 1) { // 读取设备卡号
        this.getCardId()
      }
      if (this.active == 2) { // 读取卡内数据
        // this.getCardId()
        // setTimeout(this.ReadBlock(), 1000)
        this.ReadBlock()
      }
      if (this.active == 3) { // 写入数据
        // this.getCardId()
        this.WriteBlock()
      }
      this.active += 1
      // if (this.active++ > 2) this.active = 0;
    },
    // 导入模板
    handleImport() {
      // 创建一个input标签
      const vinput = document.createElement('input')
      vinput.setAttribute('type', 'file')
      vinput.setAttribute('id', 'data-upload')
      vinput.style.display = 'none'
      // 防止反复添加
      if (document.getElementById('data-upload')) document.body.removeChild(document.getElementById('data-upload'))

      document.body.appendChild(vinput)
      vinput.click()
      // 上传
      vinput.onchange = async () => {
        const formData = new window.FormData()
        console.log(vinput.files[0])

        formData.append('file', vinput.files[0])
        axios({ method: 'post', url: '/smartprint/upload-file', data: formData, headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          const url = res.data.data.url
          console.log(url)

          axios.post('/smartprint/print-room/staff/import-staffs-from-excel', qs.stringify({ url }))
            .then(res2 => {
              if (res2.data.code !== 0) return this.$message.error(res2.data.msg)
              this.getList()
            })
            .catch(err => err)
        })
      }
    },
    handleDowload() {
      const a = document.createElement('a')
      a.href = './staffs.xlsx'

      a.download = 'staffs'

      console.log(a)
      a.click()
    },
    /**
  * Turn on the green light
  * (亮绿灯)
  **/
    LedGreen() {
      $Reader.send(g_device + '0107' + '02');
    },

    /**
     * Turn on the red light
     * (亮红灯)
    **/
    LedRed() {
      $Reader.send(g_device + '0107' + '01');
    },
    /**
     * 连接设备
     *
     * **/
    Connect() {
      $Reader.send(g_device + '0007' + '00'); // Open the USB device with index number 0. (打开索引号为0的USB设备)
      $Reader.send(g_device + '0109' + '41'); // Set to ISO14443a working mode. (设置为ISO14443A工作模式)
      $Reader.send(g_device + '0108' + '01'); // Turn on the $Reader antenna. (打开读卡器天线)
      this.LedGreen();
      setTimeout(this.LedRed(), 200);
      // $Reader.send(g_device + '0106' + '10'); // Beeps. (蜂鸣提示)
    },
    /**
     * 获取卡号
     *
     * **/
    getCardId() {
      // Check whether the reader is opened or not.
      if (g_isOpen != true) {
        this.tips = 'Please connect the device first !';
        return;
      }
      // Clear UID edit box
      this.tfUID = '';

      // Start read UID
      $Reader.send(g_device + '1001' + '52'); // TyA_Request
      g_wantFunc = GFUNC.M1_findCard;
    },

    /**
     * Read a block of M1 card
     * (读M1卡的一个块)
    **/
    ReadBlock() {
      // Check whether the reader is opened or not.
      if (g_isOpen != true) {
        this.tips = 'Please connect the device first !';
        return;
      }

      // Clear block data
      this.tfBlockData = '';

      // Get block address
      // g_blockAddr = document.getElementById('tfBlock').value;
      if (g_blockAddr == '') {
        this.tips = 'Please enter  block address !';
        return;
      }
      g_blockAddr = this.DecStrToHexStr(g_blockAddr, 2);

      // Get key
      if (g_key.length != 12) {
        this.tips = 'Please enter a 12-digit key !';
        return;
      }

      // Get key type
      // if (rbKeyA.checked) {
      //   g_keyType = '60';
      // } else {
      //   g_keyType = '61';
      // }

      // Start read block
      $Reader.send(g_device + '1001' + '52'); // TyA_Request
      g_wantFunc = GFUNC.M1_read;
    },
    /**
  * Read a block of M1 card
  * (写入M1卡的一个块)
  **/
    WriteBlock() {
      // Check whether the reader is opened or not.
      if (g_isOpen != true) {
        this.tips = 'Please connect the device first !';
        return;
      }

      // Get block address
      // g_blockAddr = document.getElementById('tfBlock').value;
      if (g_blockAddr == '') {
        this.tips = 'Please enter  block address !';
        return;
      }
      g_blockAddr = this.DecStrToHexStr(g_blockAddr, 2);

      // Get key
      // g_key = document.getElementById('tfKey').value;
      if (g_key.length != 12) {
        this.tips = 'Please enter a 12-digit key !';
        return;
      }

      // Get key type
      // if (rbKeyA.checked) {
      //   g_keyType = '60';
      // } else {
      //   g_keyType = '61';
      // }

      // Get block data
      // g_blockData = document.getElementById('tfBlockData').value;
      // 即将写入的userId
      g_blockData = this.resetUserIdTo32(g_blockData)
      if (g_blockData.length != 32) {
        this.tips = 'Please enter a 32-digit block data !';
        return;
      }

      // Start write block
      $Reader.send(g_device + '1001' + '52'); // TyA_Request
      g_wantFunc = GFUNC.M1_write;
    },
    /**
    * Function：Converts a decimal string to a hexadecimal string with a specified number of digits.
             (十进制字符串转换为指定位数的十六进制字符串)
    * Parameter：decimalStr [IN] Decimal string. (十进制字符串)
    *            length [IN] Specifies the number of digits to convert to hexadecimal. (指定要转换成十六进制的位数)
    * Return：Hexadecimal string. (十六进制字符串)
    **/
    DecStrToHexStr(decimalStr, length) {
      const num = Number(decimalStr);
      const str = (Array(length).join('0') + num.toString(16)).slice(-length);
      return str;
    },

    /*
      写入的userID 32位  不够前边补0
    */
    resetUserIdTo32(userId) {
      userId = userId + ''
      const len = 32
      const ulen = userId.length
      for (let i = ulen; i < len; i++) {
        // userId += 0
        userId = 0 + userId
      }
      return userId
    }
  }
}
</script>
