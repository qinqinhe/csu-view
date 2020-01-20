<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="类型" prop='questionType'>
            <el-select v-model="ruleForm.questionType" size="medium" clearable placeholder="请选择题目类型">
              <el-option
                v-for="item in questionTypeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="科目" prop='laboratoryType'>
            <el-select v-model="ruleForm.laboratoryType" size="medium" clearable placeholder="请选择题目科目">
              <el-option
                v-for="item in examination"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop='questionStatus'>
            <el-select v-model="ruleForm.questionStatus" size="medium" placeholder="请选择题目状态">
              <el-option
                v-for="item in questionStatusSelect"
                :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button
              class="btn-query"
              size="mini"
              @click='inquiry()'
            >查询
            </el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <Operation :info="inquiry"/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
            @selection-change='tableCheckChange'
          >
            <el-table-column type="selection" width="55"/>
            <el-table-column type='index' label="排序" width='60' align='center'/>
            <el-table-column prop="examinationQuestion" label="题目" align='center'/>
            <el-table-column label="状态" align='center' width='100'>
              <template slot-scope="scope">
								<span
                  v-if='scope.row.questionStatus === "0"'
                  class='red'
                >不可用</span>
                <span
                  v-else-if='scope.row.questionStatus === "1"'
                  class='green'
                >可用</span>
              </template>
            </el-table-column>
            <el-table-column prop="laboratoryType" label='科目' align='center' width='90'/>
            <el-table-column prop="questionType" label='类型' align='center' width='90'/>
            <el-table-column label="操作" align='center' width='250'>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click='edit(scope.row.questionBankInfoId)'
                  type='primary'
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="del(scope.row.questionBankInfoId)"
                >删除
                </el-button>
                <el-button
                  size="mini"
                  type="warning"
                  v-if='scope.row.questionStatus === "1"'
                  @click="prohibition(scope.row)"
                >停用
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  v-else
                  @click="prohibition(scope.row)"
                >启用
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
    <add-modal
      :info='inquiry'
    />
    <edit-modal
      :infoId='infoId'
      :info='inquiry'
    />
  </div>
</template>

<script>
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      AddModal: AddModal,
      Operation,
      EditModal
    },
    data () {
      return {
        ruleForm: {
          questionType: '',
          questionStatus: '',
          laboratoryType: ''
        },
        questionTypeSelect: [{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '学习'
        }, {
          value: '1',
          label: '考试'
        }],
        questionStatusSelect: [{
          value: '',
          label: '所有'
        }, {
          value: '1',
          label: '可用'
        }, {
          value: '0',
          label: '不可用'
        }],
        pagination: {
          pageCurrent: 1,
          pageRows: 10,
          total: 0
        },
        AddVisible: true,
        infoId: '',
        tableData: [],
        examinationJson: {}
      }
    },
    async mounted () {
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.laboratory_type.code
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.examinationChange(data)
          data.forEach(item => {
            this.examinationJson[item.dictionaryDataInfoId] = item
          })
        }
      })
      await this.inquiry()
    },
    computed: {
      ...mapState({
        examination: state => [{
          dictionaryDataInfoId: '',
          dictionaryValue: '所有'
        }, ...state.examination]
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange',
        'examinationChange'
      ]),
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.inquiry()
      },
      
      headCall: function (msg) {
        
      },
      
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/examination/api/questionBank/queryQuestionBankByPage',
          data: {
            ...data,
            ...this.ruleForm
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              item.questionType = item.questionType === '0' ? '学习' : '考试'
              
              item.laboratoryType = this.examinationJson[item.laboratoryType].dictionaryValue
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
      del (InfoId) {
        this.$confirm('确认删除此数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delApi(InfoId)
        }).catch(() => {
        })
      },
      delApi (InfoId) {
        this.webapi({
          url: '/examination/api/questionBank/delQuestion',
          data: {
            questionBankInfoId: InfoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {

            this.inquiry()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: resultMessage
            })
          }
        })
      },
      prohibition (data) {
        const { questionBankInfoId, questionStatus } = data
        const status = questionStatus === '0' ? '1' : '0'
        this.$confirm(`确认${status === '1' ? '启用' : '停用'}此题`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.prohibitionApi({ questionBankInfoId, status })
        }).catch(() => {
        })
      },
      prohibitionApi ({ questionBankInfoId, status }) {
        this.webapi({
          url: '/examination/api/questionBank/updateQuestion',
          data: {
            questionBankInfoId: questionBankInfoId,
            questionStatus: status
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {

            this.inquiry()
            this.$message({
              type: 'success',
              message: '操作成功!'
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

<style lang="scss" rel="stylesheet/scss" scoped>
  


  .table {
    width: calc(100% + 30px);
    min-height: 430px;
    overflow-x: hidden;
    overflow-y: scroll;
  }


</style>
