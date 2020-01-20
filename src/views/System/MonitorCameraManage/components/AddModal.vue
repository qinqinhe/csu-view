<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加监控探头"
    >
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- </div> -->
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
    computed: {
      ...mapState({
        AddVisible: state => state.AddVisible,
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
    mounted () {
    },
    watch: {
      'ruleForm.placeType': function (val) {
        this.dataTreeFilter = []
        const dataTree = JSON.parse(JSON.stringify(this.dataTree.filter(item => item.placeType !== '4')))
        if (val === '3' || val === '2') {
          this.parentName = ''
          this.parentIds = ''
          dataTree.forEach(item => {
            if (item.children && val !== '2') {
              item.children.forEach(items => {
                delete items.children
              })
            } else {
              delete item.children
            }
            this.dataTreeFilter.push(item)
          })

        } else {
          this.parentName = ''
          this.parentIds = '0'
        }
      }
    },
    methods: {

      ...mapMutations([
        
        'AddVisibleChange'
      ]),
      
      addMenu () {
        const parentIds = this.ruleForm.palceParentIds.split(',')
        const len = parentIds.length
        this.ruleForm.affiliatedBuilding =
          len > 0 ? parentIds[len - 1] : '0'
        this.ruleForm.affiliatedFloor =
          len > 1 ? parentIds[len - 2] : '0'
        this.ruleForm.affiliatedRoom =
          len > 2 ? parentIds[len - 3] : '0'

        console.log(this.ruleForm)
        this.webapi({
          url: '/system/api/monitorCamera/addMonitorCameraInfo',
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
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "@/assets/css/model.scss";

  .line {
    text-align: center;
  }

  .dialog-model {
    .dialog-form {
      div {
        overflow: hidden;
        margin-bottom: 5px;

        span:first-child {
          width: 100px;
          height: 24px;
          float: left;
          line-height: 28px;
          text-align: right;
          padding-right: 25px;
          text-align: justify;
          display: inline-block;
          vertical-align: top;

          i {
            display: inline-block;
            width: 100%;
            height: 0;
          }
        }

        span:last-child {
          width: calc(100% - 126px);
          float: right;

          input {
            width: 100%;
          }
        }

        .form-radio {
          line-height: 40px;
        }
      }
    }
  }

</style>
