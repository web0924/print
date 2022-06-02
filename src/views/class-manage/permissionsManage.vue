<template>
  <div class="app-container">
    <div v-show="viewType===0"
         style="padding-bottom:30px">
      <div style="height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classManage/permissionsManage' }">年级列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索条件 -->
        <div class="filter-container">
          <!-- <el-select clearable
                     class="filter-item"
                     style="width: 280px"
                     v-model="listQuery.kw"
                     size="small"
                     placeholder="按年级名称筛选">
            <el-option v-for="item in  list"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select> -->
          <el-input @keyup.enter.native="handleSearch"
                    size="small"
                    style="width: 280px;"
                    class="filter-item"
                    placeholder="输入关键字搜索"
                    v-model="listQuery.kw">
          </el-input>
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
                     icon="edit">添加年级</el-button>
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

        <el-table-column label="年级名称"
                         width="">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="班级数量"
                         width="">
          <template slot-scope="scope">
            {{scope.row.classesCount}}
          </template>
        </el-table-column>

        <!-- <el-table-column label="年级名称"
                         width="100">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.userName  }} &nbsp; &nbsp;</span>
            </template>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="班级数量"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column> -->

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
            <el-breadcrumb-item :to="{ path: '/classManage/permissionsManage' }">年级列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加年级</el-breadcrumb-item>
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

          <el-form-item label="年级名称">
            <el-input v-model="roleTemp.name"></el-input>
          </el-form-item>

          <!-- <el-form-item label="年级层次">
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
            <el-breadcrumb-item :to="{ path: '/classManage/permissionsManage' }">年级列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑年级</el-breadcrumb-item>
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

          <el-form-item label="年级名称">
            <el-input v-model="roleTemp2.name"></el-input>
          </el-form-item>
          <!-- 
          <el-form-item label="年级层次">
            <el-input v-model="roleTemp2.remark"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-input v-model="roleTemp2.remark"></el-input>
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
import { global } from 'src/global/global';
import { api } from 'src/global/api';
import axios from 'axios'
import qs from 'qs'

import store from '@/store';

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
        kw: ''

      },
      roleTemp: {
        name: ''
        // remark: ''

      },
      roleTemp2: {
        name: ''
      },
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

      viewType: 0 // 0 | add | edit

    }
  },
  mounted() {
    const vm = this;

    vm.getList();
    this.getListLen()
    this.setViewByQuery()
    this.editView()
  },
  methods: {
    // 获取列表数据
    getList() {
      const vm = this;

      vm.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;
      //   this.listLoading = false;
      // })
      axios.post('/smartprint/print-room/grade/get-grades', qs.stringify(vm.listQuery))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.list = res.data.data.grades;
          console.log('列表数据：', vm.list);
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
      vm.listLoading = false;
    },
    // 获取列表数据总数
    getListLen() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      params.isSum = 1
      axios.post('/smartprint/print-room/grade/get-grades', qs.stringify(params)).then(res => {
        this.total = res.data.data.sum.count
        console.log(this.total)
      }).catch(err => console.log(err))
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
        axios.post('/smartprint/print-room/grade/get-grade', qs.stringify({ gradeId: id })).then(res => {
          console.log(res)
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.roleTemp2 = res.data.data.grade
        }).catch(err => console.log(err))
      }
    },
    // 编辑
    handleEdit(index, { id }) {
      const vm = this;
      console.log('编辑的row：', index, '-----', id);
      // 跳页面进行修改
      // this.$router.push('/example/form');
      this.$router.push({ path: '/classManage/permissionsManage', query: { extra: 'edit', id } }); // 带参跳转
    },
    // 编辑上传
    onEditSubmit() {
      this.roleTemp2.gradeId = this.roleTemp2.id
      axios.post('/smartprint/print-room/grade/update-grade', qs.stringify(this.roleTemp2)).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.$message.success('修改成功')
      }).catch(err => err)
    },
    // 单个删除
    handleDelete(index, { id }) {
      const vm = this;
      console.log('单个删除选择的row：', index, '-----', id);
      axios.post('/smartprint/print-room/grade/delete-grade', qs.stringify({ gradeId: id })).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.$message.success('删除成功')
        // 前端删除。
        vm.list.splice(index, 1)
      }).then(err => err)
    },
    // 批量删除
    handleDelAll() {
      const vm = this;
      console.log('批量删除选择的row：', vm.multipleSelection)
    },
    // 搜索
    handleFilter() {
      this.getList();
    },
    // 操作分页
    handleSizeChange(val) {
      this.listQuery.count = val;

      this.getList();
    },
    // 操作分页
    handleCurrentChange(val) {
      console.log('--------', val)
      this.listQuery.currPage = val;
      this.listQuery.start = this.listQuery.count * (val - 1) + 1;


      this.getList();
    },
    // 新增
    handleCreate() {
      // this.dialogFormVisible = true;
      this.$router.push({ path: '/classManage/permissionsManage', query: { extra: 'add' } }); // 带参跳转
    },
    // 设置权限
    setPermissions(index, item) {
      const vm = this;
      global.get(api.getMenuAndElement, { params: { roleId: item.smRoleBeanDto.id } }, res => {
        console.log('-------获取到数据：', JSON.stringify(res))
        const data = res.body;
        if (data.resultCode == 0) {
          vm.smMenuBeanDtoList = data.data.smMenuBeanDtoList;
          console.log('列表数据：', vm.smMenuBeanDtoList);
        } else {
          // alert(res.body.resultMsg)
          Message({
            showClose: true,
            message: res.body.resultMsg,
            type: 'error'
          });
        }

        vm.dialogPermissionsVisible = true;
      }, res => {
        vm.dialogPermissionsVisible = true;
      }, true)
    },
    // 设置权限提交
    setPermissionsSubmit() {
      const vm = this;

      console.log(JSON.stringify(vm.smMenuBeanDtoList));


      vm.$message({
        showClose: true,
        message: '动态修改权限成功！实际开发请把参数提交给后端接口！',
        type: 'success'
      });
    },
    // 新增提交
    onAddSubmit() {
      const vm = this;
      console.log('新增入参：', vm.roleTemp)
      axios.post('/smartprint/print-room/grade/create-grade', qs.stringify(vm.roleTemp)).then(res => {
        console.log(res.data.code)
        if (res.data.code !== 0) return vm.$message.error(res.data.msg)
        vm.$message.success('新增成功')
        for (const key in this.roleTemp) {
          this.roleTemp[key] = ''
        }
      }).catch(err => console.log(err))
    },
    setUser() {
      const vm = this;

      vm.$message({
        showClose: true,
        message: '设置成员未完成，逻辑参照设置权限即可！',
        type: 'warning'
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleDownload() {
      const vm = this;

      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5'];
        const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'isavailable'];
        const list = vm.list;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '导出的列表excel');
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
      this.getList()
      this.getListLen()
    }
  }
};
</script>
