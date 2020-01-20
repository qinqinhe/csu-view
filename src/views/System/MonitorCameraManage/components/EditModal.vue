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
      <!-- <div class="dialog-container radius10P"> -->
      <!-- <div class="dialog-header">
        <p class="fsize24P textC mB20P">编辑设备</p>
      </div> -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="monitorCameraCode">
            <el-input v-model="ruleForm.monitorCameraCode" placeholder="请输入监控探头编码"/>
          </el-form-item>
          <el-form-item label="名称" prop="monitorCameraName">
            <el-input v-model="ruleForm.monitorCameraName" placeholder="请输入监控探头名称"/>
          </el-form-item>
          <el-form-item label="生产厂商" prop="monitorCameraFactoryOwner">
            <el-input v-model="ruleForm.monitorCameraFactoryOwner" placeholder="请输入监控探头生产厂商"/>
          </el-form-item>
          <el-form-item label="生产日期" prop="produceDate">
            <el-date-picker
              v-model="ruleForm.produceDate"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsBegin"
            />
          </el-form-item>
          <el-form-item label="有效至期" prop="warrantyDeadline">
            <el-date-picker
              v-model="ruleForm.warrantyDeadline"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsFinish"
            />
          </el-form-item>
          <el-form-item label="型号" prop="monitorCameraModel">
            <el-input v-model="ruleForm.monitorCameraModel" placeholder="请输入监控探头型号"/>
          </el-form-item>
          <el-form-item label="类型" prop="monitorCameraType">
            <el-select v-model="ruleForm.monitorCameraType" placeholder="请选择监控探头类型">
              <el-option
                v-for="item in monitorCameraTypeSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景" prop="monitorCameraScenes">
            <el-select v-model="ruleForm.monitorCameraScenes" placeholder="请选择监控探头场景">
              <el-option
                v-for="item in monitorCameraScenesSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="采购人" prop="purchaserName">
            <el-input v-model="ruleForm.purchaserName" placeholder="请输入采购人"/>
          </el-form-item>
          <el-form-item label="采购人电话" prop="purchaserPhone">
            <el-input type='number' v-model="ruleForm.purchaserPhone" placeholder="请输入采购人电话" maxlength="11"/>
          </el-form-item>
          <el-form-item label="状态" prop="monitorCameraStatus">
            <el-select v-model="ruleForm.monitorCameraStatus" placeholder="请选择监控探头状态">
              <el-option
                v-for="item in monitorCameraStatusSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="ip地址" prop="monitorCameraIpAddr">
            <el-input v-model="ruleForm.monitorCameraIpAddr" placeholder="请输入监控探头ip地址"/>
          </el-form-item>
          <el-form-item label="位置" prop="palceParentNames">
            <el-input v-model="ruleForm.palceParentNames" @focus="TreeChooseState=true" placeholder="请选择位置"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="ruleForm.remarks" placeholder="请输入监控探头备注"/>
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
      :parentIds.sync='ruleForm.palceParentIds'
      :parentNames.sync='ruleForm.palceParentNames'
      :TreeChooseType='0'
      title='位置选择'
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
      infoId: {
        
      },
      info: {
        type: Function
      }
    },
    data () {
      return {
        ruleForm: {
          monitorCameraCode: '',
          monitorCameraName: '',
          monitorCameraFactoryOwner: '',
          produceDate: '',
          warrantyDeadline: '',
          monitorCameraModel: '',
          monitorCameraType: '',
          monitorCameraScenes: '',
          purchaserName: '',
          purchaserPhone: '',
          monitorCameraStatus: '',
          monitorCameraIpAddr: '',
          remarks: '',
          affiliatedBuilding: '0',
          affiliatedFloor: '0',
          affiliatedRoom: '0',
          palceParentIds: '',
          palceParentNames: ''
        },
        dataTreeFilter: [],
        monitorCameraStatusSelect: [
          {
            value: '0',
            label: '异常'
          },
          {
            value: '1',
            label: '正常'
          }
        ],
        
        rules: {
          monitorCameraCode: [
            { required: true, message: '请输入监控探头编码', trigger: 'blur' }
          ],
          monitorCameraName: [
            { required: true, message: '请输入监控探头名称', trigger: 'blur' }
          ],
          monitorCameraFactoryOwner: [
            { required: true, message: '请输入监控探头生产厂商', trigger: 'blur' }
          ],
          produceDate: [
            { required: true, message: '请输入监控探头生产日期', trigger: 'blur' }
          ],
          warrantyDeadline: [
            { required: true, message: '请输入监控探头有效至期', trigger: 'blur' }
          ],
          monitorCameraModel: [
            { required: true, message: '请输入监控探头型号', trigger: 'blur' }
          ],
          monitorCameraType: [
            { required: true, message: '请选择监控探头类型', trigger: 'change' }
          ],
          monitorCameraScenes: [
            { required: true, message: '请选择监控探头场景', trigger: 'change' }
          ],
          purchaserName: [
            { required: true, message: '请输入采购人姓名', trigger: 'blur' }
          ],
          purchaserPhone: [
            { required: true, message: '请输入采购人电话号码', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^1\d{10}/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的电话号码格式'))
                }
              }
            }
          ],
          monitorCameraStatus: [
            { required: true, message: '请选择监控探头状态', trigger: 'change' }
          ],
          monitorCameraIpAddr: [
            { required: true, message: '请输入监控探头ip地址', trigger: 'blur' }
          ],
          palceParentNames: [
            { required: true, message: '请选择位置', trigger: 'change' }
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
        monitorCameraTypeSelect: state => state.monitorCameraType,
        monitorCameraScenesSelect: state => state.monitorCameraScenes
      }),
      pickerOptionsBegin () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            if (this.ruleForm.warrantyDeadline) {
              return (time.getTime() > curDate) || (time.getTime() > new Date(this.ruleForm.warrantyDeadline).getTime())
            } else {
              return (time.getTime() > curDate)
            }
          }
        }
      },
      pickerOptionsFinish () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            if (this.ruleForm.produceDate) {
              return (time.getTime() < new Date(this.ruleForm.produceDate).getTime())
            } else {
              return false
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange'
      ]),
      infoDetail () {
        this.webapi({
          url: '/system/api/monitorCamera/queryMonitorCameraInfoDetail ',
          data: {
            monitorCameraInfoId: this.infoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            for (let i in this.ruleForm) {
              const item = this.ruleForm[i]
              data[i] !== undefined && (this.ruleForm[i] = data[i])
            }
            const affiliated = [data.affiliatedBuildingValue, data.affiliatedFloorValue, data.affiliatedRoomValue]
            this.ruleForm.palceParentNames = ''
            for (let i = 0; i < affiliated.length; i++) {
              const items = affiliated[i]
              if (items) {
                this.ruleForm.palceParentNames += items + ((i < affiliated.length - 1) ? ',' : '')
              } else {
                this.ruleForm.palceParentNames += '公共区域'
                break
              }
            }
          }
        })

      },
      
      addMenu () {
        const { produceDate, warrantyDeadline } = this.ruleForm
        this.ruleForm.produceDate = produceDate.substr(0, 10)
        this.ruleForm.warrantyDeadline = warrantyDeadline.substr(0, 10)
        console.log(this.ruleForm)
        this.webapi({
          url: '/system/api/monitorCamera/updateMonitorCameraInfo',
          data: {
            ...this.ruleForm,
            monitorCameraInfoId: this.infoId
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
