<template>
  <div>
    <div class="operator-box">
      <el-form class="small-space"
               label-position="left"
               label-width="120px">
        <el-form-item :disabled="false"
                      label=" ">
          <el-button style="color:#FFF; background: #09bb07;"
                     @click="printHandle">导出通知单</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div class="extra">
        <label>
          <span class="title"> 经办人：</span>
          <el-select v-model="params.jingBan"
                     clearable
                     placeholder=" "
                     filterable
                     @change="selectChange"
                     @blur="(e)=>{selectBlur(e, 'jingBan')} ">
            <el-option v-for="(item,index) in jingBanRens"
                       :key="index"
                       :label="item.name"
                       :value="item.name">
              <span>{{item.name}}</span>
              <span @click.stop="deleteHnadle('jingBan',item.id)"
                    style="float:right"><i class="el-icon-delete"></i></span>
            </el-option>
          </el-select>
        </label>
        <label>
          <span class="title">接单人：</span>
          <el-input disabled
                    v-model="params.jieDan" />
          <!-- <el-select disabled
                     v-model="params.jieDan"
                     clearable
                     placeholder=" "
                     filterable
                     @blur="(e)=>{selectBlur(e, 'jieDan')} ">
            <el-option v-for="(item,index) in jieDanRens"
                       :key="index"
                       :label="item.name"
                       :value="item.name" />
          </el-select> -->
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
                       :value="item.name">
              <span>{{item.name}}</span>
              <span @click.stop="deleteHnadle('zhiBan',item.id)"
                    style="float:right"><i class="el-icon-delete"></i></span>
            </el-option>

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
                       :value="item.name">
              <span>{{item.name}}</span>
              <span @click.stop="deleteHnadle('fenJian',item.id)"
                    style="float:right"><i class="el-icon-delete"></i></span>
            </el-option>
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
                       :value="item.name">
              <span>{{item.name}}</span>
              <span @click.stop="deleteHnadle('yinShua',item.id)"
                    style="float:right"><i class="el-icon-delete"></i></span>
            </el-option>
          </el-select>
        </label>
        <label>
          <!-- 计算属性 -->
          <i v-show="false">{{yinshuafei}}</i>
          <!-- <i v-show="false"> {{yinShuaYaoQiuMap}}</i> -->
          <span class="title"> 印刷费:</span>
          <el-input v-model="params.yinShuaFei">
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
import qs from 'qs'
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
  computed: {
    yinshuafei() {
      if (!this.params.jiaoYingDanBanShu) return false

      let yinShuaFei = 0;
      const count = parseFloat(this.params.count || 0)
      const jiaoYingDanBanShu = parseFloat(this.params.jiaoYingDanBanShu || 0)
      const jiaoYingShuangBanShu = parseFloat(this.params.jiaoYingShuangBanShu || 0)

      if (count <= 500) yinShuaFei = (jiaoYingDanBanShu + jiaoYingShuangBanShu) * count * 0.003 + (jiaoYingDanBanShu + jiaoYingShuangBanShu) * 1;
      else yinShuaFei = (jiaoYingDanBanShu + jiaoYingShuangBanShu) * count * 0.003;

      this.params.yinShuaFei = Math.floor(yinShuaFei * 100) / 100// 保留两位小数
    }
    // 印刷要求
    // yinShuaYaoQiuMap() {
    //   let str = ''
    //   if (this.params.jiaoYingDanBanShu) { str += '胶印-单面:' + this.params.jiaoYingDanBanShu + '(版)' }
    //   if (this.params.jiaoYingDanFenShu) { str += ' 胶印-单面:' + this.params.jiaoYingDanFenShu + '(张)' }
    //   if (this.params.jiaoYingShuangBanShu) { str += ' 胶印-双面:' + this.params.jiaoYingShuangBanShu + '(版)' }
    //   if (this.params.jiaoYingShuangFenShu) { str += ' 胶印-双面:' + this.params.jiaoYingShuangFenShu + '(张)' }
    //   if (this.params.jiaoYingDaDanBanShu) { str += ' 胶印-答单:' + this.params.jiaoYingDaDanBanShu + '(版)' }
    //   if (this.params.jiaoYingDaDanFenShu) { str += ' 胶印-答单:' + this.params.jiaoYingDaDanFenShu + '(张)' }
    //   if (this.params.jiaoYingDaShuangBanShu) { str += ' 胶印-答双:' + this.params.jiaoYingDaShuangBanShu + '(版)' }
    //   if (this.params.jiaoYingDaShuangFenShu) { str += ' 胶印-答双:' + this.params.jiaoYingDaShuangFenShu + '(张)' }
    //   if (this.params.fuYingB5Shu) { str += ' 复印-B5:' + this.params.fuYingB5Shu + '(张)' }
    //   if (this.params.fuYingA4Shu) { str += ' 复印-A4:' + this.params.fuYingA4Shu + '(张)' }
    //   if (this.params.fuYingB4Shu) { str += ' 复印-B4:' + this.params.fuYingB4Shu + '(张)' }
    //   if (this.params.fuYingA3Shu) { str += ' 复印-B4:' + this.params.fuYingA3Shu + '(张)' }
    //   if (this.params.daYingShu) { str += ' 打印:' + this.params.daYingShu + '(张)' }
    //   if (this.params.daBanShu) { str += ' 打印:' + this.params.daBanShu + '(张)' }

    //   this.params.yinShuaYaoQiu = str + '   备注： ' + (this.params.printRoomRemark || '')
    // }
  },
  methods: {
    selectChange(val) {
      console.log(val)
    },
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
      axios.post(
        '/smartprint/print-room/order/export-sheng-chan-tong-zhi-dan', qs.stringify({ orderId: this.params.id, withPrice: 0 })
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        window.open('https://dev.renx.cc/' + res.data.data.url)
      }).catch(err => err)
      // window.print()
      // this.$refs.printDialogRef.visible = true
      // this.$refs.printDialogRef.orderData = this.params
    },
    // 判断是否为胶印
    checkIsJiaoYin({ jiaoYingDanBanShu, jiaoYingShuangBanShu, jiaoYingDaDanBanShu, jiaoYingDaShuangBanShu }) {
      return jiaoYingDanBanShu || jiaoYingShuangBanShu || jiaoYingDaDanBanShu || jiaoYingDaShuangBanShu
    },
    // 删除记录
    // @{str} 删除的字段
    // @{name} 删除的记录
    deleteHnadle(str, id) {
      const strMap = {
        jingBan: '/smartprint/print-room/order/delete-jing-ban-ren',
        zhiBan: '/smartprint/print-room/order/delete-zhi-ban-ren',
        fenJian: '/smartprint/print-room/order/delete-fen-jian-ren',
        yinShua: '/smartprint/print-room/order/delete-yin-shua-ren'
      }
      const parmas = {
        [str + 'RenId']: id
      }

      axios.post(strMap[str], qs.stringify(parmas)).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)

        this.getFenJianList()
        this.getJieDanList()
        this.getJingBnaList()
        this.getYinShuaList()
        this.getZhiBanList()
      }).catch(err => err)
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