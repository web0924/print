<template>
  <el-dialog width="40%"
             :visible.sync="visible"
             title="身份验证">
    <el-tabs v-model="activeName"
             type="border-card">
      <el-tab-pane name="1"
                   label="用户管理">
        <div v-if="activeName==1">
          <!-- 手机号 -->
        </div>
      </el-tab-pane>
      <el-tab-pane name="2"
                   label="密码验证">
        <div>
          <!-- 密码 -->
          <span>输入密码：</span>
          <el-input style="width:400px"
                    v-model="pwd"
                    placeholder="请输入当前密码"></el-input>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="submitOk">验证</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      visible: false,
      activeName: '1',
      pwd: ''
    }
  },
  methods: {
    submitOk() {
      if (this.activeName == 2) {
        axios
          .post('/smartprint/me/self-authentication-by-pwd', qs.stringify({ pwd: this.pwd }))
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('身份验证成功')
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style>
</style>