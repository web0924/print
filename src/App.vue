<template>
  <div id="app22">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'APP'
}
</script>

<style>
/* 修改element-ui  输入框disable 状态下的字体颜色 */
.el-input.is-disabled .el-input__inner {
  color: #000 !important;
}

/*全局覆盖默认的loading样式*/
.el-loading-mask {
  background: rgba(0, 0, 0, 0.5);
}

.el-table .danger-cell {
  color: #f56c6c;
}

span {
  font-size: 15px;
}

/* 单行溢出省略 */
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
</style>
