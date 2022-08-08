<template>
  <div>
    <table class="table-caontainer"
           border="1px"
           width="712px">
      <thead>
        <tr>
          <th colspan="9">胶印</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>单</td>
          <td>份</td>
          <td>双</td>
          <td>份</td>
          <td>答单</td>
          <td>份</td>
          <td>答双</td>
          <td>份</td>
        </tr>
        <tr>
          <td>数量</td>
          <td class=" bg-FFF">
            <el-input v-model="params.jiaoYingDanBanShu"
                      style="width:100%;border: none;text-align: center;"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingDanFenShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingShuangBanShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingShuangFenShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingDaDanBanShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingDaDanFenShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingDaShuangBanShu"
                      style="width:100%"></el-input>
          </td>
          <td class="bg-FFF">
            <el-input v-model="params.jiaoYingDaShuangFenShu"
                      style="width:100%"></el-input>
          </td>
        </tr>
      </tbody>
    </table>
    <table style="margin-top:50px"
           class="table-caontainer"
           cellpadding="10px"
           border="1px"
           width="712px">
      <thead>
        <tr>
          <th colspan="1"></th>
          <th colspan="4">复印</th>
          <th colspan="1">打印</th>
          <th colspan="1">打版</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>B5 </td>
          <td>A4 </td>
          <td>B4</td>
          <td>A3 </td>
          <td>B5A4 </td>
          <td>B5A4 </td>
        </tr>
        <tr>
          <td>数量</td>
          <td>
            <el-input v-model="params.fuYingB5Shu"
                      style="width:100%"></el-input>
          </td>
          <td>
            <el-input v-model="params.fuYingA4Shu"
                      style="width:100%"></el-input>
          </td>
          <td>
            <el-input v-model="params.fuYingB4Shu"
                      style="width:100%"></el-input>
          </td>
          <td>
            <el-input v-model="params.fuYingA3Shu"
                      style="width:100%"></el-input>
          </td>
          <td>
            <el-input v-model="params.daYingShu"
                      style="width:100%"></el-input>
          </td>
          <td>
            <el-input v-model="params.daBanShu"
                      style="width:100%"></el-input>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 其他配置 -->
    <div style="margin-top:20px">
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
.table-caontainer {
  max-width: 700px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 22px;
  font-size: 16px;
  .el-input__inner {
    border: none !important;
    text-align: center;
  }
  th,
  td {
    height: 40px;
  }
  td {
    width: 10%;
  }
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