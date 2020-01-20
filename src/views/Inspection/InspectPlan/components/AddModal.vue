<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="addDateVisibleUpdate(false)"
      width="900px"
      :modal-append-to-body='false'
      title="添加巡检计划"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="inspectPlanCode">
            <el-input
              v-model="ruleForm.inspectPlanCode"
              placeholder="请输入编码"
            />
          </el-form-item>
          <el-form-item label="名称" prop="inspectPlanName">
            <el-input
              v-model="ruleForm.inspectPlanName"
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item label="排序" prop="inspectItemSort">
            <el-input
              type='number'
              v-model="ruleForm.inspectItemSort"
              placeholder="请输入排序"
            />
          </el-form-item>
          <el-form-item label="状态" prop="inspectPlanStatus">
            <el-select
              v-model="ruleForm.inspectPlanStatus"
              size="medium"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in inspectPlanStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="巡检路线" prop="inspectLineInfoId">
            <el-select
              v-model="ruleForm.inspectLineInfoId"
              size="medium"
              placeholder="请选择巡检路线">
              <el-option
                v-for="item in inspectLine"
                :key="item.inspectLineInfoId"
                :label="item.inspectLineName"
                :value="item.inspectLineInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="执行时间" prop="inspectPlanExecuteTime">
            <el-date-picker
              v-model="ruleForm.inspectPlanExecuteTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              value-format='yyyy-MM-dd HH:mm:ss'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效至期" prop="validPeriod">
            <el-date-picker
              v-model="ruleForm.validPeriod"
              type="datetime"
              :picker-options="pickerOptions"
              value-format='yyyy-MM-dd HH:mm:ss'
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="巡检周期（天）" prop="inspectPeriod">
            <el-input
              type='number'
              v-model="ruleForm.inspectPeriod"
              placeholder="请输入巡检周期"
            />
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              placeholder="请输入备注"/>
          </el-form-item>
          <section class="table-add">
            <section class="table-add-head flex">
              <p class="table-add-title">添加巡检人<span class="table-add-warn" v-show='ruleForm.addListTotalwarning'>
                <i class="el-icon-warning-outline"/>请添加时间段</span>
              </p>
              <el-button type="primary" size="medium" @click='addDateAddTemplate'>添加模板</el-button>
            </section>
            <el-table
              :data="ruleForm.inspectPlanExecutorAddVo"
              style="width: 100%"
            >
              <el-table-column type="index" lable=' ' width="55"/>
              <el-table-column label="排序" width="90" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    type='number'
                    label-width='0'
                    :prop='"inspectPlanExecutorAddVo." + scope.$index + ".planExecutorSort"'
                    :rules='rules.planExecutorSort'
                  >
                    <el-input v-model="scope.row.planExecutorSort" placeholder="请输入排序"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="编码" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    type='number'
                    label-width='0'
                    :prop='"inspectPlanExecutorAddVo." + scope.$index + ".inspectPlanExecutorCode"'
                    :rules='rules.inspectPlanExecutorCode'
                  >
                    <el-input v-model="scope.row.inspectPlanExecutorCode" placeholder="请输入编码"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="巡检人" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    type='number'
                    label-width='0'
                    :prop='"inspectPlanExecutorAddVo." + scope.$index + ".planExecutor"'
                    :rules='rules.planExecutor'
                  >
                    <el-select
                      v-model="scope.row.planExecutor"
                      size="medium"
                      placeholder="请选择巡检人">
                      <el-option
                        v-for="item in planExecutor"
                        :key="item.userInfoId"
                        :label="item.userName"
                        :value="`${item.userInfoId}-${item.userName}`"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align='center'>
                <template slot-scope="scope">
                  <el-button type="danger" size="medium" @click='addDatedelTemplate(scope.$index)'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
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
        visible: state => state.inspectPlan.addDate.visible,
        ruleForm: state => state.inspectPlan.addDate.ruleForm,
        rules: state => state.inspectPlan.addDate.rules,
        inspectPlanStatus: state => state.inspectPlan.inspectPlanStatus,
        inspectLine: state => state.inspectPlan.inspectLine,
        pickerOptions: state => state.inspectPlan.pickerOptions,
        planExecutor: state => state.inspectPlan.planExecutor
      })
    },
    methods: {
      ...mapActions('inspectPlan', [
        'addDateVisibleUpdate',
        'addsubmitForm',
        'addDatedelTemplate',
        'addDateAddTemplate',
        'addListTotalwarningUpdate'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid && this.ruleForm.inspectPlanExecutorAddVo.length) {
            this.addsubmitForm()
          } else if (this.ruleForm.inspectPlanExecutorAddVo.length === 0) {
            this.addListTotalwarningUpdate(true)
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
