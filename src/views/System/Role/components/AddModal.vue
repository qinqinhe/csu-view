<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加角色"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="ruleForm.roleCode" placeholder="请输入角色编码" maxlength="20"/>
          </el-form-item>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称" maxlength="15"/>
          </el-form-item>
          <el-form-item label="展示风格" prop="displayStyle">
            <el-select v-model="ruleForm.displayStyle" placeholder="请选择展示风格">
              <el-option
                v-for="item in displayStyleSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type='textarea' v-model="ruleForm.remarks" placeholder="请输入角色备注"/>
          </el-form-item>
          <el-form-item label="权限" prop="menuInfoIds">
            <el-tree
              show-checkbox
              node-key="id"
              :data='permission'
              :default-checked-keys="defaultCheck"
              @check='menuInfoIdsChange'
              ref='tree'
            />
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
          roleCode: '',
          roleName: '',
          displayStyle: '1',
          menuInfoIds: '',
          remarks: ''
        },
        displayStyleSelect: [{
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '3D'
        }],
        rules: {
          roleCode: [
            { required: true, message: '请输入角色编码', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^R\d{19}/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入以R开头的19位数字结尾格式的编码'))
                }

              }
            }
          ],
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { required: true, min: 2, max: 15, message: '请输入2 - 15个字符', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入中文或者大小写字母'))
                }

              }
            }
          ],
          displayStyle: [
            { required: true, message: '请选择页面展示风格', trigger: 'blur' }
          ]
        },
        TreeChooseState: false,
        defaultCheck: []
      }
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        AddVisible: state => state.AddVisible,
        permission: state => state.permission
      })
    },
    methods: {

      ...mapMutations([
        'AddVisibleChange'
      ]),
      addMenu () {
        this.webapi({
          url: '/user/api/role/addRole',
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
              this.$refs.tree.setCheckedKeys([])
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
        this.$refs.tree.setCheckedKeys([])
        this.ruleForm.menuInfoIds = ''
      },
      menuInfoIdsChange (check, data) {
        this.ruleForm.menuInfoIds = [...data.checkedKeys, ...data.halfCheckedKeys].join()
      }
    }
  }
</script>
