<template>
  <div class="app-container">
    <div v-show="viewType===0">
      <div style="height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">教师列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索条件 -->
        <div class="filter-container">

          <el-input @keyup.enter.native="handleFilter"
                    size="small"
                    style="width: 280px;"
                    class="filter-item"
                    placeholder="关键字"
                    v-model="listQuery.title">
          </el-input>
          <el-select clearable
                     class="filter-item"
                     style="width: 280px"
                     v-model="listQuery.type"
                     size="small"
                     placeholder="选择年级">
            <el-option v-for="item in  typeOptions"
                       :key="item.key"
                       :label="item.display_name+'('+item.key+')'"
                       :value="item.key">
            </el-option>
          </el-select>
          <el-select clearable
                     class="filter-item"
                     style="width: 280px"
                     v-model="listQuery.type"
                     size="small"
                     placeholder="选择班级">
            <el-option v-for="item in  typeOptions"
                       :key="item.key"
                       :label="item.display_name+'('+item.key+')'"
                       :value="item.key">
            </el-option>
          </el-select>
          <el-button class="filter-item"
                     type="primary"
                     @click="handleCreate"
                     size="small"
                     icon="edit">搜索</el-button>
          <el-button class="filter-item"
                     style="position:absolute;right:40px;background:#000"
                     type="primary"
                     @click="handleCreate"
                     size="small"
                     icon="edit">添加教师</el-button>
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
            {{scope.$index}}
          </template>
        </el-table-column>

        <el-table-column label="教师名称"
                         width="">
          <template slot-scope="scope">
            {{scope.row.smRoleBeanDto.roleName}}
          </template>
        </el-table-column>

        <el-table-column label="联系电话"
                         width="100">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.userName  }} &nbsp; &nbsp;</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="所属学科"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column>
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
                       type="text"
                       @click="handleEdit(scope.$index,
                       scope.row)">编辑</el-button>
            <el-button icon="delete"
                       size="small"
                       type="text"
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
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-show="viewType==='add'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">教师列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">添加教师</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:20px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="100px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="教师名称：">
            <el-input placeholder="请输入"
                      v-model="roleTemp.roleName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input placeholder="请输入"
                      v-model="roleTemp.roleName"></el-input>
          </el-form-item>
          <el-form-item label="所属学科：">
            <el-input placeholder="请输入"
                      v-model="roleTemp.roleName"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">上传</el-button>

          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="viewType==='edit'">

    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="表单新增"
               :visible.sync="dialogFormVisible">
      <el-form class="small-space"
               :model="roleTemp"
               label-position="left"
               label-width="70px"
               style='width: 400px; margin-left:50px;'>

        <el-form-item label="角色名称">
          <el-input v-model="roleTemp.roleName"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="roleTemp.remark"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="handleCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>

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

import store from '@/store';

export default {
  data() {
    return {
      // list: null,
      // listLoading: true,

      list: null, // 表格list
      smMenuBeanDtoList: null, // 菜单
      total: null,
      // listLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 10,

        // importance: undefined,
        title: '',
        type: null // 类型

      },
      roleTemp: {
        roleName: '',
        remark: ''

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
    this.setViewByQuery()
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
      global.get(api.roleAndUser, { params: vm.listQuery }, res => {
        // console.log('-------获取到数据：',JSON.stringify(res) )
        const data = res.body;
        if (data.resultCode == 0) {
          vm.list = data.data.data;
          console.log('列表数据：', vm.list);
          vm.listQuery.currPage = data.data.currPage;
          vm.listQuery.pageSize = data.data.pageSize;
          vm.total = data.data.total;

          vm.listLoading = false;
        } else {
          // alert(res.body.resultMsg)
          Message({
            showClose: true,
            message: res.body.resultMsg,
            type: 'error'
          });
          vm.listLoading = false;
        }
      }, res => {
        vm.listLoading = false;
      }, false)
    },
    // 根据当前路由参数切换视图
    setViewByQuery() {
      const { extra } = this.$route.query
      if (!extra) this.viewType = 0
      else this.viewType = extra
    },
    // 编辑
    handleEdit(index, row) {
      const vm = this;
      console.log('编辑的row：', index, '-----', row);
      // 跳页面进行修改
      // this.$router.push('/example/form');
      this.$router.push({ path: '/teacherManage/teacherManage', query: { id: row.chnlId } }); // 带参跳转
    },
    // 单个删除
    handleDelete(index, row) {
      const vm = this;
      console.log('单个删除选择的row：', index, '-----', row);
      // 前端删除。
      vm.list.splice(index, 1)
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
      this.listQuery.pageSize = val;
      this.getList();
    },
    // 操作分页
    handleCurrentChange(val) {
      console.log('--------', val)
      this.listQuery.currPage = val;
      this.getList();
    },
    // 新增
    handleCreate() {
      // this.dialogFormVisible = true;
      this.$router.push({ path: '/teacherManage/teacherManage', query: { extra: 'add' } }); // 带参跳转
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

      // 周转成前端所需格式 提交到vuex中。实际开发去掉以下代码，把以上参数提交给接口即可。2017-7-9
      const permissions = {};

      for (let i = 0, len = vm.smMenuBeanDtoList.length; i < len; i++) {
        permissions[vm.smMenuBeanDtoList[i].url] = vm.smMenuBeanDtoList[i].set;
      }

      vm.$message({
        showClose: true,
        message: '动态修改权限成功！实际开发请把参数提交给后端接口！',
        type: 'success'
      });
      store.dispatch('GenerateRoutes', permissions);
    },
    // 新增提交
    handleCreateSubmit() {
      const vm = this;
      console.log('新增入参：', vm.roleTemp)

      const item = {
        smRoleBeanDto: { roleName: vm.roleTemp.roleName }
      }
      // 这里作演示用，正式新增 请提交到接口
      vm.list.push(item)
      console.log('新增后', vm.list)

      this.dialogFormVisible = false;
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
    }
  }
};
</script>
