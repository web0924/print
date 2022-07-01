<template>
  <div class="app-container">
    <div style="padding-bottom:30px">
      <div style="height:80px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center;position: relative;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>消息列表</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button @click="viewAllMessage"
                     style="margin-left:20px;color:#666"
                     round
                     size="mini">
            <img style="width:15px"
                 src="../../assets/img/clear-svg-icon.svg">
            一键清除未读
          </el-button>
          <!-- 搜索条件 -->
          <div style="position:absolute;right:20px">
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
          </div>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>

      <!-- 表格 -->
      <div class="list-container">
        <div @click="messageHndle(item.id)"
             v-for="item in list"
             :key="item.id"
             class="list-container-item-box">
          <div>
            <span :class="item.viewed==1?'off':'on'"
                  class="status-icon"></span>
            <a :style="{color:item.viewed==1?'#666':'#333'}">{{item.content}}</a>
          </div>
          <div>{{item.createTime}}</div>
        </div>
      </div>
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
    <el-dialog title="消息"
               :visible.sync="dialogVisible"
               width="40%">
      <div style="text-align:center;color:#000;font-size: 18px;">{{currentViewMessage.content}}</div>
      <div style="text-align:right;margin-top:50px;color:#666">{{currentViewMessage.createTime}}</div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

import store from '@/store'
// 查看消息
// /me/view-message
// messageId

// 查看所有消息
// /me/view-all-message
export default {
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      currentViewMessage: '',
      list: null, // 表格list
      total: null,
      listQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },
      ruleForm: {
        permissions: []
      }
    }
  },
  mounted() {
    const vm = this

    vm.getList()
    this.getListLen()
  },
  methods: {
    // 获取列表数据
    getList() {
      const vm = this
      vm.listLoading = true
      axios
        .post(
          '/smartprint/print-room/me/get-messages',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.list = res.data.data.messages
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取列表数据总数
    getListLen() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      params.isSum = 1
      axios
        .post('/smartprint/print-room/me/get-messages', qs.stringify(params))
        .then(res => {
          this.total = res.data.data.sum.count
          console.log(this.total)
        })
        .catch(err => console.log(err))
    },
    // 一键已读
    viewAllMessage() {
      axios
        .post('/smartprint/print-room/me/view-all-message')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.getList()
        })
        .catch(err => err)
    },
    // 查看消息
    messageHndle(id) {
      axios
        .post('/smartprint/print-room/me/view-message', qs.stringify({ messageId: id }))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.currentViewMessage = res.data.data.message
          this.dialogVisible = true
        })
        .catch(err => err)
    },
    // 单个删除
    handleDelete(index, { id }) {
      const vm = this
      console.log('单个删除选择的row：', index, '-----', id)
      axios
        .post(
          '/smartprint/print-room/office/delete-office',
          qs.stringify({ officeId: id })
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
        path: '/department/department',
        query: { extra: 'add' }
      }) // 带参跳转
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

<style scoped lang="scss">
.list-container {
  min-height: 500px;
  .list-container-item-box {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    background: #f5f5f5;
    padding: 0 20px;
    font-size: 16px;
    color: #333;
  }
  .status-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .on {
    background: #ff0000;
  }
  .off {
    background: #dddddd;
  }
}
.list-container-item-box:nth-child(2n + 1) {
  background: #fff !important;
}
</style>
