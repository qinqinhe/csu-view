<template>
  <div class="h100 body-main flex">
    <section class="main-data mL0">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="考场名称" prop="examinationHallName">
            <el-input size="medium" v-model="ruleForm.examinationHallName" placeholder="考场名称"/>
          </el-form-item>
          <el-form-item label="考试名称" prop="examinationName">
            <el-input placeholder="考试名称" size="medium" v-model="ruleForm.examinationName"/>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择时间"
              :picker-options="pickerOptionsBegin"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择时间"
              :picker-options="pickerOptionsFinish"
            />
          </el-form-item>
          <el-form-item label="题目类型" prop="laboratoryType">
            <el-select
              v-model="ruleForm.laboratoryType"
              size="medium"
              clearable
              placeholder="题目类型"
            >
              <el-option
                v-for="item in laboratoryTypeSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <section class="main-table">
        <!-- <Operation :info="inquiry" /> -->
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height="100%"
            border
            tooltip-effect="dark"
            @selection-change="tableCheckChange"
          >
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="examinationHallName" align="center" label="考场名字"/>
            <el-table-column prop="examinationHallAddress" align="center" label="位置"/>
            <el-table-column prop="examinationName" label="考试名称" align="center"/>
            <el-table-column prop="laboratoryTypeValue" align="center" label="题目类型"/>
            <el-table-column prop="startTime" align="center" label="开始时间"/>
            <el-table-column prop="endTime" align="center" label="结束时间"/>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <span v-if='scope.row.examinationStatus==="1"' class="red">已考试</span>
                <span v-else class='green'>未考试</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleInfo(scope.row.examinationReservationId)">详情
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  v-if='timeEnd(scope.row.startTime)'
                  @click="cancleOrder(scope.row.examinationReservationId)"
                >取消预约
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
    <edit-modal :dataTree="dataTree" :dataNative="data" :infoId="infoId" :info="inquiry"/>
  </div>
</template>

<script>
  import EditModal from './components/EditModal'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      
      EditModal
    },
    data () {
      return {
        ruleForm: {
          
          examinationHallName: '',
          
          examinationName: '',
          
          startTime: '',
          
          endTime: '',
          
          laboratoryType: ''
        },
        
        laboratoryTypeSelect: [],
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 100
        },
        
        AddVisible: true,
        
        infoId: '',

        tableData: [],
        treesTitle: '选择楼层',
        data: [],
        dataTree: [],
        
        dataTreeFloor: [],
        
        dataFloor: []
      }
    },
    async mounted () {
      
      await this.inquiry()

      
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.laboratory_type.code
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.laboratoryTypeSelect = data
          this.laboratoryTypeSelect.unshift({
            dictionaryDataInfoId: '',
            dictionaryValue: '所有'
          })
          this.laboratorySet(data)
        }
      })
    },
    computed: {
      pickerOptionsBegin () {
        return {
          disabledDate: time => {
            const curDate = Date.now()
            if (this.ruleForm.endTime) {
              return (
                time.getTime() < curDate ||
                time.getTime() < new Date(this.ruleForm.endTime).getTime()
              )
            } else {
              return time.getTime() < curDate - 24 * 60 * 60 * 1000
            }
          }
        }
      },
      pickerOptionsFinish () {
        return {
          disabledDate: time => {
            const curDate = Date.now()
            if (this.ruleForm.startTime) {
              return (
                time.getTime() < curDate - 24 * 60 * 60 * 1000 ||
                time.getTime() <=
                new Date(this.ruleForm.startTime).getTime() -
                24 * 60 * 60 * 1000
              )
            } else {
              return time.getTime() < curDate - 24 * 60 * 60 * 1000
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange',
        'userChange',
        'laboratorySet'
      ]),
      handleInfo (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.inquiry()
      },
      
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        for (let i in this.ruleForm) {
          this.ruleForm[i] && (data[i] = this.ruleForm[i])
        }
        this.webapi({
          url:
            '/examination/api/examinationReservation/queryExaminationReservationByPage  ',
          data: {
            ...data
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              item.examinationStatus =
                item.examinationStatus === '1' ? '可预约' : '不可预约'
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
      timeEnd (time) {
        const timeEnd = new Date(time)
        const timeCurrent = new Date()
        return timeEnd.getTime() > timeCurrent.getTime()
      },
      cancleOrder (InfoId) {
        this.$confirm('确认取消此条数据预约', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.delApi(InfoId)
          })
          .catch(() => {})
      },
      delApi (InfoId) {
        this.webapi({
          url: '/examination/api/examinationReservation/deleteExaminationReservation  ',
          data: {
            examinationReservationId: InfoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.inquiry()
            this.$message({
              type: 'success',
              message: resultMessage
            })
          } else {
            this.$message({
              type: 'warning',
              message: resultMessage
            })
          }
        })
      },
      
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.inquiry()
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
