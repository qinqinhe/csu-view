<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加岗位"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item type='number' label="岗位编码" prop="positionCode">
            <el-input v-model="ruleForm.positionCode" placeholder="请输入岗位编码"/>
          </el-form-item>
          <el-form-item label="岗位名称" prop="positionName">
            <el-input v-model="ruleForm.positionName" placeholder="请输入岗位名称"/>
          </el-form-item>
          <el-form-item label="显示顺序" prop="positionSort">
            <el-input v-model="ruleForm.positionSort" placeholder="请输入显示顺序"/>
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
      :parentIds.sync='ruleForm.parentIds'
      :TreeChooseName.sync='ruleForm.parentName'
      :id.sync='ruleForm.parentId'
      :TreeChooseType='2'
      title='菜单选择'
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
          
          positionCode: '',
          
          positionName: '',
          
          positionSort: '',
          
          createUserId: '',
          
          updateUserId: '',
          
          remarks: ''
        },
        
        menuTypeSelect: [{
          value: '0',
          label: '目录'
        }, {
          value: '1',
          label: '菜单'
        }],
        
        departmentVisible: false,
        
        pickerOptions: {
          disabledDate: (time) => {
            const curDate = Date.now()
            return time.getTime() > curDate
          }
        },
        
        rules: {
          positionCode: [
            { required: true, message: '请输入岗位编码', trigger: 'blur' }
          ],
          positionName: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' }
          ],
          positionSort: [
            { required: true, message: '请输入显示顺序', trigger: 'blur' }
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
        const { userId } = JSON.parse(localStorage.getItem(local.USER))
        this.ruleForm.createUserId = userId
        this.ruleForm.updateUserId = userId
        console.log(this.ruleForm)
        this.webapi({
          url: '/user/api/position/addPosition',
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
    }
  }
</script>
