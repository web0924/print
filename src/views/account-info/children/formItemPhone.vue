<template>
  <el-form-item label="手机号"
                prop="phone">
    <el-input readonly
              style="width:50%"
              v-model.number="phone"></el-input>
    <el-button @click="handleEditPhone"
               type="text">修改手机号</el-button>
    <!-- 弹窗 -->
    <VerifyDialog :validSuccess="validSuccessByPhone"
                  :phone="phone"
                  ref="VerifyDialogRef" />
  </el-form-item>
</template>

<script>
import VerifyDialog from '../../../components/VerifyDialog'
export default {
  props: {
    phone: {
      default: ''
    }
  },
  components: {
    VerifyDialog
  },
  methods: {
    validSuccessByPhone() {
      this.$emit('handleEditPhone')
    },
    // 修改手机号
    handleEditPhone() {
      // this.$refs.EditPhoneRef.visible = true
      this.$refs.VerifyDialogRef.visible = true
    }
  }
}
</script>

<style>
</style>