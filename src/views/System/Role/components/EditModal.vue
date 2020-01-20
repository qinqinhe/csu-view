<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="编辑角色"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="roleCode">
            <el-input v-model="ruleForm.roleCode" placeholder="请输入角色编码"/>
          </el-form-item>
          <el-form-item label="名称" prop="roleName">
            <el-input v-model="ruleForm.roleName" placeholder="请输入角色名称"/>
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即更新</el-button>
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
import treeAssembleAndFitter from '@/api/treeAssembleAndFitter'
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
      type: String
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
      roleMenuList: [],
      defaultCheck: []
    }
  },
  components: {},
  mounted () {
  },
  computed: {
    ...mapState({
      EditVisible: state => state.EditVisible,
      permission: state => state.permission,
      permissionFitter: state => state.role.permissionFitter.map(item => item.menuInfoId)
    })
  },
  methods: {
    ...mapMutations([
      'EditVisibleChange'
    ]),
    infoDetail () {
      this.webapi({
        url: `/user/api/role/getRoleDetailById`,
        data: {
          roleInfoId: this.infoId
        }
      }).then(res => {
          const { resultCode, data, resultMessage } = res
          this.defaultCheck = []
          let defaultResponse = []
          if (resultCode === code.CODE_SUCCESS) {
            defaultResponse = data.roleMenuList.map(item => item.menuInfoId)
            this.defaultCheck = this.permissionFitter.filter(item => defaultResponse.includes(item))
            for (let i in this.ruleForm) {
              data[i] !== undefined && (this.ruleForm[i] = data[i])
            }
            this.ruleForm.menuInfoIds = defaultResponse.join()
          }
        })
    },
    addMenu () {
      this.webapi({
        url: `/user/api/role/updateRole`,
        data: {
          ...this.ruleForm,
          roleInfoId: this.infoId
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
      this.$refs.tree.setCheckedKeys([])
      this.ruleForm.menuInfoIds = ''
    },
    menuInfoIdsChange (check, data) {
      this.ruleForm.menuInfoIds = [...data.checkedKeys, ...data.halfCheckedKeys].join()
    }
  },
  watch: {
    'EditVisible': function (val) {
      val && this.infoDetail()
      !val && this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
