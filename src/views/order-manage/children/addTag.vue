<template>
  <span>
    <el-input class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              @keyup.enter.native="handleInputConfirm(floor)"
              @blur="handleInputConfirm(floor)">
    </el-input>
    <el-button v-else
               class="button-new-tag"
               @click="showInput">+</el-button>
  </span>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    floor: {
      default: 0
    },
    schoolID: {
      default: ''
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {

    handleInputConfirm(upperId) {
      const inputValue = this.inputValue
      if (inputValue) {
        axios.post('/smartprint/company/price-book/create-set', qs.stringify({ name: inputValue, schoolId: this.$props.schoolID, upperId }))
          .then(res => {
            if (res.data.code !== 0) return this.$message.error(res.data.msg)
            this.$emit('getSets')
          })
          .catch(err => err)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        // console.log(this.$refs.saveInput0.$refs)
        this.$refs.saveTagInput.$refs.input.focus()
        // this.$refs.saveInput0.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped>
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>