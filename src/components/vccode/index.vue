<template>
  <div class="vccode-box"
       @click="getCodeHandle">
    <span :style="'color:'+color+';font-size:'+fontSize">{{dynamicText}}</span>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'


const codeTime = 60 // 倒计时时长

export default {
  name: 'z-get-vccode',

  props: {
    phone: {
      require: true,
      default: ''
    },
    color: {
      type: String,
      default: '#2B77EF'
    },
    fontSize: {
      type: String,
      default: '14px'
    }
  },
  data() {
    return {
      codeTime, // 倒计时时间
      isCountDown: false, // 是否开启倒计时
      timer: null,
      phone: ''
    };
  },
  onUnload() {
    clearInterval(this.timer)
  },
  computed: {
    dynamicText() {
      return this.isCountDown ? this.codeTime + 's' : '获取验证码'
    }
  },
  watch: {
    isCountDown(newVal) {
      if (newVal) {
        this.timer = setInterval(() => {
          if (this.codeTime > 1) this.codeTime -= 1
          else {
            clearInterval(this.timer)
            this.isCountDown = false
            this.codeTime = codeTime
          }
        }, 1000)
      }
    }
  },
  methods: {
    sendSmsVcode() {
      return Promise
    },
    getCodeHandle() {
      // const phone = this.$parent.loginForm.phone

      axios.post(
        '/smartprint/me/send-sms-vcode', qs.stringify({ phone: this.$props.phone })).then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('验证码发送成功')
          this.isCountDown = true
        }).catch(err => err)
    }
  }
}
</script>

<style scoped>
.vccode-box {
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
}
</style>