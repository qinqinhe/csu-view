<template>
  <div class="h100 body-main flex">
    <!-- <section class="main-tree">
      <Tree :contentTrees="dataTree" :treesTitle="treesTitle" :parentIds.sync="ruleForm.parentIds" :dataNative="dataFloor" v-on:headCallBack="headCall" :clickType="false" />
    </section> -->
    <section class="main-data mL0">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="考试名称" prop="examinationName">
            <el-input placeholder="考试名称" size="medium" v-model="ruleForm.examinationName"/>
          </el-form-item>
          <el-form-item label="开始时间" prop='startTime'>
            <el-date-picker
              v-model="ruleForm.startTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsBegin"
            />
            
          </el-form-item>
          <el-form-item label='结束时间' prop='endTime'>
            <el-date-picker
              v-model="ruleForm.endTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsFinish"
            />
          </el-form-item>
          <!-- <el-form-item label="考试类型" prop="questionCategory">
            <el-select v-model="ruleForm.questionCategory" size="medium" clearable placeholder="实验室状态">
              <el-option
                v-for="item in questionCategorySelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <Operation :info="inquiry"/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table :data="tableData" height="100%" border tooltip-effect="dark">
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="examinationName" align="center" label="考试名称"/>
            <el-table-column prop='startTime' label='开始时间' align="center"/>
            <el-table-column prop="endTime" label="结束时间" align="center"/>
            <el-table-column align="center" label="科目">
              <template slot-scope="scope">
                <span>{{laboratoryType[scope.row.laboratoryType] || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span v-if='scope.row.examinationStatus==="1" && (new Date(scope.row.startTime) - new Date()) > 0' class="green">可预约</span>
                <span v-else class="red">不可预约</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type='success'
                  @click="detail(scope.row.examinationInfoId,laboratoryType[scope.row.laboratoryType])"
                >详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.pageCurrent"
          :page-sizes="[1, 10, 50, 100]"
          :page-size="pagination.pageRows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </section>
    </section>
    <add-modal :dataTree="dataTree" :dataNative="data" :info="inquiry"/>
    <detail-modal :visible.sync='detailVisible' :infoId='detailInfoId' :laboratoryType='detailType'/>
  </div>
</template>

<script>
  import Tree from '@/components/Tree/tree'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import DetailModal from './components/DetailModal'
  import Operation from './components/Operation'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      
      AddModal,
      DetailModal,
      Operation,
      Tree
    },
    data () {
      return {
        ruleForm: {
          
          examinationName: '',
          
          startTime: '',
          
          endTime: '',
          
          questionCategory: '',
          
          affiliatedBuilding: '',
          affiliatedFloor: '',
          affiliatedRoom: '',
          parentIds: ''
        },
        
        questionCategorySelect: [
          {
            value: '',
            label: '所有'
          },
          {
            value: '1',
            label: '启用'
          },
          {
            value: '0',
            label: '禁用'
          }
        ],
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 0
        },
        tableData: [],
        treesTitle: '选择楼层',
        data: [],
        dataTree: [],
        
        dataTreeFloor: [],
        
        dataFloor: [],
        laboratoryType: {},
        detailVisible: false,
        detailInfoId: '',
        detailType: '-'
      }
    },
    async mounted () {
      
      await this.info()
      
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.laboratory_type.code
        }
      }).then(res => {
        const {
          resultCode,
          data,
          resultMessage
        } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.laboratorySet(data)
          data.forEach((item, index) => {
            this.laboratoryType[item.dictionaryDataInfoId] = item.dictionaryValue
          })
        }
      })
      
      await this.inquiry()
      await this.webapi({
        url: '/system/api/dictionaryData/queryAllEnabledDictionaryTypeInfo'
      })
      
      await this.webapi({
        url: '/system/api/place/queryPlace '
      }).then(res => {
        const {
          resultCode,
          data,
          resultMessage
        } = res
        if (resultCode === code.CODE_SUCCESS) {
          const { rows } = data
          this.dataTreeFloor = tree({
            arr: rows,
            ids: 'placeInfoId',
            name: 'placeName'
          })
          this.dataFloor = rows
        }
      })
      
      await this.webapi({
        url: '/user/api/user/queryUserByType',
        data: {
          userType: '1'
        }
      }).then(res => {
        const {
          resultCode,
          data,
          resultMessage
        } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.userChange(data)
        }
      })
    },
    computed: {
      pickerOptionsBegin () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            
            
            
            
            
            if (this.ruleForm.endTime) {
              return time.getTime() > new Date(this.ruleForm.endTime).getTime()
            } else {
              return false
            }
          }
        }
      },
      pickerOptionsFinish () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            
            
            
            
            
            if (this.ruleForm.startTime) {
              return time.getTime() < new Date(this.ruleForm.startTime).getTime() - 24 * 60 * 60 * 1000
            } else {
              return false
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        'userChange',
        'laboratorySet'
      ]),
      info () {
        
        this.webapi({
          url: '/system/api/place/queryBuildingAndFloorAndRoom'
        }).then(res => {
          const {
            resultCode,
            data,
            resultMessage
          } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.dataTree = tree({
              arr: data,
              ids: 'placeInfoId',
              name: 'placeName'
            })
            this.data = data
          }
        })
      },
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        const ruleForm = this.ruleForm
        ruleForm.startTime && (ruleForm.startTime = ruleForm.startTime + ' 00:00:00')
        ruleForm.endTime && (ruleForm.endTime = ruleForm.endTime + ' 23:59:59')
        for (let i in ruleForm) {
          this.ruleForm[i] && (data[i] = ruleForm[i])
        }
        this.webapi({
          url: '/examination/api/examinationInfo/queryTeacherExamHisList',
          data: {
            ...data
          }
        }).then(res => {
          const {
            resultCode,
            data,
            resultMessage
          } = res
          if (resultCode === code.CODE_SUCCESS) {
            const {
              rowSum,
              rows
            } = data
            this.tableData = rows.map(item => {
              
              item.laboratoryStatus = item.laboratoryStatus === '0' ? '禁用' : '启用'
              return item
            })
            this.pagination.total = rowSum
          }
        })
      },
      handleSizeChange (val) {
        this.pagination.pageRows = val
        this.inquiry()
      },
      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.inquiry()
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.inquiry()
      },
      detail (infoId, type) {
        this.detailInfoId = infoId
        this.detailType = type
        this.detailVisible = true
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  


  .table {
    width: calc(100% + 30px);
    min-height: 430px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
