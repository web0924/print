<template>
  <div v-show="true">
    <div v-for="floor in couputeMaxFloor"
         :key="floor"
         data-upperId="0"
         class="floor">
      <div class="tag-box"
           :class="isActive(tag)?'tag-active':''"
           @click="tagClick(tag,index)"
           :key="tag.id"
           v-for="(tag,index) in dynamicTags"
           v-if="tag.upperId===floor">
        {{tag.name}}
        <i v-if="isEdit" @click.stop="closeTag(tag,index)"
           class="el-icon-close"></i>
      </div>
      <addTag v-if="isEdit"
              @getSets="getSets"
              :schoolID="schoolId"
              :floor="floor" />
    </div>
    <div v-if="isEdit && choseTags.length==couputeMaxFloor.length"
         style="margin-top:10px">
      <el-input class="input-new-tag"
                v-if="addFloorVisible"
                v-model="addFloorValue"
                ref="saveAddFloorInput"
                @keyup.enter.native="handleFloorInputConfirm"
                @blur="handleFloorInputConfirm">
      </el-input>
      <el-button v-else
                 class="button-new-tag"
                 @click="showAddFloorInput">+</el-button>
    </div>
    <!-- {{couputeMaxFloor}} -->
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import addTag from './addTag.vue'
export default {
  components: {
    addTag
  },
  // dynamicTags 标签初始数组
  // schoolId 学校id
  // lastLevelChange  选择到最后一层返回true
  // choseCompleteEvent  标签选择、添加、删除 触发事件（更新配置）
  // isEdit  配置是否可编辑
  props: {
    dynamicTags: {
      type: Array,
      default: () => []
    },
    schoolId: {
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      choseTags: [],
      addFloorVisible: false,
      addFloorValue: ''
    }
  },
  computed: {
    couputeMaxFloor() {
      const initFloor = [0]
      if (this.choseTags.length == 0) return initFloor
      else return [...initFloor, ...this.choseTags.map(item => item.id)]
    },
    maxFloor() {
      return this.getMaxFloor(this.$props.dynamicTags)
    }

  },
  watch: {
    choseTags() {
      if (this.choseTags.length > 0) {
        if (this.choseTags[this.choseTags.length - 1].branch === 0) {
          this.$emit('lastLevelChange', true)
        } else {
          this.$emit('lastLevelChange', false)
        }
      } else {
        this.$emit('lastLevelChange', false)
      }
    },
    schoolId() {
      this.choseTags = []
    }
  },
  methods: {
    // 获取最高层数
    getMaxFloor(list) {
      const upperIds = list.map(item => item.upperId)
      this.maxFloor = [...new Set(upperIds)].sort()
    },
    isActive(tag) {
      const ids = this.choseTags.map(item => item.id)
      return ids.find(item => tag.id === item)
    },
    tagClick(tag, index) {
      const ids = this.choseTags.map(item => item.id)
      // 不存在添加(添加前判断同级别是否存在,不存在再添加)
      const uindex = this.choseTags.findIndex(item => item.upperId === tag.upperId)
      // 数组中存在删除
      if (ids.find(item => tag.id === item)) {
        for (let i = 0; i < this.choseTags.length; i++) {
          if (this.choseTags[i].id === tag.id) {
            this.choseTags.splice(i, this.choseTags.length - uindex)
          }
        }
      } else {
        // 不存在添加(添加前判断同级别是否存在不存在再添加)
        // const uindex = this.choseTags.findIndex(item => item.upperId === tag.upperId)
        if (uindex == -1) {
          this.choseTags.push(tag)
        } else {
          // 如果点击的第一级清除所有的子级
          if (tag.upperId === 0) {
            this.choseTags = []
            this.choseTags.push(tag)
          } else {
            // 替换当前级别id清除该级别以下的id
            this.choseTags.splice(uindex, this.choseTags.length - uindex, tag)
          }
        }
        console.log('不存在')
      }
      this.$emit('choseCompleteEvent')
    },
    closeTag(tag, index) {
      axios.post(
      '/smartprint/print-room/company/price-book/delete-set', qs.stringify({ setId: tag.id })).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.$emit('choseCompleteEvent')
        for (let i = 0; i < this.choseTags.length; i++) {
          if (this.choseTags[i].id === tag.id) {
            this.choseTags.splice(i, 1)
            return
          }
        }
      })
    },
    showAddFloorInput() {
      this.addFloorVisible = true
      this.$nextTick(_ => {
        this.$refs.saveAddFloorInput.$refs.input.focus()
      })
    },
    // 根据父级id添加新的tag
    handleFloorInputConfirm() {
      const inputValue = this.addFloorValue
      if (inputValue) {
        axios.post(
      '/smartprint/print-room/company/price-book/create-set', qs.stringify({ name: inputValue, schoolId: this.$props.schoolID, upperId: this.choseTags[this.choseTags.length - 1].id }))
          .then(res => {
            if (res.data.code !== 0) return this.$message.error(res.data.msg)
            this.$emit('choseCompleteEvent')
          })
          .catch(err => err)
      }
      this.addFloorVisible = false
      this.addFloorValue = ''
    },
    // 楼层内添加完成之后调用
    getSets() {
      this.$emit('choseCompleteEvent')
    }
  }
}
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.tag-active {
  background: #d2d2d2 !important;
}
.tag-caontainer {
  padding: 55px 80px;
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
.tag-box {
  min-width: 150px;
  height: 50px;
  background: #fff;
  border: 1px solid #cccccc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 10px;
}
.tag-active {
  background: #d2d2d2 !important;
}
.el-icon-close {
  position: absolute;
  right: 5px;
  zoom: 1.5;
}

.floor:not(:first-child) {
  margin-top: 10px;
}
</style>
