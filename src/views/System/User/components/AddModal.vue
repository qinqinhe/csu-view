<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加用户"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="请输入用户姓名" maxlength="15"/>
          </el-form-item>
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
            <el-input v-model="ruleForm.departmentName" @focus="departmentState()"/>
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
          
          userName: '',
          
          omnipotentCard: '',
          
          identificationNumber: '',
          
          phoneNumber: '',
          
          userBirthday: '',
          
          userSex: '',
          
          departmentInfoId: '',
          
          departmentName: '',
          parentId: '',
          parentid: '',
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
          userName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 15 个字符', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^[\u4E00-\u9FA5A-Za-z]+$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入汉字或者字母'))
                }
              }
            }
          ],
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
        AddVisible: state => state.AddVisible,
        role: state => state.user.role,
        userType: state => state.user.userType
      })
    },
    methods: {
      ...mapMutations([
        'AddVisibleChange'
      ]),
      departmentState () {
        this.TreeChooseState = !this.TreeChooseState
      },
      add () {
        let ruleForm = this.ruleForm
        ruleForm.roleInfoIds = ruleForm.roleInfoIds
        this.webapi({
          url: '/user/api/user/addUser',
          data: {
            ...ruleForm
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
        console.log(this.ruleForm.roleIds)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.add()
          } else {
            return false
          }
        })
      },
      
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      menuInfoIdsChange (check, data) {
        console.log(check, data)
      },
      phoneChange (val) {
        if (val > 11) {
          this.ruleForm.phoneNumber = val.slice(0, 11)
        } else {
          this.ruleForm.phoneNumber = val
        }
      }
    }
  }
</script>
