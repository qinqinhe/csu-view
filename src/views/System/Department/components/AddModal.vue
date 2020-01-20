<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加部门"
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
          <el-form-item label="序号" prop="positionSort">
            <el-input type='number' v-model="ruleForm.positionSort" placeholder="请输入序号"/>
          </el-form-item>
          <el-form-item label="上级部门" prop="parentName">
            <el-input v-model="ruleForm.parentName" placeholder="请选择上级部门" @focus="TreeChooseState = true"/>
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
            { required: true, message: '请输入序号', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '请选择上级部门', trigger: 'change' }
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
        AddVisible: state => state.AddVisible
      })
    },
    methods: {

      ...mapMutations([
        
        'AddVisibleChange'
      ]),
      
      departmentState () {
        this.departmentVisible = !this.departmentVisible
      },
      
      
      
      
      
      
      
      
      
      
      
      
      addMenu () {
        this.webapi({
          url: '/user/api/department/addDepartment',
          data: {
            ...this.ruleForm
          }
        }).then(res => {
            const { resultCode, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.info()
              Message({
                message: resultMessage
              })
              this.resetForm('ruleForm')
              this.AddVisibleChange(false)

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
      'ruleForm.departmentLevel': function (val) {
        console.log(val)
      }
    }
  }
</script>
