<template>
  <div class="app-container">
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"
                style="width: 280px;"
                class="filter-item"
                placeholder="标题"
                v-model="listQuery.title">
      </el-input>

      <el-select clearable
                 class="filter-item"
                 style="width: 280px"
                 v-model="listQuery.type"
                 placeholder="类型">
        <el-option v-for="item in  typeOptions"
                   :key="item.key"
                   :label="item.display_name+'('+item.key+')'"
                   :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 icon="search"
                 @click="handleFilter">搜索</el-button>
      <el-button class="filter-item"
                 type="primary"
                 @click="handleCreate"
                 icon="edit">添加</el-button>

      <el-button class="filter-item"
                 type="primary"
                 @click="handleDelAll"
                 icon="edit">批量删除</el-button>
      <el-button class="filter-item"
                 type="primary"
                 icon="document"
                 @click="handleDownload">导出</el-button>

    </div>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              @selection-change="handleSelectionChange"
              :data="list"
              v-loading.body="listLoading"
              element-loading-text=""
              border
              fit
              highlight-current-row>
      <el-table-column type="selection"
                       width="65">
      </el-table-column>

      <el-table-column align="center"
                       label='序号'
                       width="100">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="字段1"
                       width="">
        <template slot-scope="scope">
          {{scope.row.chnlId}}
        </template>
      </el-table-column>

      <el-table-column label="字段2"
                       width="">
        <template slot-scope="scope">
          <span>{{scope.row.hisChnlId}}</span>
        </template>
      </el-table-column>

      <el-table-column label="字段3"
                       align="center"
                       width="">
        <template slot-scope="scope">
          {{scope.row.chnlName}}
        </template>
      </el-table-column>

      <el-table-column align="center"
                       prop="created_at"
                       label="字段4"
                       width="">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="字段5">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{scope.row.orderNum}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="操作">
        <template slot-scope="scope">

          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small"
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
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="表单新增"
               :visible.sync="dialogFormVisible">
      <el-form class="small-space"
               :model="temp"
               label-position="left"
               label-width="70px"
               style='width: 400px; margin-left:50px;'>

        <el-form-item label="字段1">
          <el-input v-model="temp.chnlId"></el-input>
        </el-form-item>

        <el-form-item label="字段2">
          <el-input v-model="temp.hisChnlId"></el-input>
        </el-form-item>

        <el-form-item label="字段3">
          <el-input v-model="temp.chnlName"></el-input>
        </el-form-item>

        <el-form-item label="字段4">
          <el-input v-model="temp.state"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="handleCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getList } from 'api/article';
import { global } from 'src/global/global';
import { api } from 'src/global/api';

export default {
  data() {
    return {
      // list: null,
      // listLoading: true,

      list: null, // 表格list [].push({})
      total: null,
      listLoading: true,
      listQuery: {
        currPage: 1,
        pageSize: 10,

        // importance: undefined,
        title: '',
        type: null // 类型

      },
      temp: {
        chnlId: '',
        hisChnlId: '',
        chnlName: '',
        state: '',
        isavailable: '',
        orderNum: 10
      },
      typeOptions: [
        { key: '001', display_name: '类型1' },
        { key: '002', display_name: '类型2' },
        { key: '003', display_name: '类型3' }

      ],
      dialogFormVisible: false,
      multipleSelection: []

    }
  },
  mounted() {
    const vm = this;

    vm.getList();
  },
  methods: {
    initTemp() {
      const vm = this;

      vm.temp = {
        chnlId: '',
        hisChnlId: '',
        chnlName: '',
        state: '',
        isavailable: '',
        orderNum: 10
      }
    },
    // 获取列表数据
    getList() {
      const vm = this;

      vm.listLoading = true;
      // fetchList(this.listQuery).then(response => {
      //   this.list = response.data.items;
      //   this.total = response.data.total;
      //   this.listLoading = false;
      // })
      global.get(api.tableList, { params: vm.listQuery }, res => {
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

      // 请求开发环境接口
      // let url = '/urm-mt-interface/service/hisForHzfwhService/';
      // let par = {
      //           "isavailable": "Y",
      //           "beginDate": "20170616",
      //           "endDate": "20170616",
      //           "channelItems": [
      //             {
      //               "chnlId": 1
      //             }
      //           ],
      //           "hospitalId": "1",
      //           "methodCode": "getDeptRegInfo001",
      //           "nonceStr": "2A4B9B991078AC805C1D31CD366FC394",
      //           "openId": "JY160",
      //           "channel": "JY160",
      //           "key": "6BB30AAE2804144011040E664D87AC5452246969",
      //           "signature": "071C301677F98547DD3CA77D48E93EA1BE61872D",
      //           "resultType": "json"
      //     };

      // global.get( url,{params: par },function(res){
      //         console.log('-------开发环境获取到数据：',JSON.stringify(res) )
      //         let data = res.body;
      //        if(data.resultCode == 0){



      //        }else{


      //        }


      // },function(res){


      // },false)
    },
    // 编辑
    handleEdit(index, row) {
      const vm = this;
      console.log('编辑的row：', index, '-----', row);
      // 跳页面进行修改
      // this.$router.push('/example/form');
      this.$router.push({ path: '/example/form', query: { id: row.chnlId } }); // 带参跳转
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
      // 每次点击新增时 重置下新增表单数据，避免双向绑定的影响
      this.initTemp();

      this.dialogFormVisible = true;
    },
    // 新增提交
    handleCreateSubmit() {
      const vm = this;
      console.log('新增入参：', vm.temp)

      // 这里作演示用，正式新增 请提交到接口
      vm.list.push(vm.temp)
      console.log('新增后', vm.list)

      this.dialogFormVisible = false;
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
