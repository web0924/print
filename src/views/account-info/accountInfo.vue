<template>
  <div>
    <div style="padding-left:20px">
      <div style="height:60px;display:flex;align-items:center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>我的个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
    <div style="padding-left:75px;padding:50px 125px">
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="姓名"
                      prop="name">
          <el-input readonly
                    style="width:50%"
                    v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号"
                      prop="phone">
          <el-input readonly
                    style="width:50%"
                    v-model.number="ruleForm.phone"></el-input>
          <el-button @click="handleEditPhone"
                     type="text">修改手机号</el-button>
        </el-form-item> -->
        <FormItemPhone @handleEditPhone="handleEditPhone"
                       :phone="ruleForm.phone" />
        <p style="height:1px;background:#EEEEEE;margin:50px 0"></p>
        <el-form-item label="账号"
                      prop="account">
          <el-input readonly
                    style="width:50%"
                    type="text"
                    v-model="ruleForm.account"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="pwd">
          <el-input readonly
                    style="width:50%"
                    type="password"
                    v-model="ruleForm.pwd"
                    autocomplete="off"></el-input>
          <el-button @click="handleEditPwd"
                     type="text">修改密码</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item> -->
      </el-form>

      <!-- 弹窗 -->
      <EditPhone :successFun="successFunByEditPhone"
                 :phone="ruleForm.phone"
                 ref="EditPhoneRef" />
      <EditPwd :successFun="successFun"
               ref="EditPwd" />
      <VerifyDialog :validSuccess="validSuccessByPwd"
                    :phone="ruleForm.phone"
                    ref="VerifyDialogRef" />
      <!-- <el-dialog title="表单新增"
                 :visible.sync="dialogFormVisible">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="120px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="旧密码">
            <el-input v-model="roleTemp.roleName"></el-input>
          </el-form-item>

          <el-form-item label="新密码">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>

          <el-button type="primary"
                     @click="handleCreateSubmit">确 定</el-button>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import md5 from 'blueimp-md5';
import { mapGetters } from 'vuex'
import EditPwd from '../../components/EditPwd'
import EditPhone from '../../components/EditPhone'
import VerifyDialog from '../../components/VerifyDialog'
import FormItemPhone from './children/formItemPhone.vue'
export default {
  components: {
    FormItemPhone,
    EditPhone,
    EditPwd,
    VerifyDialog
  },
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      ruleForm: {},
      roleTemp: {
        roleName: '',
        remark: ''
      },
      rules: {
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      }
    }
  },
  mounted() {
    axios
      .post('/smartprint/print-room/me/refresh')
      .then(res => {
        if (res.data.code === 20) {
          // 退出登录
          this.loginOut()
        } else if (res.data.code === 0) {
          this.ruleForm = res.data.data.login.user
        }
      })
      .catch(err => err)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 修改手机号
    handleEditPhone() {
      this.$refs.EditPhoneRef.visible = true
      // this.$refs.VerifyDialogRef.visible = true
    },
    // 修改密码
    handleEditPwd() {
      this.$refs.VerifyDialogRef.visible = true
    },
    validSuccessByPwd() {
      this.$refs.EditPwd.visible = true
    },
    // 修改密码提交
    successFun(params) {
      axios
        .post('/smartprint/print-room/me/update-pwd', qs.stringify({ pwd: md5(md5(params.pwd)) }))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('修改成功')
          this.$refs.EditPwd.visible = false
        })
        .catch(err => console.log(err))
    },
    // 修改手机号提交
    successFunByEditPhone(params) {
      axios
        .post('/smartprint/print-room/me/bind-phone', qs.stringify(params))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('修改成功')
          this.$refs.EditPhoneRef.visible = false
        })
        .catch(err => console.log(err))
    }
  }
}
</script>