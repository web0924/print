<template>
  <div class="app-container">
    <div v-show="viewType===0"
         style="padding-bottom:30px">
      <div style="height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">班级列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-input @keyup.enter.native="handleSearch"
                    size="small"
                    style="width: 240px;"
                    class="filter-item"
                    placeholder="输入关键字搜索"
                    v-model="listQuery.kw">
          </el-input>
          <el-select clearable
                     class="filter-item"
                     style="width: 240px"
                     v-model="listQuery.gradeId"
                     size="small"
                     placeholder="选择年级">
            <el-option v-for="item in  gradeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable
                     class="filter-item"
                     style="width: 240px"
                     v-model="listQuery.type"
                     size="small"
                     placeholder="选择类型">
            <el-option v-for="item in  typeOptions"
                       :key="item.key"
                       :label="item.name"
                       :value="item.key">
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
                     style="position:absolute;right:350px;background:#000"
                     type="primary"
                     @click="handleCreate"
                     size="small"
                     icon="edit">添加班级</el-button>
          <el-button class="filter-item"
                     style="position:absolute;right:180px;background:#000"
                     type="primary"
                     @click="handleCreateGroup"
                     size="small"
                     icon="edit">批量添加班级</el-button>
          <el-button class="filter-item"
                     style="position:absolute;right:40px;background:#000"
                     type="primary"
                     @click="handleDeleteGroup"
                     size="small"
                     icon="edit">批量删除班级</el-button>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>

      <!-- 表格 -->
      <el-table :data="list"
                v-loading.body="listLoading"
                element-loading-text=""
                @sort-change="tableSortChange"
                @selection-change="selectionTableChange"
                border
                fit
                highlight-current-row>

        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column align="center"
                         label='序号'
                         width="100">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="年级"
                         width="">
          <template slot-scope="scope">
            {{scope.row.gradeName}}
          </template>
        </el-table-column>
        <el-table-column label="班级"
                         width="">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="人数"
                         width="">
          <template slot-scope="scope">
            {{scope.row.studentsCount}}
          </template>
        </el-table-column>
        <el-table-column label="类型"
                         width="">
          <template slot-scope="scope">
            {{scope.row.type?typeOptions.filter(item=>item.key==scope.row.type)[0].name:''  }}
          </template>
        </el-table-column>
        <el-table-column label="排序"
                         prop="num"
                         sortable="custom"
                         width="">
          <template slot-scope="scope">
            <el-input @change="sortIptChange(scope.row)"
                      v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">

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
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加班级</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="70px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="班级名称">
            <el-input v-model="roleTemp.name"></el-input>
          </el-form-item>
          <el-form-item label="班级人数">
            <el-input v-model="roleTemp.studentsCount"></el-input>
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
          <el-form-item label="班级类型">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.type">
              <el-option v-for="item in  typeOptions"
                         :key="item.key"
                         :label="item.name"
                         :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onAddSubmit">上传</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div v-show="viewType==='groupAdd'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>批量添加班级</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="70px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="所属年级">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp3.gradeId">
              <el-option v-for="item in  gradeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级类型">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp3.type">
              <el-option v-for="item in  typeOptions"
                         :key="item.key"
                         :label="item.name"
                         :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始序号">
            <el-input v-model="roleTemp3.start"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="roleTemp3.count"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onAddGroupSubmit">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="viewType==='edit'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">班级列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑班级</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="70px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="班级名称">
            <el-input v-model="roleTemp2.name"></el-input>
          </el-form-item>
          <el-form-item label="班级人数">
            <el-input v-model="roleTemp2.studentsCount"></el-input>
          </el-form-item>
          <el-form-item label="所属年级">
            <el-select disabled
                       clearable
                       class="filter-item"
                       v-model="roleTemp2.gradeId">
              <el-option v-for="item in  gradeList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级类型">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp2.type">
              <el-option v-for="item in  typeOptions"
                         :key="item.key"
                         :label="item.name"
                         :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加学生">
            <div style="cursor:auto">
              <el-button @click="dialogAddStudentVisible=true">选择学生</el-button>
              <span>当前已添加 {{multipleSelectionByAdd.length}} 个学生</span>
            </div>
            <div v-show="multipleSelectionByAdd.length>0"
                 class="class-table-box">
              <div class="class-table-th">
                <span>学生姓名</span>
                <span>账号</span>
                <span>手机号</span>
                <span>操作</span>
              </div>
              <div class="class-table-td"
                   v-for="(item,index) in multipleSelectionByAdd"
                   :key="item.id">
                <span>{{item.userName}}</span>
                <span>{{item.userAccount}}</span>
                <span>{{item.userPhone}}</span>
                <el-button @click="deleteStudent(index)"
                           type="text">移除</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="添加学科">
            <div style="cursor:auto">
              <el-button @click="dialogAddSubjectVisible=true">选择学科</el-button>
              <span>当前已添加 {{multipleSelectionBySubject.length}} 个学科</span>
            </div>
            <div v-show="multipleSelectionBySubject.length>0"
                 class="class-table-box">
              <div class="class-table-th">
                <span>学科名称</span>
                <!-- <span>学科类型</span> -->
                <span>操作</span>
              </div>
              <div class="class-table-td"
                   v-for="(item,index) in multipleSelectionBySubject"
                   :key="item.id">
                <span>{{item.name}}</span>
                <!-- <span>{{item.type}}</span> -->
                <el-button @click="deleteSubject(index)"
                           type="text">移除</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onEditSubmit">上传</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>

    <!-- 选择学生 -->
    <el-dialog title="选择您需要添加的学生"
               :visible.sync="dialogAddStudentVisible">
      <el-input style="width: 240px;"
                class="filter-item"
                placeholder="输入关键字搜索"
                v-model="studentlistQuery.kw" />

      <el-button class="filter-item"
                 type="primary"
                 @click="handleSearchStudent"
                 size="small"
                 icon="edit">搜索</el-button>
      <!-- 表格 -->
      <el-table row-key="id"
                style="margin-top:20px"
                ref="studentTable"
                @selection-change="(val)=>{this.multipleSelectionByAddSouce=val}"
                :data="studentList"
                v-loading.body="listLoading"
                element-loading-text=""
                border
                fit
                highlight-current-row>
        <el-table-column :reserve-selection="true"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="学生名称"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="账号"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userAccount}}
          </template>
        </el-table-column>
        <el-table-column label="手机号"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userPhone}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleStudentSizeChange"
                       @current-change="handleStudentCurrentChange"
                       :current-page.sync="studentlistQuery.currPage"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="studentlistQuery.count"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddStudentVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="setStudentAddSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择学科 -->
    <el-dialog title="选择您需要添加的学科"
               :visible.sync="dialogAddSubjectVisible">
      <el-input style="width: 240px;"
                class="filter-item"
                placeholder="输入关键字搜索"
                v-model="subjectlistQuery.kw">
      </el-input>
      <el-button class="filter-item"
                 type="primary"
                 @click="handleSearchStudent"
                 size="small"
                 icon="edit">搜索</el-button>
      <!-- 表格 -->
      <el-table row-key="id"
                style="margin-top:20px"
                ref="subjectTable"
                @selection-change="(val)=> this.multipleSelectionBySubjectSouce = val"
                :data="subjectList"
                v-loading.body="listLoading"
                element-loading-text=""
                border
                fit
                highlight-current-row>
        <el-table-column :reserve-selection="true"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="学科名称"
                         width="">
          <template slot-scope="scope">
            {{subjectLabel(scope.row)}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSubjectSizeChange"
                       @current-change="handleSubjectCurrentChange"
                       :current-page.sync="studentlistQuery.currPage"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="studentlistQuery.count"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddSubjectVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="setSubjectAddSubmit">确 定</el-button>
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

import store from '@/store'

export default {
  data() {
    return {
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
        kw: '',
        type: null // 类型
      },
      roleTemp: {
        name: ''
      },
      roleTemp2: {
        name: ''
      },
      roleTemp3: {},
      ruleForm: {
        permissions: []
      },
      typeOptions: [
        { key: 'WenKe', name: '文科' },
        { key: 'LiKe', name: '理科' },
        { key: 'Common', name: '公共' }
      ],
      dialogFormVisible: false,
      dialogPermissionsVisible: false,
      multipleSelection: [],

      viewType: 0, // 0 | add | edit | groupAdd
      gradeList: [],
      studentList: [],
      subjectList: [],

      deleteStudentIds: [],
      dialogAddStudentVisible: false,
      multipleSelectionByAdd: [],
      multipleSelectionByAddSouce: [],
      studentlistQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },


      deleteSubjectIds: [],
      dialogAddSubjectVisible: false,
      multipleSelectionBySubjectSouce: [],
      multipleSelectionBySubject: [],
      subjectlistQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },
      receiveGroupData: []
    }
  },
  activated() {
    this.editView()
    this.getList()
    this.getListLen()
  },
  mounted() {
    const vm = this

    vm.getList()
    this.getListLen()
    this.setViewByQuery()
    this.editView()
    this.getGradeList()
    this.getStudentList()
    this.getSubjectList()
  },

  methods: {
    // 获取年级数据
    getGradeList() {
      const vm = this
      axios
        .post(
          '/smartprint/print-room/grade/get-grades',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.gradeList = res.data.data.grades
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取学生数据
    getStudentList(query = {}) {
      const vm = this
      axios
        .post(
          '/smartprint/print-room/student/get-students',
          qs.stringify(query)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.studentList = res.data.data.students
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取学科数据
    getSubjectList(query = {}) {
      const vm = this
      axios
        .post(
          '/smartprint/print-room/subject/get-subjects',
          qs.stringify(query)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.subjectList = res.data.data.subjects
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取列表数据
    getList() {
      const vm = this

      vm.listLoading = true
      axios
        .post(
          '/smartprint/print-room/class/get-classes',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.list = res.data.data.classes
          console.log('列表数据：', vm.list)
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取列表数据总数
    getListLen() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      params.isSum = 1
      params.start = 1
      axios
        .post('/smartprint/print-room/class/get-classes', qs.stringify(params))
        .then(res => {
          this.total = res.data.data.sum.count
          console.log(this.total)
        })
        .catch(err => console.log(err))
    },
    // 排序
    sortIptChange(row) {
      axios.post(
        '/smartprint/print-room/class/update-class',
        qs.stringify({ classId: row.id, num: row.num })
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.getList()
      })
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
            '/smartprint/print-room/class/get-class',
            qs.stringify({ classId: id })
          )
          .then(res => {
            console.log(res)
            if (res.data.code !== 0) return this.$message.error(res.data.msg)
            this.roleTemp2 = res.data.data.class
            const { students, subjects } = res.data.data.class
            console.log(res.data.data)
            this.multipleSelectionByAdd = students || []
            this.multipleSelectionBySubject = subjects || []
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
        path: '/classRoomManage/permissionsManage',
        query: { extra: 'edit', id }
      }) // 带参跳转
      this.editView()
    },
    // table排序
    tableSortChange(column) {
      const sortMap = {
        ascending: 'asc',
        descending: 'desc'
      }
      if (column.order) {
        this.listQuery.sorts = column.prop
        this.listQuery.orders = sortMap[column.order]
      } else {
        this.listQuery.orders = this.listQuery.sorts = ''
      }

      this.listQuery.currPage = this.listQuery.start = 1
      this.getList()
    },
    // 编辑上传
    onEditSubmit() {
      this.setStudent()
      this.setSubject()
      this.roleTemp2.classId = this.roleTemp2.id
      axios
        .post(
          '/smartprint/print-room/class/update-class',
          qs.stringify(this.roleTemp2)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('修改成功')
        })
        .catch(err => err)
    },
    // 单个删除
    handleDelete(index, { id }) {
      const vm = this
      console.log('单个删除选择的row：', index, '-----', id)
      axios
        .post(
          '/smartprint/print-room/class/delete-class',
          qs.stringify({ classId: id })
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
    // 批量勾选
    selectionTableChange(rows) {
      this.receiveGroupData = rows
    },
    // 批量删除
    handleDeleteGroup() {
      if (this.receiveGroupData.length < 1) return this.$message.warning('请勾选')
      const _this = this
      const classIds = this.receiveGroupData.map(item => item.id).join(',')
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post(
          '/smartprint/print-room/class/delete-classes',
          qs.stringify({ classIds })
        ).then(res => {
          if (res.data.code !== 0) return _this.$message.error(res.data.msg)
          _this.$message.success('删除成功')
          // 前端更新
          _this.receiveGroupData.forEach((item, index) => {
            _this.list.forEach((ditem, dindex) => {
              if (ditem.id == item.id) _this.list.splice(dindex, 1)
            })
          })
        }).catch(err => err)
      }).catch(() => this.$message.info('已取消删除'));
    },
    // 学科类型
    subjectLabel(item) {
      const name = item.name || ''
      const type = this.typeOptions[item.type] ? this.typeOptions[item.type] + ' / ' : ''
      return name + type
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
    // 学生分页
    handleStudentSizeChange(val) {
      this.studentlistQuery.count = val
    },
    // 学科分页
    handleSubjectSizeChange(val) {
      this.subjectlistQuery.count = val
    },
    // 操作分页
    handleCurrentChange(val) {
      this.listQuery.currPage = val
      this.listQuery.start = this.listQuery.count * (val - 1) + 1

      this.getList()
    },
    handleSubjectCurrentChange(val) {
      this.subjectlistQuery.currPage = val
      this.subjectlistQuery.start = this.subjectlistQuery.count * (val - 1) + 1
      this.getSubjectList(this.subjectlistQuery)
    },
    handleStudentCurrentChange(val) {
      this.studentlistQuery.currPage = val
      this.studentlistQuery.start = this.studentlistQuery.count * (val - 1) + 1
      this.getStudentList(this.studentlistQuery)
    },
    // 新增
    handleCreate() {
      this.$router.push({
        path: '/classRoomManage/permissionsManage',
        query: { extra: 'add' }
      }) // 带参跳转
    },
    // 批量新增
    handleCreateGroup() {
      this.$router.push({
        path: '/classRoomManage/permissionsManage',
        query: { extra: 'groupAdd' }
      }) // 带参跳转
    },
    handleSearchStudent() {
      this.getStudentList(this.studentlistQuery)
    },
    handleSearchSubject() {
      this.getSubjectList(this.subjectlistQuery)
    },
    // 添加学生提交
    setStudentAddSubmit() {
      this.multipleSelectionByAdd = this.multipleSelectionByAddSouce
      console.log(this.multipleSelectionByAdd)
      console.log(this.multipleSelectionByAddSouce)
      this.dialogAddStudentVisible = false
    },
    // 添加学科提交
    setSubjectAddSubmit() {
      this.multipleSelectionBySubject = this.multipleSelectionBySubjectSouce
      this.dialogAddSubjectVisible = false
    },
    // 设置学生
    setStudent() {
      const params = {
        classId: this.roleTemp2.id,
        studentIds: this.multipleSelectionByAdd.map(item => item.id).join(','),
        deleteStudentIds: this.deleteStudentIds.join(',')
      }
      axios
        .post(
          '/smartprint/print-room/class/set-students',
          qs.stringify(params)
        ).then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
        }).catch(err => err)
    },
    // 设置学科
    setSubject() {
      const params = {
        classId: this.roleTemp2.id,
        subjectIds: this.multipleSelectionBySubject.map(item => item.id).join(','),
        deleteSubjectIds: this.deleteSubjectIds.join(',')
      }
      axios
        .post(
          '/smartprint/print-room/class/set-subjects',
          qs.stringify(params)
        ).then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
        }).catch(err => err)
    },
    // 新增提交
    onAddSubmit() {
      axios
        .post(
          '/smartprint/print-room/class/create-class',
          qs.stringify(this.roleTemp)
        )
        .then(res => {
          console.log(res.data.code)
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('新增成功')
          for (const key in this.roleTemp) {
            this.roleTemp[key] = ''
          }
        })
        .catch(err => console.log(err))
    },
    // 新增批量提交
    onAddGroupSubmit() {
      axios
        .post(
          '/smartprint/print-room/class/create-classes',
          qs.stringify(this.roleTemp3)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('批量新增成功')
          for (const key in this.roleTemp3) {
            this.roleTemp3[key] = ''
          }
        })
        .catch(err => console.log(err))
    },
    // 删除学生
    deleteStudent(index) {
      this.deleteStudentIds.push(this.multipleSelectionByAdd[index].id)
      this.multipleSelectionByAdd.splice(index, 1)

      if (this.$refs.studentTable) {
        this.$refs.studentTable.toggleRowSelection(this.multipleSelectionByAdd[index], false);
      }
      this.multipleSelectionByAdd.splice(index, 1)
      this.$forceUpdate()
    },
    // 删除学科
    deleteSubject(index) {
      this.deleteSubjectIds.push(this.multipleSelectionBySubject[index].id)

      if (this.$refs.subjectTable) {
        this.$refs.subjectTable.toggleRowSelection(this.multipleSelectionBySubject[index], false);
      }
      this.multipleSelectionBySubject.splice(index, 1)

      this.$forceUpdate()
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
        kw: '',
        type: null // 类型
      }
      this.getList()
      this.getListLen()
    }
  }
}
</script>

<style lang="scss" scoped>
.class-table-box {
  min-width: 500px;
  min-height: 50px;
  margin-top: 30px;
}
.class-table-th {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #f6f8f9;
  padding: 0 50px;
  border: 1px solid #cccccc;
}
.class-table-td {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* background: #f6f8f9; */
  padding: 0 50px;
  border: 1px solid #cccccc;
  border-top: none;
}
</style>
