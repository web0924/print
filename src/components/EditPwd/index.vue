<template>
  <el-dialog width="40%"
             :visible.sync="visible"
             title="修改密码">
    <el-form ref="form"
             :model="ruleForm"
             :rules="rules">
      <el-form-item label-width="100px"
                    prop="newPwd"
                    label="新密码">
        <el-input v-model="ruleForm.newPwd"
                  style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label-width="100px"
                    prop="pwd"
                    label="确认密码">
        <el-input v-model="ruleForm.pwd"
                  style="width:400px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">

      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary"
                 @click="submitOk">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import md5 from 'blueimp-md5';
export default {
  props: {
    successFun: {
      type: Function,
      default: () => { }
    },
    errorFun: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    const checkPress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      visible: false,
      ruleForm: {
        newPwd: '',
        pwd: ''
      },
      rules: {
        newPwd: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        pwd: [
          { required: true, validator: checkPress, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.successFun(this.ruleForm)
        } else {
          console.log('error submit!!');
          this.$props.errorFun()
          return false;
        }
      });
    }
  }
}
</script>

<style>
</style>