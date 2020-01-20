<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="permissionVisible"
      @close="permissionVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="编辑数据权限"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="部门权限" prop="departmentInfoIds">
            <el-tree
              show-checkbox
              node-key="id"
              :data='department'
              :default-checked-keys="departmentDefaultCheck"
              @check='departmentsChange'
              ref='departmentTree'
            >
            </el-tree>
          </el-form-item>
          <el-form-item label="位置权限" prop="placeInfoIds">
            <el-tree
              show-checkbox
              node-key="id"
              :data='placeAll'
              :default-checked-keys="placeDefaultCheck"
              @check='placeInfoIdsChange'
              ref='palceTree'
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
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'
  import TreeCsu from '@/components/Tree/TreeCsu'

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
          departmentInfoIds: '',
          placeInfoIds: ''
        },
        rules: {},
        TreeChooseState: false,
        departmentDefaultCheck: [],
        placeDefaultCheck: [],
        departmentTree: []
      }
    },
    components: {
      TreeCsu
    },
    mounted () {
    },
    computed: {
      ...mapState({
        permissionVisible: state => state.role.permissionVisible,
        permission: state => state.permission,
        department: state => state.role.department,
        placeAll: state => state.role.placeAll,
        departmentFitter: state => state.role.departmentFitter.map(item => item.departmentInfoId),
        placeFitter: state => state.role.placeFitter.map(item => item.placeInfoId)
      })
    },
    methods: {
      ...mapActions('role', [
        'permissionVisibleChange'
      ]),
      async infoDetail () {
        await this.webapi({
          url: '/system/api/place/queryPlaceDetails',
          data: {
            roleInfoId: this.infoId
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            this.defaultCheck = []
            if (resultCode === code.CODE_SUCCESS) {
              this.placeDefaultCheck = this.placeFitter.filter(item => data.includes(item))
              this.ruleForm.placeInfoIds = data
            }
          })
        await this.webapi({
          url: '/user/api/department/queryDeptDetails',
          data: {
            roleInfoId: this.infoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          this.defaultCheck = []
          this.departmentDefaultCheck = []
          if (resultCode === code.CODE_SUCCESS) {
            this.departmentDefaultCheck = this.departmentFitter.filter(item => data.includes(item))
            this.ruleForm.departmentInfoIds = data
          }
        })
      },
      departmentsChange (check, data) {
        this.ruleForm.departmentInfoIds = [...data.checkedKeys, ...data.halfCheckedKeys]
      },
      placeInfoIdsChange (check, data) {
        this.ruleForm.placeInfoIds = [...data.checkedKeys, ...data.halfCheckedKeys]
      },
      dataScope () {
        const departmentInfoIds = this.ruleForm.departmentInfoIds.filter(item => {
          return this.departmentFitter.includes(item)
        })
        const departmentParentIds = this.ruleForm.departmentInfoIds.filter(item => {
          return !this.departmentFitter.includes(item)
        })
        const placeInfoIds = this.ruleForm.placeInfoIds.filter(item => {
          return this.placeFitter.includes(item)
        })
        const placeParentIds = this.ruleForm.placeInfoIds.filter(item => {
          return !this.placeFitter.includes(item)
        })
        this.webapi({
          url: '/user/api/role/grantDataScope',
          data: {
            departmentInfoIds,
            departmentParentIds,
            placeInfoIds,
            placeParentIds,
            roleInfoId: this.infoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          this.defaultCheck = []
          if (resultCode === code.CODE_SUCCESS) {
            this.permissionVisibleChange(false)
          }
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataScope()
          } else {
            return false
          }
        })
      },
      resetForm () {
        this.ruleForm.departmentInfoIds = ''
        this.ruleForm.placeInfoIds = ''
      }
    },
    watch: {
      'permissionVisible': function (val) {
        if (val) {
          this.infoDetail()
        } else {
          this.$refs['departmentTree'].setCheckedKeys([])
          this.$refs['palceTree'].setCheckedKeys([])
        }
      },
      'department': function (val) {
        this.departmentTree = val
      }
    }
  }
</script>
