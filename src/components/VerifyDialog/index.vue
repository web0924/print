<template>
  <el-dialog width="40%"
             :visible.sync="visible"
             title="身份验证">
    <el-tabs style="min-height:200px"
             v-model="activeName"
             type="border-card">
      <el-tab-pane name="1"
                   label="手机号验证">
        <div>
          <!-- 手机号 -->
          <div>
            <span>手机号：</span>
            <el-input style="width:400px"
                      :value="phone"></el-input>
          </div>
          <div>
            <span>验证码：</span>
            <el-input style="width:50%"
                      v-model="vccode" />
            <div style="display:inline-block;width:30%">
              <vccode :phone="phone" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2"
                   label="密码验证">
        <div>
          <!-- 密码 -->
          <span>输入密码：</span>
          <el-input style="width:400px"
                    v-model="pwd"
                    type="password"
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
import md5 from 'blueimp-md5';
import vccode from '../vccode'
export default {
  components: {
    vccode
  },
  props: {
    phone: {
      default: ''
    },
    validSuccess: {
      type: Function
    },
    validFaild: {
      type: Function
    }
  },
  data() {
    return {
      visible: false,
      activeName: '1',
      vccode: '',
      pwd: ''
    }
  },
  watch: {
    visible() {
      this.vccode = '';
      this.pwd = ''
    }
  },
  methods: {
    submitOk() {
      if (this.activeName == 2) {
        axios
          .post('/smartprint/print-room/me/self-authentication-by-pwd', qs.stringify({ pwd: md5(md5(this.pwd)) }))
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('身份验证成功')
              this.visible = false
              this.$props.validSuccess()
            } else {
              this.$message.error(res.data.msg)
              this.$props.validFaild()
            }
          })
          .catch(err => console.log(err))
      } else {
        axios
          .post('/smartprint/me/self-authentication-by-sms', qs.stringify({ vccode: this.vccode }))
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success('身份验证成功')
              this.visible = false
              this.$props.validSuccess()
            } else {
              this.$message.error(res.data.msg)
              this.$props.validFaild()
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