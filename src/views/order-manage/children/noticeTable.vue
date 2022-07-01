<template>
  <div>
    <div class="operator-box">
      <el-button style="color:#FFF; background: #09bb07;"
                 @click="printHandle">打印通知单</el-button>
    </div>
    <div>
      <div class="extra">
        <label>
          <span class="title"> 经办人：</span>
          <!-- <el-input v-model="params.jingBan"></el-input> -->
          <el-select v-model="params.jingBan"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'jingBan')} ">
            <el-option v-for="(item,index) in jingBanRens"
                       :key="index"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </label>
        <label>
          <span class="title">接单人：</span>
          <!-- <el-input v-model="params.jieDan" /> -->
          <el-select v-model="params.jieDan"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'jieDan')} ">
            <el-option v-for="(item,index) in jieDanRens"
                       :key="index"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </label>
        <label>
          <span class="title"> 制版人：</span>
          <!-- <el-input v-model="params.zhiBan" /> -->
          <el-select v-model="params.zhiBan"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'zhiBan')} ">
            <el-option v-for="(item,index) in zhiBanRens"
                       :key="index"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </label>
        <label>
          <span class="title"> 分拣人：</span>
          <!-- <el-input v-model="params.fenJian" /> -->
          <el-select v-model="params.fenJian"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'fenJian')} ">
            <el-option v-for="(item,index) in fenJianRens"
                       :key="index"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </label>
        <label>
          <span class="title">交货时间:</span>
          <!-- <el-input v-model="params.jiaoHuoShiJian">
          </el-input> -->
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          class="filter-item"
                          v-model="params.jiaoHuoShiJian"
                          type="datetime">
          </el-date-picker>
        </label>
        <label>
          <span class="title">印刷要求:</span>
          <el-input v-model="params.yinShuaYaoQiu">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
          <span class="title"> 印刷人:</span>
          <!-- <el-input v-model="params.yinShuaRen" /> -->
          <el-select v-model="params.yinShuaRen"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'yinShuaRen')} ">
            <el-option v-for="(item,index) in  yinShuaRens"
                       :key="index"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </label>
        <label>
          <span class="title"> 印刷费:</span>
          <el-input v-model="params.yinShuaFei">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
      </div>
    </div>
    <printDialog ref="printDialogRef" />
  </div>
</template>

<script>
import axios from 'axios'
import printDialog from './printDialog.vue'
// import qs from 'qs'
export default {
  components: {
    printDialog
  },
  data() {
    return {
      fenJianRens: [],
      jieDanRens: [],
      jingBanRens: [],
      yinShuaRens: [],
      zhiBanRens: [],
      params: {
        jingBan: '',
        zhiBan: '',
        jieDan: '',
        fenJian: '',
        jiaoHuoShiJian: '', // 交货时间
        yinShuaYaoQiu: '', // 印刷要求
        yinShuaRen: '', // 印刷人
        yinShuaFei: '' // 印刷费
      }
    }
  },
  mounted() {
    this.getFenJianList()
    this.getJieDanList()
    this.getJingBnaList()
    this.getYinShuaList()
    this.getZhiBanList()
  },
  methods: {
    // 获取分拣人列表
    getFenJianList() {
      axios.post(
      '/smartprint/print-room/order/get-fen-jian-rens'
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.fenJianRens = res.data.data.fenJianRens
      }).catch(err => err)
    },
    // 接单人列表
    getJieDanList() {
      axios.post(
      '/smartprint/print-room/order/get-jie-dan-rens'
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.jieDanRens = res.data.data.jieDanRens
      }).catch(err => err)
    },
    // 经办人列表
    getJingBnaList() {
      axios.post(
      '/smartprint/print-room/order/get-jing-ban-rens'
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.jingBanRens = res.data.data.jingBanRens
      }).catch(err => err)
    },
    // 印刷人列表
    getYinShuaList() {
      axios.post(
      '/smartprint/print-room/order/get-yin-shua-rens'
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.yinShuaRens = res.data.data.yinShuaRens
      }).catch(err => err)
    },
    // 制版人列表
    getZhiBanList() {
      axios.post(
      '/smartprint/print-room/order/get-zhi-ban-rens'
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.zhiBanRens = res.data.data.zhiBanRens
      }).catch(err => err)
    },
    // 手动填写 失去焦点赋值
    selectBlur(e, val) {
      if (e.target.value) {
        this.params[val] = e.target.value
        this.$forceUpdate()   // 强制更新
      }
    },
    printHandle() {
      // window.print()
      this.$refs.printDialogRef.visible = true
      this.$refs.printDialogRef.orderData = this.params
    }
  }
}
</script>


<style lang="scss" scoped>
.extra {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  label {
    .title {
      width: 90px;
      font-size: 13px;
      font-weight: 600;
    }
    width: 30%;
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 10px;
  }
}
.operator-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>