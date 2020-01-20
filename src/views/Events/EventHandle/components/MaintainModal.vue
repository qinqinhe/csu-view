<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="maintainDateVisibleUpdate(false)"
      width="660px"
      :modal-append-to-body='false'
      title="维修"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop='maintainceInfoCode'>
            <el-input
              v-model='ruleForm.maintainceInfoCode'
              placeholder='请输入编码'
            />
          </el-form-item>
          <el-form-item label="维修时间" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              type="datetimerange"
              :picker-options="pickerOptions"
              value-format='yyyy-MM-dd HH:mm:ss'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="说明" prop='description'>
            <el-input
              text='textarea'
              v-model='ruleForm.description'
              placeholder='请输入说明'
            />
          </el-form-item>
          <el-form-item label="维护人" prop='maintaincePersoner'>
            <el-select v-model="ruleForm.maintaincePersoner">
              <el-option
                v-for="item in maintaincePerson"
                :key="item.userInfoId"
                :label="item.userName"
                :value="`${item.userInfoId}-${item.userName}`"
              />
            </el-select>
          </el-form-item>
          <section class="table-add">
            <section class="table-add-head flex">
              <p class="table-add-title">添加维修清单<span class="table-add-warn" v-show='ruleForm.addListTotalwarning'>
                <i class="el-icon-warning-outline"/>请添加时间段</span>
              </p>
              <el-button type="primary" size="medium" @click='maintainDateAddTemplate'>添加模板</el-button>
            </section>
            <el-table
              :data="ruleForm.maintainceLists"
              style="width: 100%"
            >
              <el-table-column type="index" lable=' ' width="55"/>
              <el-table-column label="编码" width="90" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    type='number'
                    label-width='0'
                    :prop='"maintainceLists." + scope.$index + ".maintainceListCode"'
                    :rules='rules.maintainceListCode'
                  >
                    <el-input v-model="scope.row.maintainceListCode" placeholder="请输入编码"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="值" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"maintainceLists." + scope.$index + ".hardNumber"'
                    :rules='rules.hardNumber'
                  >
                    <el-input v-model="scope.row.hardNumber" placeholder="请输入数量"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="类型" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"maintainceLists." + scope.$index + ".hardType"'
                    :rules='rules.hardType'
                  >
                    <el-select v-model="scope.row.hardType" size="medium" placeholder="请选择类型">
                      <el-option
                        v-for="item in hardType"
                        :key="item.dictionaryDataInfoId"
                        :label="item.dictionaryValue"
                        :value="item.dictionaryDataInfoId"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align='center'>
                <template slot-scope="scope">
                  <el-button type="danger" size="medium" @click='maintaindelTemplate(scope.$index)'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        visible: state => state.eventHandle.maintainDate.visible,
        ruleForm: state => state.eventHandle.maintainDate.ruleForm,
        rules: state => state.eventHandle.maintainDate.rules,
        pickerOptions: state => state.eventHandle.pickerOptions,
        maintaincePerson: state => state.eventHandle.maintaincePerson,
        hardType: state => state.eventHandle.hardType
      })
    },
    methods: {
      ...mapActions('eventHandle', [
        'maintainDateVisibleUpdate',
        'maintainSubmitForm',
        'maintainDateAddTemplate',
        'maintaindelTemplate',
        'maintainAddListTotalwarning'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid && this.ruleForm.maintainceLists.length) {
            this.maintainSubmitForm()
          } else if (this.ruleForm.maintainceLists.length === 0) {
            this.maintainAddListTotalwarning(true)
          }
        })
      }

    },
    watch: {
      'visible': function (val) {
        !val && this.resetForm('ruleForm')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content > .el-form-item {
    width: 500px;
  }

  .table-add {
    padding-top: 30px;

    .table-add-head {
      justify-content: space-between;

      .table-add-title {
        font-size: 20px;

        .table-add-warn {
          color: #F56C6C;
          font-size: 12px;
          padding-left: 8px;
        }
      }
    }
  }

  .table-add .el-form-item {
    margin-bottom: 0;
  }
</style>
