<template>
  <div>
    <div style="margin-top:20px">
      <div class="extra">
        <label>
          <span class="title"> 经办人：</span>
          <el-input v-model="params.jingBan"></el-input>
        </label>
        <label>
          <span class="title">接单人：</span>
          <el-input v-model="params.jieDan">
            <!-- <template slot="append">￥</template> -->
          </el-input>
        </label>
        <label>
          <span class="title"> 制版人：</span>
          <el-input v-model="params.zhiBan">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
          <span class="title"> 分拣人：</span>
          <el-input v-model="params.fenJian">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
          <span class="title">交货时间:</span>
          <el-input v-model="params.jiaoHuoShiJian">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
         <span class="title">印刷要求:</span> 
          <el-input v-model="params.yinShuaYaoQiu">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
         <span class="title"> 印刷人:</span>
          <el-input v-model="params.yinShuaRen">
            <!-- <template slot="append">份</template> -->
          </el-input>
        </label>
        <label>
          <span class="title"> 印刷费:</span>
          <el-input v-model="params.yinShuaFei">
            <!-- <template slot="append">份</template> -->
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
</style>