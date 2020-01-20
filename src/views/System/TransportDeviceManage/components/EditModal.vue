<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加设备"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="transportDeviceCode">
            <el-input v-model="ruleForm.transportDeviceCode" placeholder="请输入传输装置编码"/>
          </el-form-item>
          <el-form-item label="名称" prop="transportDeviceName">
            <el-input v-model="ruleForm.transportDeviceName" placeholder="请输入传输装置名称"/>
          </el-form-item>
          <el-form-item label="生产厂商" prop="transportDeviceVendor">
            <el-input v-model="ruleForm.transportDeviceVendor" placeholder="请输入传输装置制造厂商"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type='textarea' v-model="ruleForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确认编辑</el-button>
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
          transportDeviceCode: '',
          transportDeviceName: '',
          transportDeviceVendor: '',
          remarks: ''
        },
        rules: {
          transportDeviceCode: [
            { required: true, message: '请输入传输装置编码', trigger: 'blur' }
          ],
          transportDeviceName: [
            { required: true, message: '请输入传输装置名称', trigger: 'blur' }
          ],
          transportDeviceVendor: [
            { required: true, message: '请输入传输装置生产厂商', trigger: 'blur' }
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
          url: '/system/api/transportDevice/getTransportDeviceDetail',
          data: {
            transportDeviceId: this.infoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            for (let i in this.ruleForm) {
              const item = this.ruleForm[i]
              data[i] !== undefined && (this.ruleForm[i] = data[i])
            }
          }
        })

      },
      addMenu () {
        this.webapi({
          url: '/system/api/transportDevice/updateTransportDevice',
          data: {
            ...this.ruleForm,
            transportDeviceId: this.infoId
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
