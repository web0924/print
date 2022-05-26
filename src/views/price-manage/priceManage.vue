<template>
  <div>
    <div style="padding-left:20px">
      <div style="height:60px;display:flex;align-items:center">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/classRoomManage/permissionsManage' }">科室列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
    <div class="tag-caontainer">
      <div style="display:flex;align-items:center">
        <span style="font-size:15px"
              class="form-label">文印规格及内容：</span>
        <div>
          <div>
            <el-tag 
            :key="tag"
                    v-for="
                    tag
                    in
                    dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                    effect="effect">
              {{tag}}
            </el-tag>
            <el-input class="
                    input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
            </el-input>
            <el-button v-else
                       class="button-new-tag"
                       size="small"
                       @click="showInput">+</el-button>
          </div>
          <div style="margin-top:10px">
            <el-tag :key="tag"
                    v-for="
              tag
              in
              dynamicTags2"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
            </el-input>
            <el-button v-else
                       class="button-new-tag"
                       size="small"
                       @click="showInput">+</el-button>
          </div>
          <div style="margin-top:10px">
            <el-tag :key="tag"
                    v-for="
              tag
              in
              dynamicTags3"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
            </el-input>
            <el-button v-else
                       class="button-new-tag"
                       size="small"
                       @click="showInput">+</el-button>
          </div>
          <div style="margin-top:10px">
            <el-button size="small"
                       @click="showInput">+</el-button>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;margin-top:20px">
        <span style="font-size:15px"
              class="form-label">学校：</span>
        <el-select clearable
                   class="filter-item"
                   style="width: 280px"
                   placeholder="输入管理员姓名搜索">
          <el-option v-for="item in  typeOptions"
                     :key="item.key"
                     :label="item.display_name+'('+item.key+')'"
                     :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div style="display:flex;align-items:center;margin-top:70px">
        <span style="font-size:15px"
              class="form-label">收费项：</span>
        <el-button icon="el-icon-plus"
                   type="primary">添加收费项</el-button>
      </div>
      <div style="display:flex;margin-top:20px">
        <span class="form-label"></span>
        <div>
          <div v-for="item in 3"
               class="table-item">
            <span class="table-item-cell">收费项</span>
            <input class="table-item-cell"
                   placeholder="请输入"
                   style="background:#FFF; outline: none">
            <span class="table-item-cell">单价￥</span>
            <input class="table-item-cell"
                   placeholder="请输入"
                   style="background:#FFF; outline: none">
            <input class="table-item-cell"
                   style="background:#FFF;border:none;color:#0053B5"
                   type="button"
                   value="删除">

          </div>
        </div>
      </div>
      <div style="margin-top:80px;padding-left:20%">
        <el-button type="primary">确认上传</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicTags: ['胶印', '打印', '复印'],
      dynamicTags2: ['单面', '双面'],
      dynamicTags3: ['A3', 'A4'],
      inputVisible: false,
      inputValue: ''

    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style scoped>
.tag-caontainer {
  padding: 55px 110px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.form-label {
  width: 20%;
  padding-right: 20px;
  /* display: flex; */
  text-align: right;
  align-self: baseline;
}
.table-item {
  display: flex;
  align-items: center;
}
.table-item-cell {
  width: 20%;
  height: 60px !important;
  border: 1px solid #cccccc;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>