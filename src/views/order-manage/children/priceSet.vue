<template>
  <div>
    <div class="price-box">
      <div class="left">
        <div class="table-item">
          <div class="top">
            <span class="name">胶印-单面（张）</span>
            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDanFenShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">胶印-单面（版）</span>
            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDanBanShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
        <div class="table-item mt-20">
          <div class="top">
            <span class="name">胶印-答单（张）</span>

            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDaDanFenShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">胶印-答单（版）</span>
            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDaDanBanShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
        <div class="table-item mt-20">
          <div class="top">
            <span class="name">复印-B5</span>

            <input class="value"
                   type="text"
                   v-model="params.fuYingB5Shu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">复印-B4</span>

            <input class="value"
                   type="text"
                   v-model="params.fuYingB4Shu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
        <div class="table-item"
             style="border-top:none">
          <div class="top">
            <span class="name">复印-A4</span>
            <input class="value"
                   type="text"
                   v-model="params.fuYingA4Shu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">复印-A3</span>

            <input class="value"
                   type="text"
                   v-model="params.fuYingA3Shu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
        <div class="table-item mt-20">
          <div class="top">
            <span class="name">打印</span>

            <input class="value"
                   type="text"
                   v-model="params.daYingShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">打版</span>

            <input class="value"
                   type="text"
                   v-model="params.daBanShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
      </div>
      <div class="right"
           style="margin-left:20px">
        <div class="table-item">
          <div class="top">
            <span class="name">胶印-双面（张）</span>

            <input class="value"
                   type="text"
                   v-model="params.jiaoYingShuangFenShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">胶印-双面（版）</span>

            <input class="value"
                   type="text"
                   v-model="params.jiaoYingShuangBanShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
        <div class="table-item mt-20">
          <div class="top">
            <span class="name">胶印-答双（张）</span>

            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDaShuangFenShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
          <div class="bot">
            <span class="name">胶印-答双（版）</span>
            <input class="value"
                   type="text"
                   v-model="params.jiaoYingDaShuangBanShu"
                   style="border:none;outline: none;">
            <span style="padding: 0 10px">（份）</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 其他配置 -->
    <div style="margin-top:60px">
      <div style="color:#333;font-size:20px;font-weight:500;margin-bottom: 20px;">其他配置</div>
      <div class="extra">
        <label>
          名称：
          <el-input v-model="params.otherSetName"
                    placeholder="请输入"></el-input>
        </label>
        <label>
          单价：
          <el-input v-model="params.otherSetUnitPrice"
                    placeholder="请输入">
            <template slot="append">￥</template>
          </el-input>
        </label>
        <label>
          份数：
          <el-input v-model="params.otherSetCount"
                    placeholder="请输入">
            <template slot="append">份</template>
          </el-input>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        jiaoYingDanBanShu: '', // 胶印单面 每板单价
        jiaoYingDanFenShu: '', // 胶印单面 每张单价

        jiaoYingShuangBanShu: '', // 胶印双面 每板单价
        jiaoYingShuangFenShu: '', // 胶印双面 每张单价

        jiaoYingDaDanBanShu: '', // 胶印答单 每板单价
        jiaoYingDaDanFenShu: '', // 胶印答单 每张单价

        jiaoYingDaShuangBanShu: '', // 胶印答双 每板单价
        jiaoYingDaShuangFenShu: '', // 胶印答双 每张单价



        fuYingB5Shu: '', // 复印B5 数量
        fuYingB4Shu: '', // 复印B4 数量
        fuYingA4Shu: '', // 复印A4 数量
        fuYingA3Shu: '', // 复印A3 数量

        daYingShu: '', // 打印 数量
        daBanShu: '', // 打板 数量


        otherSetName: '',
        otherSetCount: '',
        otherSetUnitPrice: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
.price-box {
  display: flex;
  justify-content: center;
}
.table-item {
  height: 125px;
  width: 345px;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: column;
}
.table-item .bot {
  border-top: 1px solid #cccccc;
}
.table-item .bot,
.table-item .top {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.name,
.value {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
.name {
  background: #f5f5f5;
  border-right: 1px solid #cccccc;
}
.extra {
  display: flex;
  justify-content: space-around;
  label {
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-right: 20px;
  }
}
</style>