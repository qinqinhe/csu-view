<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加拜访记录"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="138px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="来访者身份证号码" prop="guestIdentificationNumber">
            <el-input v-model="ruleForm.guestIdentificationNumber" placeholder="请输入来访者身份证号码"/>
          </el-form-item>
          <el-form-item label="来访者姓名" prop="guestName">
            <el-input v-model="ruleForm.guestName" placeholder="请输入来访者姓名"/>
          </el-form-item>
          <el-form-item label="来访者电话" prop="guestPhoneNumber">
            <el-input type='number' v-model="ruleForm.guestPhoneNumber" placeholder="请输入来访者电话"/>
          </el-form-item>
          <el-form-item label="拜访者" prop="visitorUser">
            <el-select v-model="ruleForm.visitorUser" size="medium" clearable placeholder="请选择来访者" @blur='guestCheck'>
              <el-option
                v-for="item in faculty"
                :key="item.userInfoId"
                :label="item.userName"
                :value='`${item.userInfoId}-${item.userName}-${item.phoneNumber}`'
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="拜访者电话" prop="visitorPhoneNumber">
            <el-input type='number' maxlength='11' v-model="ruleForm.visitorPhoneNumber" placeholder="请输入拜访者电话"/>
          </el-form-item> -->
          <el-form-item label="确认方式" prop="confirmationMethod">
            <el-select v-model="ruleForm.confirmationMethod" size="medium" clearable placeholder="请选择确认方式">
              <el-option
                v-for="item in confirmationMethodSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="拜访原因" prop="visitCause">
            <el-input type="textarea" v-model="ruleForm.visitCause" placeholder="请输入拜访原因"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"/>
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
      :parentIds.sync='ruleForm.parentIds'
      :TreeChooseName.sync='ruleForm.parentName'
      :id.sync='ruleForm.parentId'
      :TreeChooseType='2'
      title='菜单选择'
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
          visitorUser: '',
          visitorUserId: '',
          visitorUserName: '',
          visitorPhoneNumber: '',
          guestIdentificationNumber: '',
          guestName: '',
          guestPhoneNumber: '',
          confirmationMethod: '',
          visitCause: '',
          remarks: ''
        },
        confirmationMethodSelect: [{
          value: '1',
          label: '电话确认'
        }, {
          value: '2',
          label: '消息确认'
        }],
        
        rules: {
          visitorUser: [
            { required: true, message: '请选择拜访者', trigger: 'blur' }
          ],
          guestIdentificationNumber: [
            { required: true, message: '请输入来访者身份证号码', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])([0-2]\d|3[0-1])\d{3}(\d|X)$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的身份证号码'))
                }
              }
            }
          ],
          guestName: [
            { required: true, message: '请选择来访者姓名', trigger: 'blur' }
          ],
          guestPhoneNumber: [
            { required: true, message: '请选择来访者电话', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                const reg = /^1\d{10}$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入正确的电话号码'))
                }
              }
            }
          ],
          confirmationMethod: [
            { required: true, message: '请选择确认方式', trigger: 'change' }
          ],
          visitCause: [
            { required: true, message: '请输入来访原因', trigger: 'change' }
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
        faculty: state => state.visitMange.faculty
      })
    },
    methods: {
      ...mapMutations([
        'AddVisibleChange'
      ]),
      add () {
        const visitorUser = this.ruleForm.visitorUser.split('-')
        this.ruleForm.visitorUserId = visitorUser[0]
        this.ruleForm.visitorUserName = visitorUser[1]
        this.ruleForm.visitorPhoneNumber = visitorUser[2]
        this.webapi({
          url: '/guard/api/CollegeVisitRecord/applyForVisit ',
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
            this.add()
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
    .dialog-form {
      div {
        overflow: hidden;
        margin-bottom: 5px;

        span:first-child {
          width: 100px;
          height: 24px;
          
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

  .dialog-search {
    .search {
      overflow: hidden;

      span:first-child {
        width: 60px;
        float: left;
        line-height: 40px;
        text-align: right;
        padding-right: 15px;
      }

      span:last-child {
        width: calc(100% - 60px);
        float: right;

        input {
          width: 100%;
        }
      }
    }

    .treeExpandCollapse {
      position: absolute;
      right: 0;
      top: 5px;

      span {
        width: auto;
        cursor: pointer;
      }
    }

    .filter-tree {
      width: calc(100% - 62px);
    }

    .dialog-allBtn {
      width: 460px;
      left: 20px;
    }
  }

  .Linkage {
    div {
      width: 32.5%;
      float: left;
      position: relative;
      margin-right: 4.4px;

      .tit {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        width: 35px;
        padding-right: 5px;
        z-index: 1;
        line-height: 28px;
      }

      .el-select {
        width: 100%;

        .el-input {
          width: 100%;
        }
      }
    }

    div:last-child {
      margin-right: 0;
    }
  }
</style>
