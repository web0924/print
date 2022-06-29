<template>
  <div class="app-container">
    <div v-show="viewType===0"
         style="padding-bottom:30px">
      <div style="min-height:120px;padding-left:20px">
        <div style="height:60px;display:flex;align-items:center">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">学科订单</el-breadcrumb-item>
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
          <!-- <el-select clearable
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
          </el-select> -->
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

          <el-select class="filter-item"
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
          <el-select multiple
                     collapse-tags
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
            <el-date-picker value-format="yyyy-MM-dd 00:00:00"
                            class="filter-item"
                            v-model="listQuery.startTime"
                            type="date"
                            size="small"
                            placeholder="开始日期">
            </el-date-picker>
            <el-date-picker value-format="yyyy-MM-dd 23:59:59"
                            class="filter-item"
                            v-model="listQuery.endTime"
                            type="date"
                            size="small"
                            placeholder="结束日期">
            </el-date-picker>
            <el-select clearable
                       class="filter-item"
                       style="width: 200px"
                       v-model="listQuery.isGuanZhang"
                       size="small"
                       placeholder="是否关账">
              <el-option v-for="item in guanZhangSelectOpt"
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
      <p style="min-height:80px;width:100%;background:#F5F5F5;margin:0">
        <el-button @click="exportAll"
                   style="margin-top:20px; background:#09BB07;color:#FFF">全部导出</el-button>
        <!-- <el-button @click="validICTableGroup"
                   style="margin-top:20px; background:#09BB07;color:#FFF">批量领取</el-button> -->
      </p>
      <!-- 表格 -->
      <!-- @selection-change="handleSelectionChange" -->
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
        <el-table-column label="年级"
                         width="">
          <template slot-scope="scope">
            {{scope.row.gradeName }}
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
        <!-- <el-table-column label="价格"
                         sortable="custom"
                         prop="price"
                         width="">
          <template slot-scope="scope">
            {{scope.row.price}}
          </template>
        </el-table-column> -->
        <el-table-column label="订单时间"
                         prop="createTime"
                         sortable="custom"
                         width="200">
        </el-table-column>
        <el-table-column label="是否关账">
          <template slot-scope="scope">
            {{scope.row.isGuanZhang==1?'已关账':''}}
          </template>
        </el-table-column>

        <el-table-column align="left"
                         width="300"
                         label="操作">
          <template slot-scope="scope">
            <el-button v-show="scope.row.status=='DaiJieDan'"
                       type="primary"
                       plain
                       @click="tableOrderStatuHandle('YiJieDan',scope.row,scope.$index)"
                       size="small">确认接单</el-button>
            <el-button v-show="scope.row.status=='YiJieDan'"
                       type="primary"
                       plain
                       @click="tableOrderStatuHandle('DaiQueRen',scope.row,scope.$index)"
                       size="small">请用户确认</el-button>
            <el-button v-show="scope.row.status=='YiQueRen'"
                       type="primary"
                       plain
                       @click="tableOrderStatuHandle('ShengChanZhong',scope.row,scope.$index)"
                       size="small">确认生产</el-button>
            <el-button v-show="scope.row.status=='ShengChanZhong'"
                       type="primary"
                       plain
                       @click="tableOrderStatuHandle('YiShangJia',scope.row,scope.$index)"
                       size="small">确认上架</el-button>
            <el-popover placement="top-start"
                        title="领取方式"
                        trigger="click">
              <el-button @click="validICTable(scope.row,scope.$index)">IC卡领取</el-button>
              <el-button @click="unValidICTable(scope.row)">直接领取</el-button>
              <el-button v-show="scope.row.status=='YiShangJia'"
                         slot="reference"
                         type="primary"
                         plain
                         size="small">确认领取</el-button>
            </el-popover>
            <el-button icon="edit"
                       size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <template>
              <el-popconfirm @confirm="handleDelete(scope.$index, scope.row)"
                             title="确定撤销吗？">
                <el-button v-if="isWithDrawOrder(scope.row.status)"
                           slot="reference"
                           icon="delete"
                           size="small"
                           type="danger">撤销</el-button>
              </el-popconfirm>
            </template>
            <!-- <el-button v-if="scope.row.status!=='YiCheXiao'"
                       icon="delete"
                       size="small"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">撤销</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
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
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">学科订单</el-breadcrumb-item>
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

          <el-form-item label="订单类型">
            <el-select clearable
                       class="filter-item"
                       v-model="roleTemp.type">
              <el-option v-for="item in typeSelectOpt"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文印内容">
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
            <el-breadcrumb-item :to="{ path: '/orderManage/orderManage' }">学科订单</el-breadcrumb-item>
            <el-breadcrumb-item>编辑订单</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <p style="height:15px;width:100%;background:#F5F5F5;margin:0"></p>
      <div style="padding:50px;display: flex;">
        <el-form :disabled="isEditOrder"
                 class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 label-width="120px"
                 style='width: 50%;'>
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
              <el-popover placement="top-start"
                          title="领取方式"
                          trigger="click">
                <el-button @click="validIC">IC卡领取</el-button>
                <el-button @click="unValidICTable(roleTemp)">直接领取</el-button>
                <el-button style="margin-left:50px"
                           v-show="roleTemp.status=='YiShangJia'"
                           type="primary"
                           slot="reference"
                           plain
                           size="small">确认领取</el-button>
              </el-popover>

            </el-form-item>
          </el-form>
          <el-form-item v-if="roleTemp.status==='YiLingQu'"
                        label="领取方式：">
            <span>{{lingQuFangShi[roleTemp.lingQuFangShi] }}</span>
          </el-form-item>
          <el-form-item label="是否关账：">
            <span>{{roleTemp.isGuanZhang==1?'已关账':'未关账'}}</span>
          </el-form-item>
          <el-form-item label="文印内容：">
            <el-input class="form-item-width"
                      v-model="roleTemp.title"></el-input>
          </el-form-item>
          <el-form-item label="下单人：">
            <!-- <el-input v-model="roleTemp.userName"></el-input> -->
            <el-select clearable
                       filterable
                       v-model="roleTemp.userId"
                       @change="staffChange"
                       class="filter-item form-item-width">
              <el-option v-for="item in  staffList"
                         :key="item.userId"
                         :label="item.userName+' / '+item.officeName+' / '+item.subjectName "
                         :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="roleTemp.yongHuQueRenQianZi"
                        label="下单人签名：">
            <viewer :trigger="roleTemp.yongHuQueRenQianZi">
              <img style="width:100px;height:100px;"
                   :src="roleTemp.yongHuQueRenQianZi">
            </viewer>
          </el-form-item>
          <el-form-item label="下单时间：">
            <el-date-picker class="form-item-width"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="roleTemp.createTime"
                            type="datetime">
            </el-date-picker>
            <!-- <el-input disabled
                      v-model="roleTemp.createTime"></el-input> -->
          </el-form-item>
          <el-form-item label="类型：">
            <!-- <el-input disabled
                      :value="typeOption[roleTemp.type]"></el-input> -->
            <el-select clearable
                       class="filter-item form-item-width"
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
                       class="filter-item form-item-width"
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
            <el-form-item label="年级：">
              <el-input class="form-item-width"
                        disabled
                        :value="currentStaff.gradeName"></el-input>
              <!-- <el-select clearable
                         @change="gradeChange"
                         class="filter-item"
                         v-model="roleTemp.grade">
                <el-option v-for="item in gradeList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select> -->
            </el-form-item>
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
                <!-- dialogPermissionsVisible=true -->
                <el-button @click="addClassDialogHnadle">添加班级</el-button>
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
                         class="filter-item form-item-width"
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
            <el-input class="form-item-width"
                      v-model="roleTemp.count"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input class="form-item-width"
                      v-model="roleTemp.remark"></el-input>
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
          <!-- <div class="module-title">文印配置</div> -->
          <!-- <div style="margin-top:20px">
            <div v-show="tabsIndex==1">
              <priceSet :disabled="isEditOrder"
                        ref="priceSetRef" />
              <el-form-item v-show="false">
                <div v-for="(item,index) in priceData"
                     :key="item.id"
                     class="table-item">
                  <span class="table-item-cell">收费项</span>
                  <input readonly
                         v-model="item.name"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                  <span class="table-item-cell">数量</span>
                  <input v-model="item.count"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                </div>
              </el-form-item>
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
          </div> -->
          <el-form-item>
            <el-button type="primary"
                       @click="submitHandle">提交</el-button>
          </el-form-item>
        </el-form>
        <el-form :disabled="isEditOrder"
                 class="small-space"
                 :model="roleTemp"
                 label-position="left"
                 style="width:50%"
                 label-width="120px">
          <div class="module-title">文印配置</div>
          <div style="margin-top:20px">
            <div v-show="tabsIndex==1">
              <priceSet :disabled="isEditOrder"
                        ref="priceSetRef" />
              <el-form-item v-show="false">
                <div v-for="(item,index) in priceData"
                     :key="item.id"
                     class="table-item">
                  <span class="table-item-cell">收费项</span>
                  <input readonly
                         v-model="item.name"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                  <span class="table-item-cell">数量</span>
                  <input v-model="item.count"
                         class="table-item-cell"
                         placeholder="请输入"
                         style="background:#FFF; outline: none">
                </div>
              </el-form-item>
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
          <div class="module-title need-print">通知单</div>
          <div style="margin-top:20px"></div>
          <noticeTable ref="noticeTableRef" />
        </el-form>
      </div>
    </div>

    <!-- 选择班级 -->
    <el-dialog title="选择您需要添加的班级"
               :visible.sync="dialogPermissionsVisible">
      <!-- <el-select clearable
                 @change="gradeChange"
                 class="filter-item"
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
                 icon="edit">搜索</el-button> -->
      <span>年级：{{currentStaff.gradeName}}</span>
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
      <div class="pagination-container">
        <el-pagination @size-change="handleClassSizeChange"
                       @current-change="handleClassCurrentChange"
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

    <!-- 领取 -->
    <!-- const { id } = this.$route.query -->
    <el-dialog title="IC卡验证"
               @close="dialogICVisible=false"
               :visible="dialogICVisible">
      <p>{{this.tips}}</p>
      <el-steps :active="active"
                finish-status="success">
        <el-step description="请将IC卡放入感应区内"
                 title="连接设备"></el-step>
        <el-step :description="tfUID"
                 title="获取卡号"></el-step>
        <el-step :description="tfBlockData"
                 title="读取卡内数据"></el-step>
        <el-step title="验证身份"></el-step>
      </el-steps>
      <el-button v-if="active<=3"
                 style="margin-top: 12px;"
                 @click="next">下一步</el-button>
      <div slot="footer"
           class="dialog-footer">
        <el-button :disabled="!isValidSuccess"
                   @click="ensureOrderHnadle('YiLingQu')"
                   type="primary">领取</el-button>
      </div>
    </el-dialog>
    <!-- 批量领取 -->
    <!-- const { id } = this.$route.query -->
    <el-dialog title="批量领取"
               @close="dialogICGroupVisible=false"
               :visible="dialogICGroupVisible">
      <p>{{this.tips}}</p>
      <el-steps :active="active"
                finish-status="success">
        <el-step description="请将IC卡放入感应区内"
                 title="连接设备"></el-step>
        <el-step :description="tfUID"
                 title="获取卡号"></el-step>
        <el-step :description="tfBlockData"
                 title="获取卡内数据"></el-step>
        <el-step title="查询可领取的订单"></el-step>
      </el-steps>
      <el-button v-if="active<=3"
                 style="margin-top: 12px;"
                 @click="next2">下一步</el-button>
      <div slot="footer"
           class="dialog-footer">
        <el-button :disabled="!isValidSuccess"
                   @click="ensureOrderHnadle('YiLingQu')"
                   type="primary">领取</el-button>
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
import noticeTable from './children/noticeTable.vue'

const GFUNC = {
  M1_findCard: 1,
  M1_authentication: 2,
  M1_read: 3,
  M1_write: 4,
  M1_initVal: 5,
  M1_increment: 6,
  M1_decrement: 7,
  M1_readVal: 8,
  M1_updateKey: 9
};

const g_device = '00'; // 设备句柄号
let g_isOpen = false;
let g_blockAddr = 2;
let g_blockData;
const g_key = 'FFFFFFFFFFFF'
const g_keyType = 60;
let g_vale;
let g_wantFunc = 0;

export default {
  components: {
    skuSets,
    priceSet,
    noticeTable
  },
  data() {
    return {
      dialogICVisible: false,
      dialogICGroupVisible: false,
      active: 0,
      tips: '', // 提示
      tfUID: '', // 卡号
      tfBlockData: '', // 读取的数据
      isValidSuccess: false, // 身份验证是否成功

      // list: null,
      listLoading: false,

      list: null, // 表格list
      smMenuBeanDtoList: null, // 菜单
      total: null,
      // listLoading: true,
      classListQuery: {
        currPage: 1,
        count: 10,
        start: 1
      },
      listQuery: {
        currPage: 1,
        count: 10,
        start: 1,
        kw: '',
        types: 'Subject,Common,Class'
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
      multipleSelectionSouce: [],

      staffList: [],
      currentStaff: {
      }
    }
  },
  computed: {
    typeSelectOpt() {
      return [
        // { name: '科室', value: 'Office' },
        { name: '公共', value: 'Common' },
        { name: '学科', value: 'Subject' },
        { name: '班级', value: 'Class' }
      ]
    },
    typeOption() {
      return {
        Office: '科室',
        Common: '公共',
        Subject: '学科',
        Class: '班级'
      }
    },
    guanZhangSelectOpt() {
      return [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ]
    },
    // 订单是否可编辑
    isEditOrder() {
      const statusArr = [
        'ShengChanZhong',
        'YiShangJia',
        'YiLingQu',
        'YiCheXiao'
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
        },
        YiCheXiao: {
          name: '已撤销',
          color: '#333333'
        }
      }
    },
    // 处理筛选参数
    listQueryReset() {
      if (!this.listQuery.status) return this.listQuery
      this.listQuery.statuses = this.listQuery.status.join(',')
      return this.listQuery
    },
    // 领取方式
    lingQuFangShi() {
      return {
        Direct: '直接领取',
        IC: 'IC卡领取'
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
    this.getStaffList()

    this.icTips()
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
          qs.stringify(vm.listQueryReset)
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
      const params = JSON.parse(JSON.stringify(this.listQueryReset))
      params.isSum = 1
      axios
        .post('/smartprint/print-room/order/get-orders', qs.stringify(params))
        .then(res => {
          this.total = res.data.data.sum.count
          console.log(this.total)
        })
        .catch(err => console.log(err))
    },
    // 教职工选择事件
    staffChange(val) {
      this.currentStaff = this.staffList.filter(item => item.userId === val)[0]

      // if (this.currentStaff.userId !== val) {
      this.roleTemp.userName = this.currentStaff.userName
      this.multipleSelection = []
      // }
    },
    // 导出
    exportAll() {
      if (!this.listQuery.gradeId) return this.$message.warning('请选择年级')
      if (!this.listQuery.startTime) return this.$message.warning('请选择开始时间')
      if (!this.listQuery.endTime) return this.$message.warning('请选择结束时间')
      axios
        .post(
          '/smartprint/print-room/order/export-bill',
          qs.stringify(this.listQueryReset)
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          window.open('https://dev.renx.cc/' + res.data.data.url)
        })
        .catch(err => err)
    },
    classSelectChange(val) {
      this.getClassList({ gradeId: val })
    },
    addClassDialogHnadle() {
      // console.log(this.currentStaff)
      this.getClassList({ gradeId: this.currentStaff.gradeId || '' })
      this.dialogPermissionsVisible = true
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
          // const arr = [{ name: '全部班级', id: '' }]
          // vm.gradeList = [...arr, ...res.data.data.grades]
          vm.gradeList = res.data.data.grades
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
    // 获取教师列表
    getStaffList() {
      axios
        .post('/smartprint/print-room/staff/get-staffs')
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.staffList = res.data.data.staffs || []
          if (this.staffList) {
            this.currentStaff = this.staffList.filter(item => item.userId == this.roleTemp.userId)[0] || {}
            // console.log(this.currentStaff)
          }
        })
        .catch(err => err)
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
    // 是否可撤销
    isWithDrawOrder(status) {
      console.log(status)
      const statusArr = [
        'ShengChanZhong',
        'YiShangJia',
        'YiLingQu',
        'YiCheXiao'
      ]
      if (statusArr.find(item => item === status)) return false
      return true
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
            this.$refs.noticeTableRef.params = this.roleTemp

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
    // 修改table订单状态
    tableOrderStatuHandle(status, row, index) {
      const { id } = row
      axios
        .post(
          '/smartprint/print-room/order/update-order',
          qs.stringify({ orderId: id, lingQuFangShi: 'IC', status })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('操作成功')
          //  前端更新table状态
          this.list[index].status = status
        })
        .catch(err => err)
    },
    // 修改订单状态
    ensureOrderHnadle(status) {
      const { id } = this.roleTemp
      axios
        .post(
          '/smartprint/print-room/order/update-order',
          qs.stringify({ orderId: id, lingQuFangShi: 'IC', status })
        )
        .then(res => {
          if (res.data.code !== 0) return this.$message.error(res.data.msg)
          this.$message.success('操作成功')
          this.editView()
          this.getList()
          this.dialogICVisible = false
          // 对于table已领取状态的兼容
          // if (status == 'YiLingQu') {
          //   const index = this.list.findIndex(item => item.id == id)
          //   this.validSuccessCallback(index)
          //   this.dialogICVisible = false
          // }
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
        userId,
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
      const {
        jingBan,
        zhiBan,
        jieDan,
        fenJian,
        jiaoHuoShiJian,
        yinShuaYaoQiu,
        yinShuaRen,
        yinShuaFei } = this.$refs.noticeTableRef.params
      const params = {
        orderId: id,
        title,
        count,
        userId,
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
        jingBan, // 通知单配置start
        zhiBan,
        jieDan,
        fenJian,
        jiaoHuoShiJian,
        yinShuaYaoQiu,
        yinShuaRen,
        yinShuaFei, // 通知单配置end
        samples: this.samples + ',' + this.fileList.join(','),
        printSetType: this.tabsIndex == 1 ? 'System' : 'School',
        // printSetPrices: this.priceData,
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
    handleDelete(index, row) {
      const vm = this
      const params = row
      params.orderId = row.id
      params.status = 'YiCheXiao'
      axios
        .post(
          '/smartprint/print-room/order/update-order',
          qs.stringify(params)
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
    // 班级分页
    handleClassSizeChange(val) {
      this.classListQuery.count = val
      this.getClassList(this.classListQuery)
    },
    // 操作分页
    handleCurrentChange(val) {
      console.log('--------', val)
      this.listQuery.currPage = val
      this.listQuery.start = this.listQuery.count * (val - 1) + 1

      this.getList()
    },
    // 班级分页
    handleClassCurrentChange(val) {
      this.classListQuery.currPage = val
      this.classListQuery.start = this.classListQuery.count * (val - 1) + 1

      this.getClassList(this.classListQuery)
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
    // 选择班级提交
    setPermissionsSubmit() {
      this.multipleSelection = this.multipleSelectionSouce
      this.dialogPermissionsVisible = false
    },
    handleSelectionChange(val) {
      if (this.roleTemp.type == 'Class') {
        this.multipleSelectionSouce = [val[0]];
        if (val.length > 1) {
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(val.pop());
        }
      } else {
        this.multipleSelectionSouce = val
      }
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
        kw: '',
        types: 'Subject,Common,Class'
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
    },
    // 领取成功回调
    validSuccessCallback(index) {
      this.list[index].status = 'YiLingQu'
    },
    // 批量IC卡验证领取
    validICTableGroup() {
      // this.roleTemp = row
      this.active = 0
      this.tips = '' // 提示
      this.tfUID = '' // 卡号
      this.tfBlockData = '' // 读取的数据
      this.dialogICGroupVisible = true
    },
    // 直接领取
    unValidICTable(row) {
      axios.post(
        '/smartprint/print-room/order/update-order',
        qs.stringify({ orderId: row.id, lingQuFangShi: 'Direct', status: 'YiLingQu' })
      ).then(res => {
        if (res.data.code !== 0) return this.$message.error(res.data.msg)
        this.$message.success('操作成功')
        this.editView()
        this.getList()
      })
        .catch(err => err)
    },
    // table IC卡验证
    validICTable(row, index) {
      this.roleTemp = row
      this.active = 0
      this.tips = '' // 提示
      this.tfUID = '' // 卡号
      this.tfBlockData = '' // 读取的数据
      this.dialogICVisible = true
    },
    // IC卡验证领取
    validIC() {
      this.active = 0
      this.tips = '' // 提示
      this.tfUID = '' // 卡号
      this.tfBlockData = '' // 读取的数据
      this.dialogICVisible = true
    },
    // ic卡返回提示
    icTips() {
      this.$Reader.onResult(rData => {
        switch (rData.strCmdCode) {
          case '0007': // Sys_Open
            if (rData.strStatus != '00') {
              // this.tips = 'Failed to connect device ! ' + 'Error code: 0x' + rData.strStatus;
              this.tips = 'Failed to connect device ! ' + 'Error code: 0x' + rData.strStatus;
            } else {
              g_isOpen = true;
              // this.tips = 'Reader connected successfully !';
              this.tips = 'Reader connected successfully !';
            }
            break;

          case '0009': // Sys_Close
            if (rData.strStatus != '00') {
              this.tips = 'Failed to disconnect device !';
            } else {
              this.tips = 'Reader disconnected successfully !';
            }
            break;

          case '0106': // Sys_SetBuzzer
            break;

          case '0105': // Sys_GetSnr
            if (rData.strStatus != '00') {
              this.tips = 'Sys_GetSnr faild !';
            } else {
              this.tips = rData.strData;
              this.tips = 'Get device serial number successfully !';
            }
            break;

          case '1001': // TyA_Request
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Request faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_findCard:
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                this.$Reader.send(g_device + '1002'); // TyA_Anticollision
                break;
            }

            break;

          case '1002': // TyA_Anticollision
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Anticollision faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_findCard:
                // document.getElementById('tfUID').value = rData.strData;
                this.tfUID = rData.strData;
                this.tips = 'Found card !';
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                this.$Reader.send(g_device + '1003' + rData.strData); // TyA_Select
                break;
            }

            break;

          case '1003': // TyA_Select
            if (rData.strStatus != '00') {
              this.tips = 'TyA_Select faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_authentication:
              case GFUNC.M1_read:
              case GFUNC.M1_write:
              case GFUNC.M1_initVal:
              case GFUNC.M1_increment:
              case GFUNC.M1_decrement:
              case GFUNC.M1_readVal:
              case GFUNC.M1_updateKey:
                this.$Reader.send(g_device + '100A' + g_keyType + g_blockAddr + g_key); // TyA_CS_Authentication2
                break;
            }

            break;

          case '100A': // TyA_CS_Authentication2
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Authentication2 faild !';
              return;
            }

            switch (g_wantFunc) {
              case GFUNC.M1_read:
                this.$Reader.send(g_device + '100B' + g_blockAddr); // TyA_CS_Read
                break;

              case GFUNC.M1_write:
                this.$Reader.send(g_device + '100C' + g_blockAddr + g_blockData);
                break;

              case GFUNC.M1_initVal:
                this.$Reader.send(g_device + '100D' + g_blockAddr + g_value);
                break;

              case GFUNC.M1_readVal:
                this.$Reader.send(g_device + '100E' + g_blockAddr);
                break;

              case GFUNC.M1_decrement:
                this.$Reader.send(g_device + '100F' + g_blockAddr + g_value);
                break;

              case GFUNC.M1_increment:
                this.$Reader.send(g_device + '1010' + g_blockAddr + g_value);
                break;
            }

            break;

          case '100B': // TyA_CS_Read
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Read faild !';
            } else {
              // document.getElementById('tfBlockData').value = rData.strData;
              this.tfBlockData = rData.strData;
              this.tips = 'Read block successfully !';
            }
            break;

          case '100C': // TyA_CS_Write
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Write faild !';
            } else {
              this.tips = 'Write block successfully !';
            }
            break;

          case '100D': // TyA_CS_InitValue
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_InitValue faild !';
            } else {
              this.tips = 'Initialize the wallet value successfully !';
            }
            break;

          case '100E': // TyA_CS_ReadValue
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_ReadValue faild !';
            } else {
              let hexValue = rData.strData;
              hexValue = hexValue.substr(6, 2) + hexValue.substr(4, 2) + hexValue.substr(2, 2) + hexValue.substr(0, 2); // Reverse sorting of high and low bytes (高低字节反过来排序)
              const decValue = parseInt(hexValue, 16); // Convert hexadecimal string to decimal string (十六进制字符串转换为十进制字符串)
              document.getElementById('tfValue').value = decValue; // Show wallet balance (显示电子钱包余额)
              this.tips = 'Read value successfully !';
            }
            break;

          case '100F': // TyA_CS_Decrement
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Decrement faild !';
            } else {
              this.tips = 'Decrement value successfully !';
            }
            break;

          case '1010': // TyA_CS_Increment
            if (rData.strStatus != '00') {
              this.tips = 'TyA_CS_Increment faild !';
            } else {
              this.tips = 'Increment value successfully !';
            }
            break;
        }
      }
      )
    },
    next2() {
      if (this.active == 0) {  // 连接设备
        this.Connect()
      }
      if (this.active == 1) { // 读取设备卡号
        this.getCardId()
      }
      if (this.active == 2) { // 读取卡内数据
        this.ReadBlock()
      }
      if (this.active == 3) { // 查询可领取订单
        const cardData = parseInt(this.tfBlockData + '')
        const filterBycardIdList = this.list.filter(item => item.userId == cardData)
        console.log(filterBycardIdList)
      }
      this.active += 1
    },
    next() {
      if (this.active == 0) { // 连接设备
        this.Connect()
      }
      if (this.active == 1) { // 读取设备卡号
        this.getCardId()
      }
      if (this.active == 2) { // 读取卡内数据
        this.ReadBlock()
      }
      if (this.active == 3) { // 验证身份
        const cardData = parseInt(this.tfBlockData + '')
        const userId = this.roleTemp.userId
        // return
        if (cardData == userId) {
          this.tips = '身份验证成功！'
          this.isValidSuccess = true
        } else {
          this.tips = '身份验证失败！'
        }
      }
      this.active += 1
    },
    /**
 * Turn on the green light
 * (亮绿灯)
**/
    LedGreen() {
      this.$Reader.send(g_device + '0107' + '02');
    },

    /**
     * Turn on the red light
     * (亮红灯)
    **/
    LedRed() {
      this.$Reader.send(g_device + '0107' + '01');
    },
    /**
    * 连接设备
    *
    * **/
    Connect() {
      this.$Reader.send(g_device + '0007' + '00'); // Open the USB device with index number 0. (打开索引号为0的USB设备)
      this.$Reader.send(g_device + '0109' + '41'); // Set to ISO14443a working mode. (设置为ISO14443A工作模式)
      this.$Reader.send(g_device + '0108' + '01'); // Turn on the this.$Reader antenna. (打开读卡器天线)
      this.LedGreen();
      setTimeout(this.LedRed(), 200);
      // this.$Reader.send(g_device + '0106' + '10'); // Beeps. (蜂鸣提示)
    },
    /**
 * 获取卡号
 *
 * **/
    getCardId() {
      // Check whether the reader is opened or not.
      if (g_isOpen != true) {
        this.tips = 'Please connect the device first !';
        return;
      }
      // Clear UID edit box
      this.tfUID = '';

      // Start read UID
      this.$Reader.send(g_device + '1001' + '52'); // TyA_Request
      g_wantFunc = GFUNC.M1_findCard;
    },
    /**
     * Read a block of M1 card
     * (读M1卡的一个块)
    **/
    ReadBlock() {
      // Check whether the reader is opened or not.
      if (g_isOpen != true) {
        this.tips = 'Please connect the device first !';
        return;
      }

      // Clear block data
      this.tfBlockData = '';

      // Get block address
      // g_blockAddr = document.getElementById('tfBlock').value;
      if (g_blockAddr == '') {
        this.tips = 'Please enter  block address !';
        return;
      }
      g_blockAddr = this.DecStrToHexStr(g_blockAddr, 2);

      // Get key
      if (g_key.length != 12) {
        this.tips = 'Please enter a 12-digit key !';
        return;
      }

      // Get key type
      // if (rbKeyA.checked) {
      //   g_keyType = '60';
      // } else {
      //   g_keyType = '61';
      // }

      // Start read block
      this.$Reader.send(g_device + '1001' + '52'); // TyA_Request
      g_wantFunc = GFUNC.M1_read;
    },
    /**
    * Function：Converts a decimal string to a hexadecimal string with a specified number of digits.
             (十进制字符串转换为指定位数的十六进制字符串)
    * Parameter：decimalStr [IN] Decimal string. (十进制字符串)
    *            length [IN] Specifies the number of digits to convert to hexadecimal. (指定要转换成十六进制的位数)
    * Return：Hexadecimal string. (十六进制字符串)
    **/
    DecStrToHexStr(decimalStr, length) {
      const num = Number(decimalStr);
      const str = (Array(length).join('0') + num.toString(16)).slice(-length);
      return str;
    }
  }
}
</script>

<style scoped>
/* 打印 */
/* @media print {
  div {
    display: none !important;
  }
} */

/* form 输入框 宽度 */
.form-item-width {
  width: 400px;
}
.class-table-box {
  width: 400px;
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
  width: 100%;
  position: relative;
  /* left: -100px; */
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
