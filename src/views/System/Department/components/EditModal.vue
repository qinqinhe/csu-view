<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title='编辑位置'
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item type='number' label="部门编码" prop="departmentCode">
            <el-input v-model="ruleForm.departmentCode" placeholder="请输入部门编码"/>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="ruleForm.departmentName" placeholder="请输入部门名称"/>
          </el-form-item>
          <el-form-item label="显示顺序" prop="positionSort">
            <el-input v-model="ruleForm.positionSort" placeholder="请输入显示顺序"/>
          </el-form-item>
          <el-form-item label="父节点" prop="parentName">
            <el-input v-model="ruleForm.parentName" placeholder="请选择父节点" @focus="TreeChooseState = true"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <TreeChooseParent
      :dataTree='dataTree'
      :dataNative='dataNative'
      :visible.sync='TreeChooseState'
      :parentIds.sync='ruleForm.departmentLevel'
      :TreeChooseName.sync='ruleForm.parentName'
      :id.sync='ruleForm.parentId'
      :TreeChooseType='2'
      title='部门选择'
    />
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapMutations } from 'vuex'
  import TreeChooseParent from '@/components/Tree/TreeChooseParent'
  import { local } from '@/config/wildcard'
  import parentIds from '@/api/findParentIds'

  export default {
    props: {
      dataTree: {
        type: Array,
        default: true
      },
      
      dataNative: {
        type: Array,
        default: true
      },
      infoId: {
        
      },
      info: {
        type: Function
      }
    },
    data () {
      return {
        ruleForm: {
          departmentCode: '',
          parentId: '',
          parentName: '',
          departmentName: '',
          departmentLevel: '',
          positionSort: '',
          remarks: ''
        },
        
        departmentVisible: false,
        
        pickerOptions: {
          disabledDate: (time) => {
            const curDate = Date.now()
            return time.getTime() > curDate
          }
        },
        
        rules: {
          departmentCode: [
            { required: true, message: '请输入部门编码', trigger: 'blur' }
          ],
          departmentName: [
            { required: true, message: '请输入部门名称', trigger: 'blur' }
          ],
          positionSort: [
            { required: true, message: '请输入显示顺序', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '请选择父节点', trigger: 'change' }
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
        EditVisible: state => state.EditVisible
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange'
      ]),
      infoDetail () {
        this.webapi({
          url: `/user/api/department/detailDepartment`,
          data: {
            departmentInfoId: this.infoId
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              let ruleForm = this.ruleForm
              for (let i in ruleForm) {
                data[i] && (ruleForm[i] = data[i])
              }

              const parentNodes = parentIds({ data: this.dataNative, id: data.parentId })
              const parentNames = parentNodes.map(item => item.departmentName)
              this.ruleForm.parentName = parentNames.length ? parentNames[parentNames.length - 1] : '-'
              console.log(parentNodes, this.dataNative, data.parentId)
              this.ruleForm = ruleForm
            }
          })

      },
      
      departmentState () {
        this.departmentVisible = !this.departmentVisible
      },
      
      departmentChoose (item) {
        if (!item.children) {
          this.ruleForm.departmentInfoId = item.id
          this.ruleForm.departmentName = item.label
          this.parentId = []
          this.dataNativeSet(item.parentId)
          this.departmentVisible = false
        }
      }
      ,
      
      addMenu () {
        this.webapi({
          url: '/user/api/department/updateDept',
          data: {
            ...this.ruleForm,
            departmentInfoId: this.infoId
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
            this.addMenu()
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
        val && this.infoDetail()

      }
    }
  }
</script>
