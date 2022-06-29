<template>
  <el-dialog width="40%"
             :visible.sync="visible"
             title="修改手机号：">
    <el-form ref="form"
             :model="ruleForm">
      <el-form-item label-width="120px"
                    label="当前手机号">
        <span>{{phone}}</span>
      </el-form-item>
      <el-form-item label-width="120px"
                    prop="pwd"
                    label="输入新手机号">
        <el-input v-model="ruleForm.phone"
                  style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label-width="120px"
                    prop="pwd"
                    label="验证码">
        <el-input v-model="ruleForm.vcode"
                  style="width:50%" />
        <div style="display:inline-block;width:30%">
          <vccode :phone="ruleForm.phone" />
        </div>
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
import vccode from '../vccode'
export default {
  components: {
    vccode
  },
  props: {
    phone: {
      default: ''
    },
    successFun: {
      type: Function
    },
    errorFun: {
      type: Function
    }
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        phone: '',
        vcode: ''
      }
    }
  },
  methods: {
    submitOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$props.successFun(this.ruleForm)
        }
      });
    }
  }
}
</script>

<style>
</style>