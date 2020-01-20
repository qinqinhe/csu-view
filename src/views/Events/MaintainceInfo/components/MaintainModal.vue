<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="maintainDateVisibleUpdate(false)"
      width="660px"
      :modal-append-to-body='false'
      title="维修编辑"
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
              disabled
              :value='ruleForm.maintainceInfoCode'
              placeholder='请输入编码'
            />
          </el-form-item>

          <el-form-item label="维修时间" prop="time">
            <el-input
              disabled
              text='textarea'
              :value='ruleForm.startTime + "-" + ruleForm.endTime'
            />
          </el-form-item>
          <el-form-item label="说明" prop='description'>
            <el-input
              disabled
              text='textarea'
              :value='ruleForm.description'
            />
          </el-form-item>
          <el-form-item label="维修人" prop='maintaincePersoner'>
            <el-input
              disabled
              text='textarea'
              :value='ruleForm.maintaincePerson + "-" + ruleForm.maintaincePersonName'
            />
          </el-form-item>
          <el-form-item label="审核状态" prop='auditResult'>
            <el-select v-model="ruleForm.auditResult">
              <el-option
                v-for="item in auditResult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <section class="table-add">
            <section class="table-add-head flex">
              <p class="table-add-title">维修清单</p>
            </section>
            <el-table
              :data="ruleForm.maintainceLists"
              style="width: 100%"
            >
              <el-table-column type="index" lable=' ' width="55"/>
              <el-table-column prop='maintainceListCode' label="编码" align='center'/>
              <el-table-column prop='hardNumber' label="数量" align='center'/>
              <el-table-column prop='hardTypeName' label="类型" align='center'/>
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
        visible: state => state.maintainceInfo.maintainDate.visible,
        ruleForm: state => state.maintainceInfo.maintainDate.ruleForm,
        rules: state => state.maintainceInfo.maintainDate.rules,
        auditResult: state => state.maintainceInfo.auditResult
      })
    },
    methods: {
      ...mapActions('maintainceInfo', [
        'maintainDateVisibleUpdate',
        'maintainSubmitForm'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.maintainSubmitForm()
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
