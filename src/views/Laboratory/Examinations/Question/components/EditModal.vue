<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title='题目编辑'
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="题目" prop="examinationQuestion">
            <el-input type="textarea" v-model="ruleForm.examinationQuestion" placeholder="请输入题目"/>
          </el-form-item>
          <el-form-item label="选项A" prop="optiona">
            <el-input v-model="ruleForm.optiona" placeholder="请输入选项A内容"/>
          </el-form-item>
          <el-form-item label="选项B" prop="optionb">
            <el-input v-model="ruleForm.optionb" placeholder="请输入选项B内容"/>
          </el-form-item>
          <el-form-item label="选项C" prop="optionc">
            <el-input v-model="ruleForm.optionc" placeholder="请输入选项C内容"/>
          </el-form-item>
          <el-form-item label="选项D" prop="optiond">
            <el-input v-model="ruleForm.optiond" placeholder="请输入选项D内容"/>
          </el-form-item>
          <el-form-item label="答案" prop="correctAnswer">
            <el-select v-model="ruleForm.correctAnswer" size="medium" clearable placeholder="请选择题目答案">
              <el-option
                v-for="item in correctAnswerSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="科目" prop="laboratoryType">
            <el-select v-model="ruleForm.laboratoryType" size="medium" clearable placeholder="请选择题目科目">
              <el-option
                v-for="item in examination"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="questionType">
            <el-select v-model="ruleForm.questionType" size="medium" clearable placeholder="请选择题目类型">
              <el-option
                v-for="item in questionTypeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="questionStatus">
            <el-select v-model="ruleForm.questionStatus" size="medium" clearable placeholder="请选择题目状态">
              <el-option v-for="item in questionStatusSelect" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="解析" prop="questionAnalysis">
            <el-input type="textarea" v-model="ruleForm.questionAnalysis" placeholder="请输入解析"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapMutations } from 'vuex'
  import TreeChooseParent from '@/components/Tree/TreeChooseParent'
  import { local } from '@/config/wildcard'

  export default {
    props: {
      infoId: {
        
      },
      info: {
        type: Function
      }
    },
    data () {
      return {
        ruleForm: {
          examinationQuestion: '',
          optiona: '',
          optionb: '',
          optionc: '',
          optiond: '',
          correctAnswer: '',
          laboratoryType: '',
          questionType: '',
          questionStatus: '',
          questionAnalysis: '',
          remarks: ''
        },
        questionStatusSelect: [{
          value: '0',
          label: '可用'
        }, {
          value: '1',
          label: '不可用'
        }],
        correctAnswerSelect: [
          { label: '选项A', value: 'A' },
          { label: '选项B', value: 'B' },
          { label: '选项C', value: 'C' },
          { label: '选项D', value: 'D' }
        ],
        questionTypeSelect: [{
          value: '0',
          label: '学习'
        }, {
          value: '1',
          label: '考试'
        }],
        questionStatusSelect: [{
          value: '1',
          label: '可用'
        }, {
          value: '0',
          label: '不可用'
        }],
        
        rules: {
          examinationQuestion: [
            { required: true, message: '请输入题目标题', trigger: 'blur' }
          ],
          optiona: [
            { required: true, message: '请输入选项内容', trigger: 'blur' }
          ],
          optionb: [
            { required: true, message: '请输入选项内容', trigger: 'blur' }
          ],
          optionc: [
            { required: true, message: '请输入选项内容', trigger: 'blur' }
          ],
          optiond: [
            { required: true, message: '请输入选项内容', trigger: 'blur' }
          ],
          correctAnswer: [
            { required: true, message: '请选择答案', trigger: 'change' }
          ],
          laboratoryType: [
            { required: true, message: '请选择科目', trigger: 'change' }
          ],
          questionType: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          questionAnalysis: [
            { required: true, message: '请输入题目解析', trigger: 'blur' }
          ]
        },
        TreeChooseState: false
      }
    },
    components: {
      TreeChooseParent
    },
    mounted () {
    },
    computed: {
      ...mapState({
        EditVisible: state => state.EditVisible,
        examination: state => state.examination
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange'
      ]),
      infoDetail () {
        this.webapi({
          url: `/examination/api/questionBank/selectQuestionBankInfo`,
          data: {
            questionBankInfoId: this.infoId
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              let ruleForm = this.ruleForm
              for (let i in ruleForm) {
                data[i] && (ruleForm[i] = data[i])
              }
              this.ruleForm = ruleForm
            }
          })

      },
      edit () {
        this.webapi({
          url: `/examination/api/questionBank/updateQuestion`,
          data: {
            ...this.ruleForm,
            questionBankInfoId: this.infoId
          }
        }).then(res => {
            const { resultCode, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.info()
              Message({
                message: resultMessage
              })
              this.resetForm('ruleForm')
              this.EditVisibleChange(false)
            }
          })
      },
      
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.edit()
          } else {
            return false
          }
        })
      },
      
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    watch: {
      'EditVisible': function (val) {
        if (val) {
          this.infoDetail()
        } else {
          this.resetForm('ruleForm')
        }

      }
    }
  }
</script>
