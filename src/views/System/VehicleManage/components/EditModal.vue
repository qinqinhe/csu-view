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
          <el-form-item type='number' label="品牌" prop="vehicleBrands">
            <el-input v-model="ruleForm.vehicleBrands" placeholder="请输入车辆品牌"/>
          </el-form-item>
          <el-form-item label="型号" prop="vehicleModel">
            <el-input v-model="ruleForm.vehicleModel" placeholder="请输入车辆型号"/>
          </el-form-item>
          <el-form-item label="颜色" prop="vehicleColor">
            <el-input v-model="ruleForm.vehicleColor" placeholder="请输入颜色"/>
          </el-form-item>
          <el-form-item label="车牌号" prop="numberPlate">
            <el-input v-model="ruleForm.numberPlate" placeholder="请输入车牌号"/>
          </el-form-item>
          <el-form-item label="车主" prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="请输入车主"/>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber" placeholder="请输入手机号"/>
          </el-form-item>
          <el-form-item label="状态" prop="vehicleStatus">
            <el-select v-model="ruleForm.vehicleStatus" clearable placeholder="状态">
              <el-option
                v-for="item in vehicleStatusSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
          vehicleBrands: '',
          vehicleModel: '',
          vehicleColor: '',
          numberPlate: '',
          userName: '',
          phoneNumber: '',
          vehicleStatus: '',
          operatorName: '',
          remarks: ''
        },
        
        vehicleStatusSelect: [
          {
            value: '0',
            label: '禁用'
          },
          {
            value: '1',
            label: '正常'
          },
          {
            value: '2',
            label: '锁定'
          }],
        
        rules: {
          vehicleBrands: [
            { required: true, message: '请输入车辆品牌', trigger: 'blur' }
          ],
          vehicleModel: [
            { required: true, message: '请输入车辆型号', trigger: 'blur' }
          ],
          vehicleColor: [
            { required: true, message: '请输入显示颜色', trigger: 'blur' }
          ],
          numberPlate: [
            { required: true, message: '请输入车牌号', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入车主姓名', trigger: 'blur' },
            { min: 2, max: 15, message: '请输入 2 - 15 位字符', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '请输入车主手机号', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^1\d{10}/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的手机号码'))
                }
              }
            }
          ],
          vehicleStatus: [
            { required: true, message: '请选择车辆状态', trigger: 'blur' }
          ]
        }
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
          url: `/guard/api/vehicleInfo/queryVehicleInfoDetails`,
          data: {
            vehicleInfoId: this.infoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            let ruleForm = this.ruleForm
            for (let i in ruleForm) {
              (typeof data[i] !== 'string' || data[i].length !== 0) && (ruleForm[i] = data[i])
            }
            this.ruleForm = ruleForm
          }
        })

      },
      
      addMenu () {
        this.webapi({
          url: `/guard/api/vehicleInfo/updateVehicleInfo`,
          data: {
            ...this.ruleForm,
            vehicleInfoId: this.infoId
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
        this.infoDetail()

      }
    }
  }
</script>
