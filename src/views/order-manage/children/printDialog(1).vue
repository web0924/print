<template>
  <el-dialog :visible.sync="visible"
             title="打印通知单">

    <div class="print">
      <div class="prin-item">
        <span class="print-label"> 单号：</span>
        <span>{{orderData.id}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label">日期：</span>
        <span> {{orderData.createTime}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label">班级：</span>
        <span>
          {{(orderData.gradeName||'')+(orderData.className||'')}}
        </span>
      </div>
      <div class="prin-item">
        <span class="print-label">文印内容：</span>
        <span> {{orderData.title}}</span>
      </div>
      <div class="prin-item">
        <div style="width:40%">
          <span class="print-label">
            单版：
          </span>
          <span>{{orderData.jiaoYingDanBanShu}}</span>
        </div>
        <div>
          <span class="print-label">
            份：
          </span>
          <span>{{orderData.jiaoYingDanFenShu}}</span>
        </div>
      </div>
      <div class="prin-item">
        <div style="width:40%">
          <span class="print-label">双版：</span>
          <span> {{orderData.jiaoYingShuangBanShu}}</span>
        </div>
        <div>
          <span class="print-label"> 份：</span>
          <span> {{orderData.jiaoYingShuangFenShu}}</span>
        </div>
      </div>
      <div class="prin-item">
        <div style="width:40%">
          <span class="print-label">答单版：</span>
          <span> {{orderData.jiaoYingDaDanBanShu}}</span>
        </div>
        <div>
          <span class="print-label"> 份：</span>
          <span> {{orderData.jiaoYingDaDanFenShu}}</span>
        </div>
      </div>
      <div class="prin-item">
        <div style="width:40%">
          <span class="print-label">答双版：</span>
          <span> {{orderData.jiaoYingDaShuangBanShu}}</span>
        </div>
        <div>
          <span class="print-label"> 份：</span>
          <span> {{orderData.jiaoYingDaShuangFenShu}}</span>
        </div>
      </div>
      <div class="prin-item">
        <span class="print-label">要求：</span>
        <span> {{orderData.yinShuaYaoQiu}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label">交货时间：</span>
        <span> {{orderData.jiaoHuoShiJian}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label">经办：</span>
        <span>{{orderData.jingBan}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label"> 接单：</span>
        <span> {{orderData.jieDan}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label">制版：</span>
        <span> {{orderData.zhiBan}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label"> 分拣：</span>
        <span>{{orderData.fenJian}}</span>
      </div>
      <div class="prin-item">
        <span class="print-label"> 印刷人：</span>
        <span> {{orderData.yinShuaRen }}</span>
      </div>
      <div class="prin-item">
        <span class="print-label"> 印刷费：</span>
        <span> {{orderData.yinShuaFei}}</span>
      </div>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-form class="small-space"
               label-position="left"
               label-width="120px">
        <el-form-item :disabled="false"
                      label=" ">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary"
                     @click="printHandle">打印</el-button>
        </el-form-item>
      </el-form>
    </span>
  </el-dialog>

</template>

<script>
export default {
  data() {
    return {
      visible: false,
      elinputWidth: '90%',
      orderData: {}
    }
  },
  methods: {
    printHandle() {
      window.print()
    }
  }
}
</script>
<style>
.print {
  background-color: #fff;
  height: 100%;
}
@media print {
  body * {
    visibility: hidden;
  }
  .print,
  .print * {
    visibility: visible;
  }
  /* .print {
    position: fixed;
    left: 0;
    top: 0;
  } */
}
</style>

<style scoped lang="scss">
.prin-item {
  display: flex;
  align-items: center;
  // justify-content: center;
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 25px;
  color: #666;
  .print-label {
    color: #333;
    font-size: 19px;
    font-weight: 600px;
  }
}
</style>