<template>
  <el-dialog width="100%"
             :visible.sync="visible"
             title="打印通知单">

    <div class="print">
      <el-table id="print"
                border
                size="medium"
                :data="orderDataMap">
        <el-table-column align="center"
                         label="印刷生产通知单">
          <el-table-column prop="createTime"
                           label="日期">
          </el-table-column>

          <el-table-column label="文印班级"
                           width="120">
            <template slot-scope="scope">
              {{(scope.row.gradeName||'')+(scope.row.className||'')}}
            </template>
          </el-table-column>
          <el-table-column prop="title"
                           label="文印内容及规格">
          </el-table-column>
          <el-table-column>
            <el-table-column prop="jiaoYingDanBanShu"
                            
                             align="center"
                             label="单">
            </el-table-column>
            <el-table-column prop="jiaoYingShuangBanShu"
                            
                             align="center"
                             label="双">
            </el-table-column>
            <el-table-column prop="jiaoYingDaDanBanShu"
                             
                             align="center"
                             label="答单">
            </el-table-column>
            <el-table-column prop="jiaoYingDaShuangBanShu"
                          
                             align="center"
                             label="答双">
            </el-table-column>
            <el-table-column prop="count"
                          
                             align="center"
                             label="份数">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="jingBan"
                         
                           align="center"
                           label="经办">
          </el-table-column>
          <el-table-column prop="jieDan"
                         
                           align="center"
                           label="接单">
          </el-table-column>
          <el-table-column prop="zhiBan"
                        
                           align="center"
                           label="制版">
          </el-table-column>
          <el-table-column prop="fenJian"
                         
                           align="center"
                           label="分拣">
          </el-table-column>
          <el-table-column prop="jiaoHuoShiJian"
                           label="交货时间">
          </el-table-column>
          <el-table-column prop="yinShuaYaoQiu"
                           label="要求">
          </el-table-column>
          <el-table-column prop="id"
                         
                           align="center"
                           label="单号">
          </el-table-column>
          <el-table-column prop="yinShuaRen"
                          
                           align="center"
                           label="印刷人">
          </el-table-column>
        </el-table-column>
      </el-table>
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
/**
 * 宽：`纸张宽 / 25.41 * DPI`
   高：`纸张高 / 25.41 * DPI`

   A4：尺寸：210mm × 297mm
   A3：尺寸：297mm × 420mm

   1英寸 = 25.41mm 换算

   第一步：先转换成英尺
   A4：8.264 × 11.688
   A3：11.688 × 16.529

   第二步：然后转换成像素(px)
   A4：793 × 1122
   A3：1122 × 1587
 * **/


export default {
  data() {
    return {
      visible: false,
      elinputWidth: '90%',
      orderData: {},
      DPI: ''
    }
  },
  computed: {
    orderDataMap() {
      return [this.orderData]
    },
    A4Wid() {
      // A4：8.264 × 11.688
      return 8.264 * this.DPI
    }
  },
  mounted() {
    this.js_getDPI()
  },
  methods: {
    printHandle() {
      // window.print()
      this.$printJS({ printable: 'print', type: 'html', maxWidth: 800 })
    },
    // 获取 DPI
    js_getDPI() {
      const arrDPI = new Array();
      if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
      } else {
        const tmpNode = document.createElement('DIV');
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
      }
      this.DPI = arrDPI[0];
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
  @page {
    margin: 0;
  }
  body * {
    visibility: hidden;
    margin: 0;
    /* border: 1px solid #999; */
  }
  table {
    table-layout: auto !important;
    page-break-inside: avoid;

    page-break-after: avoid;

    page-break-before: avoid;
  }
  .print,
  .print * {
    visibility: visible;
    padding: 0;
    margin: 0;
  }
}
</style>

<style scoped lang="scss">
/deep/ .el-table tbody {
  font-size: 16px;
}
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