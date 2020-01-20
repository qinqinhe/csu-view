<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)" width="660px"
      :modal-append-to-body='false'
      title="编辑用户"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        v-loading="editloading"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="一卡通" prop="omnipotentCard">
            <el-input v-model="ruleForm.omnipotentCard" placeholder="请输入校园一卡通号码"/>
          </el-form-item>
          <el-form-item label="身份证号码" prop="identificationNumber">
            <el-input v-model="ruleForm.identificationNumber" placeholder="请输入身份证号码" maxlength="18"/>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNumber">
            <el-input type='number' :value='ruleForm.phoneNumber' placeholder="请输入手机号码" @input='phoneChange'/>
          </el-form-item>
          <el-form-item label="出生日期" prop="userBirthday">
            <el-date-picker
              v-model="ruleForm.userBirthday"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format='yyyy-MM-dd'
            />
          </el-form-item>
          <el-form-item label="用户性别" prop="userSex">
            <el-select v-model="ruleForm.userSex" placeholder="选择性别">
              <el-option
                v-for="item in sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属部门" prop="departmentName">
            <el-input v-model="ruleForm.departmentName" @focus="departmentState()" readonly/>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="ruleForm.userType" placeholder="选择用户类型">
              <el-option
                v-for="item in userType"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择角色" prop="roleInfoIds">
            <template>
              <el-checkbox-group v-model="ruleForm.roleInfoIds">
                <el-checkbox v-for="item in role" :label="item.roleInfoId" :key="item.roleInfoId">{{item.label}}
                </el-checkbox>
              </el-checkbox-group>
            </template>
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
      :parentIds.sync='ruleForm.parentId'
      :TreeChooseName.sync='ruleForm.departmentName'
      :id.sync='ruleForm.departmentInfoId'
      :TreeChooseType='0'
      title='组织选择'
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
          
          
          
          omnipotentCard: '',
          
          identificationNumber: '',
          
          phoneNumber: '',
          
          userBirthday: '',
          
          userSex: '',
          
          departmentInfoId: '',
          
          departmentName: '',
          parentId: '',
          userType: '',
          roleInfoIds: []
        },
        
        sexoptions: [{
          value: '0',
          label: '女'
        }, {
          value: '1',
          label: '男'
        }],
        
        pickerOptions: {
          disabledDate: (time) => {
            const curDate = Date.now()
            return time.getTime() > curDate
          }
        },
        
        rules: {
          
          
          
          
          omnipotentCard: [
            { required: true, message: '请输入一卡通号码', trigger: 'blur' }
          ],
          identificationNumber: [
            { required: true, message: '请填写身份证号码', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])([0-2]\d|3[0-1])\d{3}(\d|X)$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('必须正确的身份证格式'))
                }
              }
            }
          ],
          phoneNumber: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const reg = /^1\d{10}$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('必须正确的手机号码格式'))
                }

              }
            }
          ],
          userBirthday: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          userSex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          departmentName: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'change' }
          ],
          roleInfoIds: [
            {
              required: true, trigger: 'change', validator: (rule, value, callback) => {
                if (value.length) {
                  callback()
                } else {
                  callback(new Error('请选择角色'))
                }
              }
            }
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
        role: state => state.user.role,
        userType: state => state.user.userType,
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
          url: `/user/api/user/getUserDetailById`,
          data: {
            userId: this.infoId
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              let ruleForm = this.ruleForm
              for (let i in ruleForm) {
                data[i] && (ruleForm[i] = data[i])
              }
              this.ruleForm.roleInfoIds = data.userRoleList.map(item => item.roleInfoId)
              const parentNodes = parentIds({ data: this.dataNative, id: data.departmentInfoId })
              this.ruleForm.parentId = parentNodes.map(item => item.id).join()
              this.ruleForm = ruleForm
            }
            this.editloadingUpdate(false)
          })

      },
      
      departmentState () {
        this.TreeChooseState = !this.TreeChooseState
      },
      
      addMenu () {
        let ruleForm = this.ruleForm
        ruleForm.roleInfoIds = ruleForm.roleInfoIds.join()
        this.webapi({
          url: `/user/api/user/updateUser`,
          data: {
            ...ruleForm,
            userId: this.infoId
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
      },
      phoneChange (val) {
        if (val > 11) {
          this.ruleForm.phoneNumber = val.slice(0, 11)
        } else {
          this.ruleForm.phoneNumber = val
        }
      }
    },
    watch: {
      'EditVisible': function (val) {
        val && this.infoDetail()
        !val && this.$refs['ruleForm'].resetFields()
      }
    }
  }
</script>
