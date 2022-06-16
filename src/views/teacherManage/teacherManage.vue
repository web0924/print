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
                     @click="setPermissions(scope.$index, scope.row)">设置权限</el-button>
          <el-button icon="edit"
                     size="small"
                     @click="setUser(scope.$index, scope.row)">设置成员</el-button> -->
            <el-button icon="edit"
                       size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button icon="delete"
                       size="small"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>

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
            <el-input v-model="roleTemp.userPwd"></el-input>
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
                         :label="item.name"
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

    <!-- 设置权限 -->
    <el-dialog title="设置权限"
               :visible.sync="dialogPermissionsVisible">
      <el-form class="small-space"
               :model="roleTemp"
               label-position="left"
               label-width="70px"
               style='width: 100%; '>

        <!-- <el-checkbox-group v-model="smMenuBeanDtoList"> -->
        <el-checkbox v-for="item in smMenuBeanDtoList"
                     :key="item"
                     label="item.url"
                     name="type"
                     style="margin:0 15px 15px 0;"
                     v-model="item.set">{{ item.menuName }}</el-checkbox>

        <!-- </el-checkbox-group> -->

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPermissionsVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="setPermissionsSubmit">确 定</el-button>
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

export default {
  data() {
    return {
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
      typeOptions: [
        { key: '001', display_name: '类型1' },
        { key: '002', display_name: '类型2' },
        { key: '003', display_name: '类型3' }
      ],
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
    // 设置权限
    setPermissions(index, item) {
      const vm = this
      global.get(
        api.getMenuAndElement,
        { params: { roleId: item.smRoleBeanDto.id } },
        res => {
          console.log('-------获取到数据：', JSON.stringify(res))
          const data = res.body
          if (data.resultCode == 0) {
            vm.smMenuBeanDtoList = data.data.smMenuBeanDtoList
            console.log('列表数据：', vm.smMenuBeanDtoList)
          } else {
            // alert(res.body.resultMsg)
            Message({
              showClose: true,
              message: res.body.resultMsg,
              type: 'error'
            })
          }

          vm.dialogPermissionsVisible = true
        },
        res => {
          vm.dialogPermissionsVisible = true
        },
        true
      )
    },
    // 设置权限提交
    setPermissionsSubmit() {
      const vm = this

      console.log(JSON.stringify(vm.smMenuBeanDtoList))

      vm.$message({
        showClose: true,
        message: '动态修改权限成功！实际开发请把参数提交给后端接口！',
        type: 'success'
      })
    },
    // 新增提交
    onAddSubmit() {
      const vm = this
      console.log('新增入参：', vm.roleTemp)
      this.roleTemp.userPwd = md5(md5(this.roleTemp.userPwd))
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
    setUser() {
      const vm = this

      vm.$message({
        showClose: true,
        message: '设置成员未完成，逻辑参照设置权限即可！',
        type: 'warning'
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleDownload() {
      const vm = this

      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel')
        const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5']
        const filterVal = [
          'chnlId',
          'hisChnlId',
          'chnlName',
          'state',
          'isavailable'
        ]
        const list = vm.list
        const data = vm.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '导出的列表excel')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
    }
  }
}
</script>
