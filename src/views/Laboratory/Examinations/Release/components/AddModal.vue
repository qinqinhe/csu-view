<template>
  <div class="modal-dialog">
    <el-dialog
      title="发布考试"
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="1100px"
      :modal-append-to-body="false"
    >
      <el-form
          ref="ruleForm"
          label-width="100px"
        >
        <section class="dialog-from-content">
          <el-form-item label="考试名称" prop="examinationName">
            <el-input size="medium" v-model="ruleForm.examinationName" placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择日期时间"
              :picker-options="pickerOptionsBegin"
              @change="startTimeClick"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择日期"
              :picker-options="pickerOptionsFinish"
              @change="endTimeClick"
            />
          </el-form-item>
          <el-form-item label="科目" prop="laboratoryType">
            <el-select
              size="medium"
              v-model="ruleForm.laboratoryType"
              placeholder="请选择科目"
              clearable
            >
              <el-option
                v-for="(item) in laboratory"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="合格分数" prop="qualifiedScore">
            <el-input size="medium" v-model="ruleForm.qualifiedScore" placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item label="考试状态" prop="examinationStatus">
            <el-select
              size="medium"
              v-model="ruleForm.examinationStatus"
              placeholder="请选择考试状态"
              clearable
            >
              <el-option
                v-for="(item) in examinationStatusSel"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="注意事项" prop="examinationPrecautions">
            <el-input
              size="medium"
              type="textarea"
              v-model="ruleForm.examinationPrecautions"
              placeholder="请输入注意事项"
            />
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input size="medium" type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"/>
          </el-form-item>
          <div class="template-manage">
            <div class="temp-title">
              <p class="icon-box">
                <span class="name fsize16P fw600">考场信息</span>
              </p>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="tempList.push({
                  examinationHallName: '',
                  userName: '',
                  examinationHallAddress: '',
                  examinationHallCapacity: '',
                  remarks: '',
                })"
              >新增考场
              </el-button>
            </div>
            <div class="temp-list">
              <el-table class="template-list" :data="tempList" style="width: 100%">
                <el-table-column label="考场名字" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.examinationHallName" placeholder="请填写考场名字"/>
                  </template>
                </el-table-column>
                <el-table-column label="监考老师" align="center">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.userName"
                      placeholder="监考老师"
                      @change="selectUserInfoId(scope.$index,scope.row)"
                    >
                      <el-option
                        v-for="item in userNameSelect"
                        :key="item.label"
                        :label="item.value"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="考场地址" align="center" width='180'>
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.examinationHallAddress"
                      placeholder="请选择考试地址"
                      @focus="placeChoose(scope.$index, scope.row,scope.row.examinationHallAddress)"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="考场容量" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.examinationHallCapacity" placeholder="请填写考场容量"/>
                  </template>
                </el-table-column>
                <el-table-column label="备注" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remarks" placeholder="请填写备注"/>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="tempList.splice(scope.row.$index, 1)"
                    >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </section>      
        <el-form-item class="dialog-footer">
          <el-button @click="AddVisibleChange(false)">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <TreeChooseParent
      :dataTree="dataTree"
      :dataNative="dataNative"
      :visible.sync="TreeChooseState"
      :parentIds.sync="ruleForm.parentIds"
      :TreeChooseName.sync="ruleForm.parentName"
      :id.sync="ruleForm.position"
      :parentNames.sync="ruleForm.parentName"
      :TreeChooseType="0"
      title="菜单选择"
      @clickNodesCallBack="clickNodesCallBack()"
    />
  </div>
</template>

<script>
  import { Message } from 'element-ui'
  import { mapState, mapMutations } from 'vuex'
  import TreeChooseParent from '@/components/Tree/TreeChooseParent'
  import { code, local } from '@/config/wildcard'

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
          
          examinationName: '',
          
          startTime: '',
          
          endTime: '',
          
          laboratoryType: '',
          
          qualifiedScore: '',
          
          examinationStatus: '',
          
          examinationPrecautions: '',
          
          remarks: '',

          
          affiliatedBuilding: '',
          
          affiliatedFloor: '',
          
          affiliatedRoom: '',
          
          position: '',
          
          parentIds: '',
          //
          parentName: ''
        },

        tempList: [],
        userNameSelect: [
          {
            label: '51564554848411555',
            value: '丽达尔'
          },
          {
            label: '54445484812511544',
            value: '金克斯'
          },
          {
            label: '45547874877896325',
            value: '唐闻生'
          }
        ],
        
        examinationStatusSel: [
          {
            value: '0',
            label: '不可预约'
          },
          {
            value: '1',
            label: '可预约'
          }
        ],
        
        departmentVisible: false,
        
        pickerOptions: {
          disabledDate: time => {
            const curDate = Date.now()
            return time.getTime() > curDate
          }
        },
        
        rules: {
          examinationName: [
            {
              required: true,
              message: '请输入考试名称',
              trigger: 'blur'
            }
          ],
          startTime: [
            {
              required: true,
              message: '请选择开始时间',
              trigger: 'blur'
            }
          ],
          endTime: [
            {
              required: true,
              message: '请选择结束时间',
              trigger: 'blur'
            }
          ],
          laboratoryType: [
            {
              required: true,
              message: '请选择题目类型',
              trigger: 'change'
            }
          ],
          qualifiedScore: [
            {
              required: true,
              message: '请输入合格分数',
              trigger: 'blur'
            }
          ],
          examinationStatus: [
            {
              required: true,
              message: '请选择考试状态',
              trigger: 'change'
            }
          ],
          examinationPrecautions: [
            {
              required: true,
              message: '请输入考试注意事项',
              trigger: 'blur'
            }
          ]
        },
        TreeChooseState: false,
        
        placeRow: null
      }
    },
    created () {
      this.tempList = JSON.parse(localStorage.getItem('tempList'))
    },
    components: {
      TreeChooseParent
    },
    mounted () {},
    computed: {
      ...mapState({
        AddVisible: state => state.AddVisible,
        user: state => state.dictionary.user,
        laboratory: state => state.dictionary.laboratory
      }),
      pickerOptionsBegin () {
        return {
          disabledDate: time => {
            const curDate = Date.now()
            if (this.ruleForm.endTime) {
              return (
                time.getTime() < curDate ||
                time.getTime() < new Date(this.ruleForm.endTime).getTime()
              )
            } else {
              return time.getTime() < curDate - 24 * 60 * 60 * 1000
            }
          }
        }
      },
      pickerOptionsFinish () {
        return {
          disabledDate: time => {
            const curDate = Date.now()
            if (this.ruleForm.startTime) {
              return (
                time.getTime() < curDate - 24 * 60 * 60 * 1000 ||
                time.getTime() <=
                new Date(this.ruleForm.startTime).getTime() -
                24 * 60 * 60 * 1000
              )
            } else {
              return time.getTime() < curDate - 24 * 60 * 60 * 1000
            }
          }
        }
      }
    },
    watch: {
      AddVisible: function (val) {
        val && (this.tempList = [])
      },
      'ruleForm.parentIds': function (val) {
        const arr = val.split(',')
        this.ruleForm.affiliatedBuilding = arr[2]
        this.ruleForm.affiliatedFloor = arr[1]
        this.ruleForm.affiliatedRoom = arr[0]
      }
    },
    methods: {
      ...mapMutations([
        
        'AddVisibleChange'
      ]),
      startTimeClick (val) {
        //时间
        var date1 = new Date(val)
        //现在时间
        var date2 = new Date()
        //判断时间是否过期
        
        
        if (date1 < date2) {
          this.$message({
            type: 'error',
            message: '选择时间必须大于当前时间'
          })
        }
      },
      endTimeClick (val) {
        //时间
        var date1 = new Date(val)
        //现在时间
        var date2 = new Date(this.ruleForm.startTime)
        console.log(date2)
        //判断时间是否过期
        
        
        console.log(date1, date2)
        if (date1 < date2) {
          this.$message({
            type: 'error',
            message: '选择结束时间必须大于开始时间'
          })
        }
      },
      placeChoose (index, row, val) {
        this.$set(this.tempList[index], 'examinationHallAddress', '')
        this.placeRow = index
        this.TreeChooseState = true
      },
      clickNodesCallBack () {
        this.tempList[this.placeRow].examinationHallAddress = this.ruleForm.parentName
      },
      selectUserInfoId (index, val) {
        let valueName = val.userName
        let obj = {}
        obj = this.userNameSelect.find(item => {
          //这里的userList就是上面遍历的数据源
          return item.value === valueName //筛选出匹配数据
        })
        //
        this.$set(this.tempList[index], 'userInfoId', obj.label)
      },
      
      addMenu () {
        for (let i in this.tempList) {
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].examinationHallName'
            ] = this.tempList[i].examinationHallName
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].examinationHallAddress'
            ] = this.tempList[i].examinationHallAddress
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].examinationHallCapacity'
            ] = this.tempList[i].examinationHallCapacity
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].userInfoId'
            ] = this.tempList[i].userInfoId
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].userName'
            ] = this.tempList[i].userName
          this.ruleForm[
          'examinationHallInfoAddVoList[' + i + '].remarks'
            ] = this.tempList[i].remarks
        }
        this.webapi({
          url: '/examination/api/examinationInfo/addExaminationInfo ',
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
        this.$refs[formName].validate(valid => {
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

  .dialog-model {
    .dialog-from-content{

      .el-form-item {
        width: 480px;
      }
    }
    .dialog-form-width {
      overflow: hidden;
      border-bottom: solid 1px #e8eaec;

      .el-form-item {
        width: 480px;
      }
    }

    .dialog-form {
      .el-textarea {
        margin-bottom: 25px;
      }
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

        .el-input {
          width: 100%;
        }

        .form-radio {
          line-height: 40px;
        }
      }
    }
  }

  .template-manage {
    width: 100%;
    margin: 0 auto;

    .temp-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;
      margin-top: 20px;
    }

    .el-table {
      background-color: #f7f7f7;
      margin-top: 20px;

      th > .cell {
        text-align: center !important;
      }
    }

    .operate-groups {
      display: flex;
      justify-content: flex-start;

      .upAndDown {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .el-button--mini {
          padding: 0;
          width: 30px;
          margin-left: 0;
        }

        .down {
          margin-top: 2px;
        }
      }
    }
  }
</style>
