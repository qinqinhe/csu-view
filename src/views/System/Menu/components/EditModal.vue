<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title='编辑菜单'
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
        v-loading="editloading"
      >
        <section class="dialog-from-content">
          <el-form-item type='number' label="菜单编码" prop="menuCode">
            <el-input v-model="ruleForm.menuCode" placeholder="请输入菜单编码"/>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="ruleForm.menuName" placeholder="请输入菜单名称"/>
          </el-form-item>
          <el-form-item label="菜单路由" prop="menuRoute">
            <el-input v-model="ruleForm.menuRoute" placeholder="请输入菜单路由"/>
          </el-form-item>
          <el-form-item label="菜单类型" prop="menuType">
            <template>
              <el-radio
                v-model="ruleForm.menuType"
                :label="item.value"
                v-for='(item, index) in menuTypeSelect'
                :key='index'
              >{{ item.label }}
              </el-radio>
            </template>
          </el-form-item>
          <el-form-item label="父级菜单" prop="parentName">
            <el-input v-model="ruleForm.parentName" @focus="TreeChooseState=true" readonly/>
          </el-form-item>
          <el-form-item label="菜单排序" prop="menuSort">
            <el-input type='number' v-model="ruleForm.menuSort" placeholder="请输入菜单排序标识"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
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
      infoId: {},
      info: {
        type: Function
      }
    },
    data () {
      return {
        ruleForm: {
          menuInfoId: '',
          menuCode: '',
          menuName: '',
          menuRoute: '',
          parentId: '',
          parentIds: '',
          parentName: '',
          menuSort: '',
          menuType: '',
          remarks: ''
        },
        menuTypeSelect: [{
          value: '1',
          label: '菜单'
        },{
          value: '2',
          label: '按钮'
        }],
        departmentVisible: false,
        pickerOptions: {
          disabledDate: (time) => {
            const curDate = Date.now()
            return time.getTime() > curDate
          }
        },
        
        rules: {
          menuCode: [
            { required: true, message: '请输入菜单编码', trigger: 'blur' }
          ],
          menuName: [
            { required: true, message: '请输入菜单编码', trigger: 'blur' }
          ],
          menuRoute: [
            { required: true, message: '请输入菜单路由', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^[A-Za-z0-9\/]+$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入字母数字或者/'))
                }
              }
            }
          ],
          parentName: [
            { required: true, message: '请选择父级菜单', trigger: 'change' }
          ],
          menuSort: [
            { required: true, message: '请输入菜单排序', trigger: 'blur' }
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
        editloading: state => state.editloading
      })
    },
    methods: {
      ...mapMutations([
        'EditVisibleChange',
        'editloadingUpdate'
      ]),
      infoDetail () {
        this.webapi({
          url: `/user/api/menu/getMenuDetail`,
          data: {
            menuInfoId: this.infoId
          }
        }).then(res => {
            this.editloadingUpdate(false)
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              let ruleForm = this.ruleForm
              for (let i in ruleForm) {
                (typeof data[i] !== 'string' || data[i].length !== 0) && (ruleForm[i] = data[i])
              }
              const json = this.dataNative.filter(item => item.id === data.parentId)
              ruleForm.parentName = json[0].label
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
      },
      edit () {
        const parentId = this.ruleForm.parentId.split(',')[0]
        this.ruleForm.parentId = parentId
        this.webapi({
          url: `/user/api/menu/updateMenu`,
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
        this.infoDetail()
      }
    }
  }
</script>
