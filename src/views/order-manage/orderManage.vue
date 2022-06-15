<template>
  <div class="app-container">
    <div v-show="viewType===0"
         style="padding-bottom:30px">
      <div style="min-height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">订单列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索条件 -->
        <div class="filter-container">
          <el-select clearable
                     @change="classSelectChange"
                     class="filter-item"
                     style="width: 200px"
                     v-model="listQuery.gradeId"
                     size="small"
                     placeholder="按年级筛选">
            <el-option v-for="item in gradeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable
                     class="filter-item"
                     style="width: 200px"
                     v-model="listQuery.classId"
                     size="small"
                     placeholder="按班级筛选">
            <el-option v-for="item in classList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable
                     class="filter-item"
                     style="width: 200px"
                     v-model="listQuery.officeId"
                     size="small"
                     placeholder="按科室筛选">
            <el-option v-for="item in officelist"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-select clearable
                     class="filter-item"
                     style="width: 200px"
                     v-model="listQuery.subjectId"
                     size="small"
                     placeholder="按学科筛选">
            <el-option v-for="item in subjectList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="handleSearch"
                    size="small"
                    style="width: 200px;"
                    class="filter-item"
                    placeholder="输入关键字搜索"
                    v-model="listQuery.kw">
          </el-input>
          <el-button class="filter-item"
                     style="position:absolute;right:40px;background:#000"
                     type="primary"
                     @click="handleCreate"
                     size="small"
                     icon="edit">添加订单</el-button>
          <div>
            <el-select clearable
                       class="filter-item"
                       style="width: 200px"
                       v-model="listQuery.type"
                       size="small"
                       placeholder="按类型筛选">
              <el-option v-for="item in typeSelectOpt"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-select clearable
                       class="filter-item"
                       style="width: 200px"
                       v-model="listQuery.status"
                       size="small"
                       placeholder="按状态筛选">
              <el-option v-for="item in  orderSelectStatus"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-button style="margin-left:50px"
                       class="filter-item"
                       type="primary"
                       @click="handleSearch"
                       size="small"
                       icon="edit">搜索</el-button>
            <el-button class="filter-item"
                       @click="handleReset"
                       size="small"
                       icon="edit">重置</el-button>
          </div>

        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>

      <!-- 表格 -->
      <!--                 @selection-change="handleSelectionChange" -->
      <el-table :data="list"
                v-loading.body="listLoading"
                element-loading-text=""
                @sort-change="tableSortChange"
                border
                fit
                highlight-current-row>

        <el-table-column align="center"
                         label='序号'
                         width="100">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>

        <el-table-column label="文印内容"
                         width="">
          <template slot-scope="scope">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="下单人"
                         width="">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="类型"
                         width="">
          <template slot-scope="scope">
            {{typeOption[scope.row.type] }}
          </template>
        </el-table-column>
        <el-table-column label="学科"
                         width="">
          <template slot-scope="scope">
            {{scope.row.subjectName }}
          </template>
        </el-table-column>
        <el-table-column label="份数"
                         width="">
          <template slot-scope="scope">
            {{scope.row.count}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="附件"
                         width="">
          <template slot-scope="scope">
            <a :href="scope.row.attachments"
               target="_blank">查看附件</a>
          </template>
        </el-table-column> -->
        <el-table-column label="状态"
                         width="">
          <template slot-scope="scope">
            <span :style="{color:orderStatus[scope.row.status].color}"> {{orderStatus[scope.row.status].name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格"
                         sortable="custom"
                         prop="price"
                         width="">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="订单时间"
                         prop="createTime"
                         sortable="custom"
                         width="">
        </el-table-column>

        <!-- <el-table-column label="订单名称"
                         width="100">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.userName  }} &nbsp; &nbsp;</span>
            </template>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="班级数量"
                         width="">
          <template slot-scope="scope">
            <template v-for="item in scope.row.userbaseinfoList">
              <span :key="item">{{ item.identifierId  }} &nbsp; &nbsp;</span>
            </template>

          </template>
        </el-table-column> -->

        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button icon="edit"
                       size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status!=='YiCheXiao'"
                       icon="delete"
                       size="small"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSizeChangeClass"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.currPage"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="listQuery.count"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-show="viewType==='add'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增订单</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div style="padding:50px">
        <el-form class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="70px"
                 style='width: 400px; margin-left:50px;'>

          <el-form-item label="订单名称">
            <el-input v-model="roleTemp.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onAddSubmit">上传</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div v-show="viewType==='edit'">
      <div style="padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">订单列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑订单</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px">
        <el-form :disabled="isEditOrder"
                 class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="120px"
                 style='width: 620px; margin-left:50px;'>
          <el-form class="small-space"
                   :model="roleTemp"
                   label-position="left"
                   label-width="120px">
            <el-form-item :disabled="false"
                          label="状态：">
              <span :style="{color:orderStatus[roleTemp.status]&&orderStatus[roleTemp.status].color}">{{orderStatus[roleTemp.status]&&orderStatus[roleTemp.status].name}}</span>
              <el-button style="margin-left:50px"
                         v-show="roleTemp.status=='DaiJieDan'"
                         type="primary"
                         plain
                         @click="ensureOrderHnadle('YiJieDan')"
                         size="small">确认接单</el-button>
              <el-button style="margin-left:50px"
                         v-show="roleTemp.status=='YiJieDan'"
                         type="primary"
                         plain
                         @click="ensureOrderHnadle('DaiQueRen')"
                         size="small">请用户确认</el-button>
              <el-button style="margin-left:50px"
                         v-show="roleTemp.status=='YiQueRen'"
                         type="primary"
                         plain
                         @click="ensureOrderHnadle('ShengChanZhong')"
                         size="small">确认生产</el-button>
              <el-button style="margin-left:50px"
                         v-show="roleTemp.status=='ShengChanZhong'"
                         type="primary"
                         plain
                         @click="ensureOrderHnadle('YiShangJia')"
                         size="small">确认上架</el-button>
              <el-button style="margin-left:50px"
                         v-show="roleTemp.status=='YiShangJia'"
                         type="primary"
                         plain
                         @click="ensureOrderHnadle('YiLingQu')"
                         size="small">确认领取</el-button>
            </el-form-item>
          </el-form>
          <el-form-item label="文印内容：">
            <el-input v-model="roleTemp.title"></el-input>
          </el-form-item>
          <el-form-item label="下单人：">
            <el-input v-model="roleTemp.userName"></el-input>
          </el-form-item>
          <el-form-item label="下单时间：">
            <el-date-picker v-model="roleTemp.createTime"
                            type="datetime">
            </el-date-picker>
            <!-- <el-input disabled
                      v-model="roleTemp.createTime"></el-input> -->
          </el-form-item>
          <el-form-item label="类型：">
            <!-- <el-input disabled
                      :value="typeOption[roleTemp.type]"></el-input> -->
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.type"
                       placeholder="类型：">
              <el-option v-for="item in  typeSelectOpt"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="roleTemp.type==='Subject'"
                        label="选择学科：">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.subjectId"
                       placeholder="学科：">
              <el-option v-for="item in  subjectList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <div v-if="roleTemp.type!=='Office'">
            <!-- <el-form-item label="年级：">
              <el-select clearable
                         @change="gradeChange"
                         class="filter-item"
                         v-model="roleTemp.grade">
                <el-option v-for="item in gradeList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="班级：">
              <el-select clearable
                         class="filter-item"
                         v-model="classval">
                <el-option v-for="item in classType"
                           :key="item.value"
                           :label="item.name"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="选择班级：">
              <div>
                <el-button @click="dialogPermissionsVisible=true">添加班级</el-button>
                <span>当前已添加 {{multipleSelection.length}} 个班级</span>
              </div>
              <div v-show="multipleSelection.length>0"
                   class="class-table-box">
                <div class="class-table-th">
                  <span>班级名称</span>
                  <span>操作</span>
                </div>
                <div class="class-table-td"
                     v-for="(item,index) in multipleSelection"
                     :key="item.id">
                  <span>{{item.name}}</span>
                  <el-button @click="deleteClass(index)"
                             type="text">移除</el-button>
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-if="roleTemp.type=='Office'">
            <el-form-item label="科室：">
              <!-- <el-input disabled
                        v-model="roleTemp.officeName"></el-input> -->
              <el-select clearable
                         class="filter-item"
                         v-model="roleTemp.officeId">
                <el-option v-for="item in  officelist"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="份数：">
            <el-input v-model="roleTemp.count"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="roleTemp.remark"></el-input>
          </el-form-item>
          <el-form-item label="附件：">
            <!-- https://dev.renx.cc/smartprint/upload-file -->
            <el-upload :show-file-list="false"
                       action="#"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="10"
                       :http-request="uploadHttpRequest"
                       :on-exceed="handleExceed">
              <el-button size="small"
                         style="background:#FF5C00;color:#FFF">上传附件</el-button>
            </el-upload>
            <div class="class-table-box">
              <div class="class-table-th">
                <span>附件</span>
                <span>操作</span>
              </div>
              <div class="class-table-td"
                   v-for="(item,index) in (roleTemp.attachmentFiles)"
                   :key="item.no">
                <a :href="'https://dev.renx.cc/'+item.url"
                   target="_blank"
                   style="width:80%;overflow:hidden;color:#0053B5">{{item.originalName}}</a>
                <el-button @click="deleteFile(index)"
                           type="text">移除</el-button>
              </div>
            </div>
          </el-form-item>
          <div class="module-title">文印配置</div>
          <div style="margin-top:20px">
            <!-- <div class="tabs-box">
              <el-button @click="tabsIndex=1"
                         :type="tabsIndex==1? 'primary':''">系统配置</el-button>
              <el-button @click="tabsIndex=2"
                         :type="tabsIndex==2? 'primary':''">学校配置</el-button>
            </div> -->
            <div v-show="tabsIndex==1">
              <!-- <div v-show="tabsIndex==false"> -->
              <!-- <el-form-item label-width="180"
                            label="文印规格及内容：">
              </el-form-item> -->
              <!-- <el-form-item> -->
              <priceSet :disabled="isEditOrder"
                        ref="priceSetRef" />
              <!-- <skuSets ref="sku"
                         @lastLevelChange="lastLevelChange"
                         :schoolId="this.roleTemp.schoolID"
                         :dynamicTags="dynamicTags" /> -->
              <!-- <div v-for="floor in maxFloor"
                     :key="floor"
                     data-upperId="0"
                     style="margin-top:10px"
                     class="floor">
                  <div class="tag-box"
                       :class="isActive(tag)?'tag-active':''"
                       @click="tagClick(tag,index)"
                       :key="tag.id"
                       v-for="(tag,index) in dynamicTags"
                       v-if="tag.upperId===floor">
                    {{tag.name}}
                  </div>
                </div> -->
              <!-- </el-form-item> -->
              <!-- <el-form-item v-show="isShowPrice"> -->
              <el-form-item v-show="false">
                <!-- 价格 -->
                <div v-for="(item,index) in priceData"
                     :key="item.id"
                     class="table-item">
                  <span class="table-item-cell">收费项</span>
                  <input readonly
                         v-model="item.name"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                  <!-- <span class="table-item-cell">单价￥</span>
                  <input v-model="item.unitPrice"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none"> -->
                  <span class="table-item-cell">数量</span>
                  <input v-model="item.count"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                </div>
              </el-form-item>
            </div>
            <div v-show="tabsIndex==2">
              <!-- 学校配置 -->
            </div>
            <div class="module-title"
                 style="margin-top:20px">备注内容</div>
            <el-form-item style="margin-top:20px"
                          label="备注内容：">
              <el-input placeholder="请输入"
                        v-model="roleTemp.printRoomRemark"></el-input>
            </el-form-item>
            <el-form-item label="上传小样：">
              <div style="border:1px solid #E2E2E2;padding:20px">
                <!-- https://dev.renx.cc/smartprint/upload-file -->
                <!-- :http-request="uploadHttpRequestOfSamples" -->
                <el-upload action="/smartprint/upload-file"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :before-remove="beforeRemove"
                           :on-success="succcessHandle"
                           multiple
                           :limit="10"
                           :on-exceed="handleExceed"
                           :file-list="fileList">
                  <el-button size="small"
                             style="background:#67C23A;color:#FFF">上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button style="background:#FF5C00;color:#FFF"
                       @click="submitHandle">确认上传</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 选择班级 -->
    <el-dialog title="选择您需要添加的班级"
               :visible.sync="dialogPermissionsVisible">
      <el-select clearable
                 @change="gradeChange"
                 class="filter-item"
                 placeholder="请选择年级"
                 v-model="claslistQuery.gradeId">
        <el-option v-for="item in gradeList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item"
                 type="primary"
                 @click="handleSearchClass"
                 size="small"
                 icon="edit">搜索</el-button>
      <!-- 表格 -->
      <el-table :row-key="getRowKey"
                style="margin-top:20px"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :data="classList"
                v-loading.body="listLoading"
                element-loading-text=""
                border
                fit
                highlight-current-row>
        <el-table-column :reserve-selection="true"
                         type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="班级名称"
                         width="">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="claslistQuery.currPage"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="claslistQuery.count"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogPermissionsVisible = false">取 消</el-button>

        <el-button type="primary"
                   @click="setPermissionsSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getList } from 'api/article';
import { global } from 'src/global/global'
import { api } from 'src/global/api'
import axios from 'axios'
import qs from 'qs'

import store from '@/store'

import skuSets from './children/sku-sets.vue'
import priceSet from './children/priceSet.vue'

export default {
  components: {
    skuSets,
    priceSet
  },
  data() {
    return {
      // list: null,
      listLoading: false,

      list: null, // 表格list
      smMenuBeanDtoList: null, // 菜单
      total: null,
      // listLoading: true,
      listQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },
      claslistQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      },
      roleTemp: {
        name: '',
        grade: ''
      },
      roleTemp2: {
        name: ''
      },
      ruleForm: {
        permissions: []
      },
      dialogFormVisible: false,
      dialogPermissionsVisible: false,
      multipleSelection: [],
      subjectList: [],
      officelist: [],

      viewType: 0, // 0 | add | edit
      gradeList: [],
      classList: [],
      classval: '',
      classType: [
        { name: '自定义班级', value: 'diy' },
        { name: '全部班级', value: 'allClasses' }
      ],
      fileList: [],
      maxFloor: [0], // 最高层数
      dynamicTags: [{ name: 1, id: 1 }],
      choseTags: [],
      priceData: [],
      tabsIndex: 1, // 1:系统配置  2：学校配置
      unUploadeData: '',
      samples: '', // 小样
      deleteClassIds: [],
      isShowPrice: false,
      multipleSelectionSouce: []
    }
  },
  computed: {
    typeSelectOpt() {
      return [
        { name: '科室', value: 'Office' },
        { name: '公共', value: 'Common' },
        { name: '学科', value: 'Subject' }
      ]
    },
    typeOption() {
      return {
        Office: '科室',
        Common: '公共',
        Subject: '学科'
      }
    },
    // 订单是否可编辑
    isEditOrder() {
      const statusArr = [
        'ShengChanZhong',
        'YiShangJia',
        'YiLingQu'
      ]
      if (statusArr.find(item => item === this.roleTemp.status)) return true
      return false
    },
    orderSelectStatus() {
      return [
        {
          name: '待文印室接单',
          value: 'DaiJieDan'
        },
        {
          name: '文印室已接单',
          value: 'YiJieDan'
        },
        {
          name: '待确认',
          value: 'DaiQueRen'
        },
        {
          name: '制作已确认',
          value: 'YiQueRen'
        },
        {
          name: '生产中',
          value: 'ShengChanZhong'
        },
        {
          name: '已上架',
          value: 'YiShangJia'
        },
        {
          name: '已领取',
          value: 'YiLingQu'
        },
        {
          name: '已撤销',
          value: 'YiCheXiao'
        }
      ]
    },
    orderStatus() {
      return {
        DaiJieDan: {
          name: '待文印室接单',
          color: '#FF5C00'
        },
        YiJieDan: {
          name: '文印室已接单',
          color: '#333333'
        },
        DaiQueRen: {
          name: '待确认',
          color: '#FF0000'
        },
        YiQueRen: {
          name: '制作已确认',
          color: '#FF0000'
        },
        ShengChanZhong: {
          name: '生产中',
          color: '#00B13C'
        },
        YiShangJia: {
          name: '已上架',
          color: '#FF5C00'
        },
        YiLingQu: {
          name: '已领取',
          color: '#333333'
        }
      }
    }
  },
  watch: {
    dialogPermissionsVisible(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.multipleSelection.forEach(item => {
            this.classList.forEach(citem => {
              if (item.id == citem.id) {
                this.$refs.multipleTable.toggleRowSelection(citem, true)
              }
            })
          })
        }, 0)
      }
    }
  },
  mounted() {
    const vm = this
    vm.getList()
    this.getListLen()
    this.setViewByQuery()
    this.editView()
    this.getGradeList()
    this.getClassList()
    this.getOfficeList()
    this.getSubjectList()
  },
  methods: {
    lastLevelChange(boo) {
      // alert(boo)
      this.isShowPrice = boo
    },
    // 获取列表数据
    getList() {
      const vm = this

      vm.listLoading = true
      axios
        .post(
          '/smartprint/print-room/order/get-orders',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.list = res.data.data.printOrders
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取列表数据总数
    getListLen() {
      const params = JSON.parse(JSON.stringify(this.listQuery))
      params.isSum = 1
      axios
        .post('/smartprint/print-room/order/get-orders', qs.stringify(params))
        .then(res => {
          this.total = res.data.data.sum.count
          console.log(this.total)
        })
        .catch(err => console.log(err))
    },
    classSelectChange(val) {
      this.getClassList({ gradeId: val })
    },
    // table排序
    tableSortChange(column) {
      const sortMap = {
        ascending: 'asc',
        descending: 'desc'
      }
      if (column.order) {
        this.listQuery.sorts = column.prop
        this.listQuery.orders = sortMap[column.order]
      } else {
        this.listQuery.orders = this.listQuery.sorts = ''
      }

      this.listQuery.currPage = this.listQuery.start = 1
      this.getList()
    },
    // 获取年级列表
    getGradeList() {
      const vm = this
      vm.listLoading = true
      axios
        .post(
          '/smartprint/print-room/grade/get-grades',
          qs.stringify(vm.listQuery)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          const arr = [{ name: '全部班级', id: '' }]
          vm.gradeList = [...arr, ...res.data.data.grades]
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取班级列表
    getClassList(params = {}) {
      const vm = this

      vm.listLoading = true
      axios
        .post('/smartprint/print-room/class/get-classes', qs.stringify(params))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.classList = res.data.data.classes
          // setTimeout(() => {
          //   vm.multipleSelection.forEach(item => {
          //     vm.classList.forEach(citem => {
          //       if (item.id == citem.id) {
          //         vm.$refs.multipleTable.toggleRowSelection(citem, true);
          //       }
          //     })
          //   })
          // }, 0)
        })
        .catch(err => err)
      vm.listLoading = false
    },
    // 获取学科列表
    getSubjectList() {
      const vm = this
      axios
        .post('/smartprint/print-room/subject/get-subjects')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.subjectList = res.data.data.subjects
        })
        .catch(err => err)
    },
    // 获取科室列表
    getOfficeList() {
      const vm = this
      axios
        .post('/smartprint/print-room/office/get-offices')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          vm.officelist = res.data.data.offices
        })
        .catch(err => err)
    },
    onAddSubmit() {
      const vm = this
      axios
        .post(
          '/smartprint/print-room/order/create-order',
          qs.stringify(vm.roleTemp)
        )
        .then(res => {
          if (res.data.code !== 0) return vm.$message.error(res.data.msg)
          vm.$message.success('新增成功')
          for (const key in this.roleTemp) {
            this.roleTemp[key] = ''
          }
          this.$router.push({
            path: '/orderManage/orderManage'
          })
        })
        .catch(err => console.log(err))
    },
    // 根据当前路由参数切换视图
    setViewByQuery() {
      const { extra } = this.$route.query
      if (!extra) this.viewType = 0
      else this.viewType = extra
    },
    getRowKey(row) {
      return row.id
    },
    gradeChange() {
      this.$forceUpdate()
    },
    // 获取最高层数
    getMaxFloor(list) {
      const upperIds = list.map(item => item.upperId)
      return [...new Set(upperIds)].sort()
    },
    // 获取文印规格设置
    getSets() {
      axios
        .post(
          '/smartprint/print-room/price-book/get-sets',
          qs.stringify({ schoolId: this.roleTemp.schoolID })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.dynamicTags = res.data.data.sets
          this.maxFloor = this.getMaxFloor(this.dynamicTags)
          console.log(this.dynamicTags)
          console.log(this.maxFloor)
        })
        .catch(err => err)
    },
    // 获取价格设置
    getPrices() {
      const params = {
        schoolId: this.roleTemp.schoolId,
        setIds: this.choseTags.map(item => item.id).join(',')
      }
      axios
        .post(
          '/smartprint/print-room/price-book/get-prices',
          qs.stringify(params)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.priceData = res.data.data.prices || []
        })
        .catch(err => err)
    },
    isActive(tag) {
      const ids = this.choseTags.map(item => item.id)
      return ids.find(item => tag.id === item)
    },
    tagClick(tag, index) {
      const ids = this.choseTags.map(item => item.id)
      // 数组中存在删除
      if (ids.find(item => tag.id === item)) {
        for (let i = 0; i < this.choseTags.length; i++) {
          if (this.choseTags[i].id === tag.id) {
            this.choseTags.splice(i, 1)
          }
        }
      } else {
        // 不存在添加
        this.choseTags.push(tag)
        console.log('不存在')
      }
      this.getPrices()
    },
    // 编辑回显
    editView() {
      const { id } = this.$route.query
      if (id) {
        axios
          .post(
            '/smartprint/print-room/order/get-order',
            qs.stringify({ orderId: id })
          )
          .then(res => {
            console.log(res)
            if (res.data.code !== 0) return this.$message.error(res.data.msg)
            // this.roleTemp2 = res.data.data.order
            this.roleTemp = res.data.data.order
            // this.roleTemp.allGrades == 1 ? this.roleTemp.grade = 'allGrades' : this.roleTemp.grade = this.roleTemp.grades[0].gradeId
            // this.roleTemp.allClasses == 1 ? this.classval = 'allClasses' : this.classval = 'diy'
            this.roleTemp.classes
              ? this.roleTemp.classes = this.roleTemp.classes.map(item => {
                item.id = item.classId
                item.name = item.className
                return item
              })
              : this.roleTemp.classes = []

            this.multipleSelection = this.roleTemp.classes

            if (this.roleTemp.sampleFiles) {
              if (this.fileList.length > 0) this.fileList = []
              this.roleTemp.samples = ''
              this.roleTemp.sampleFiles.forEach((item, index) => {
                this.fileList.push({ name: item.originalName, url: item.url })
              })
            }
            this.$refs.priceSetRef.params = this.roleTemp
            // this.getSets()
            // this.getPrices()
          })
          .catch(err => console.log(err))
      }
    },
    // 编辑
    handleEdit(index, { id }) {
      const vm = this
      console.log('编辑的row：', index, '-----', id)
      // 跳页面进行修改
      // this.$router.push('/example/form');
      this.$router.push({
        path: '/orderManage/orderManage',
        query: { extra: 'edit', id }
      }) // 带参跳转
    },
    // 确认接单
    ensureOrderHnadle(status) {
      const { id } = this.roleTemp
      axios
        .post(
          '/smartprint/print-room/order/update-order',
          qs.stringify({ orderId: id, status })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('操作成功')
          this.editView()
        })
        .catch(err => err)
    },
    // 删除附件
    deleteFile(index) {
      this.roleTemp.attachmentFiles.splice(index, 1)
    },
    // 编辑上传
    submitHandle() {
      const {
        id,
        title,
        grade,
        userName,
        count,
        remark,
        printRoomRemark,
        type,
        subjectId,
        officeId,
        createTime
      } = this.roleTemp
      // const priceData = this.priceData
      this.priceData.forEach(item => {
        item.totalPrice = (item.count - 0) * (item.unitPrice - 0)
      })
      const {
        jiaoYingDanBanShu,
        jiaoYingDanFenShu,
        jiaoYingShuangBanShu,
        jiaoYingShuangFenShu,
        jiaoYingDaDanBanShu,
        jiaoYingDaDanFenShu,
        jiaoYingDaShuangBanShu,
        jiaoYingDaShuangFenShu,
        otherSetName,
        otherSetCount,
        otherSetUnitPrice,
        fuYingB5Shu,
        fuYingB4Shu,
        fuYingA4Shu,
        fuYingA3Shu,
        daYingShu,
        daBanShu
      } = this.$refs.priceSetRef.params
      const params = {
        orderId: id,
        title,
        count,
        userName,
        remark,
        createTime,
        type,
        subjectId: type === 'Subject' ? subjectId : '',
        officeId: type === 'Office' ? officeId : '',
        printRoomRemark,
        jiaoYingDanBanShu,
        jiaoYingDanFenShu,
        jiaoYingShuangBanShu,
        jiaoYingShuangFenShu,
        jiaoYingDaDanBanShu,
        jiaoYingDaDanFenShu,
        jiaoYingDaShuangBanShu,
        jiaoYingDaShuangFenShu,
        fuYingB5Shu,
        fuYingB4Shu,
        fuYingA4Shu,
        fuYingA3Shu,
        daYingShu,
        daBanShu,
        otherSetName,
        otherSetCount,
        otherSetUnitPrice,
        samples: this.samples + ',' + this.fileList.join(','),
        printSetType: this.tabsIndex == 1 ? 'System' : 'School',
        printSetPrices: this.priceData,
        attachments:
          this.roleTemp.attachmentFiles &&
          this.roleTemp.attachmentFiles.map(item => item.url).join(','),
        // grades: grade == 'allGrades' ? this.gradeList.splice(1).map(item => item.id).join(',') : grade,
        // classes: this.classval == 'allClasses' ? this.classList.map(item => item.id).join(',') : this.multipleSelection.map(item => item.id).join(',')
        classIds: this.multipleSelection.map(item => item.id).join(','),
        deleteClassIds: [...new Set(this.deleteClassIds)].join(',')
      }
      axios
        .post('/smartprint/print-room/order/update-order', qs.stringify(params))
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('修改成功')
          this.editView()
        })
        .catch(err => err)
    },
    // 单个删除（撤销）
    handleDelete(index, { id }) {
      const vm = this
      console.log('单个删除选择的row：', index, '-----', id)
      axios
        .post(
          '/smartprint/print-room/order/update-order',
          qs.stringify({ orderId: id, status: 'YiCheXiao' })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('撤销成功')
          // this.getListLen()
          // 前端更新。
          vm.list[index].status = 'YiCheXiao'
          // vm.list.splice(index, 1)
        })
        .then(err => err)
    },
    // 搜索
    handleFilter() {
      this.getList()
    },
    // 操作分页
    handleSizeChange(val) {
      this.listQuery.count = val

      this.getList()
    },
    // 班级操作分页
    handleSizeChangeClass(val) {
      this.claslistQuery.count = val

      this.getList()
    },
    // 操作分页
    handleCurrentChange(val) {
      console.log('--------', val)
      this.listQuery.currPage = val
      this.listQuery.start = this.listQuery.count * (val - 1) + 1

      this.getList()
    },
    // 新增
    handleCreate() {
      this.$router.push({
        path: '/orderManage/orderManage',
        query: { extra: 'add' }
      }) // 带参跳转
    },
    // 设置权限
    setPermissions(index, item) {
      const vm = this
      global.get(
        api.getMenuAndElement,
        { params: { roleId: item.smRoleBeanDto.id } },
        res => {
          console.log('-------获取到数据：', JSON.stringify(res))
          const data = res.body
          if (data.resultCode == 0) {
            vm.smMenuBeanDtoList = data.data.smMenuBeanDtoList
            console.log('列表数据：', vm.smMenuBeanDtoList)
          } else {
            // alert(res.body.resultMsg)
            Message({
              showClose: true,
              message: res.body.resultMsg,
              type: 'error'
            })
          }

          vm.dialogPermissionsVisible = true
        },
        res => {
          vm.dialogPermissionsVisible = true
        },
        true
      )
    },
    // 设置权限提交
    setPermissionsSubmit() {
      this.multipleSelection = this.multipleSelectionSouce
      this.dialogPermissionsVisible = false
    },
    handleSelectionChange(val) {
      // console.log(val)
      // this.multipleSelection = val
      this.multipleSelectionSouce = val
    },
    handleSearch() {
      this.getList()
      this.getListLen()
    },
    handleSearchClass() {
      this.getClassList(this.claslistQuery)
    },
    handleReset() {
      this.listQuery = {
        currPage: 1,
        count: 10,
        start: 1,
        kw: ''
      }
      this.getList()
      this.getListLen()
    },
    deleteClass(index) {
      this.deleteClassIds.push(this.multipleSelection[index].id)

      if (this.$refs.multipleTable) {
        this.$refs.multipleTable.toggleRowSelection(
          this.multipleSelection[index],
          false
        )
      } else {
        this.multipleSelection.splice(index, 1)
      }
    },

    // 上传相关
    succcessHandle(response) {
      this.samples ? this.samples += ',' + response.data.url : this.samples = response.data.url
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
      if (file.response) {
        window.open('https://view.officeapps.live.com/op/view.aspx?src=https://dev.renx.cc/' + file.response.data.url)
      } else {
        window.open('https://view.officeapps.live.com/op/view.aspx?src=https://dev.renx.cc/' + file.url)
      }
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 覆盖element的默认上传文件
    uploadHttpRequest(param) {
      // 获取上传的文件名
      const file = param.file
      // 发送请求的参数格式为FormData
      const formData = new FormData()
      formData.append('file', file)
      axios.post('/smartprint/upload-file', formData).then(res => {
        if (res.data.code !== 0) {
          return this.$message.error(res.data.msg)
        }
        this.roleTemp.attachmentFiles = this.roleTemp.attachmentFiles
          ? this.roleTemp.attachmentFiles
          : []
        this.roleTemp.attachmentFiles.push(res.data.data)
        this.$forceUpdate()
      })
    },
    // 覆盖element的默认上传文件
    uploadHttpRequestOfSamples(param) {
      // 获取上传的文件名
      const file = param.file
      // 发送请求的参数格式为FormData
      const formData = new FormData()
      formData.append('file', file)
      axios.post('/smartprint/upload-file', formData).then(res => {
        if (res.data.code !== 0) {
          return this.$message.error(res.data.msg)
        }
        this.samples = res.data.data.url + ',' + this.samples
      })
    }
  }
}
</script>

<style scoped>
.class-table-box {
  min-width: 500px;
  min-height: 50px;
  margin-top: 30px;
}
.class-table-th {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #f6f8f9;
  padding: 0 50px;
  border: 1px solid #cccccc;
}
.class-table-td {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* background: #f6f8f9; */
  padding: 0 50px;
  border: 1px solid #cccccc;
  border-top: none;
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
.table-item {
  display: flex;
  align-items: center;
}
.table-item-cell {
  padding: 10px;
  width: 20%;
  height: 60px !important;
  border: 1px solid #cccccc;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.module-title {
  width: calc(100vw - 250px);
  position: relative;
  left: -100px;
  background: #0053b50d;
  font-size: 15px;
  height: 42px;
  display: flex;
  align-items: center;
  color: #0053b5;
  padding-left: 20px;
}
.tabs-box {
  width: calc(100vw - 250px);
  position: relative;
  left: -100px;
  border-bottom: 1px solid #cccccc;
  padding-left: 60px;
  margin-bottom: 20px;
}
</style>
