<template>
  <div class="modal-dialog">
    <el-dialog class="dialog-model"
               :visible="visible"
               @close="editDateVisibleUpdate(false)"
               width="900px"
               :modal-append-to-body='false'
               title="新增预约">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P">
        <section class="dialog-from-content">
          <el-form-item label="陈列室" prop="reserveObjectName">
            <el-input
              readonly
              v-model="ruleForm.reserveObjectName"
            />
          </el-form-item>
          <el-form-item label="申请人" prop="applyUserName">
            <el-input
              readonly
              v-model="ruleForm.applyUserName"/>
          </el-form-item>
          <el-form-item label="时间段" prop="time">
            <el-input
              readonly
              :value='ruleForm.time'/>
          </el-form-item>
          <el-form-item label="类型" prop="laboratoryType">
            <el-input
              disabled
              :value='ruleForm.laboratoryType'/>
          </el-form-item>
          <!-- <el-form-item label="类型" prop="laboratoryType">
            <el-input
              :value='laboratoryType[ruleForm.laboratoryType]'/>
          </el-form-item> -->
          <el-form-item label="内容" prop="context">
            <el-input
              v-model="ruleForm.context"
              type='textarea'
              placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              type='textarea'
              placeholder="请输入备注"/>
          </el-form-item>
          <el-form-item label="预约人员" prop="reserveUser">
            <el-checkbox-group v-model="ruleForm.reserveUser">
              <el-checkbox v-for="item in students" :label="item.userInfoId + ' - ' + item.userName"
                           :key="item.userInfoId">{{ item.userName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
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
        visible: state => state.laboratoryReserveManage.editDate.visible,
        ruleForm: state => state.laboratoryReserveManage.editDate.ruleForm,
        rules: state => state.laboratoryReserveManage.editDate.rules,
        students: state => state.laboratoryReserveManage.editDate.students,
        laboratoryType: state => state.laboratoryReserveManage.laboratoryType
      })
    },
    methods: {
      ...mapActions('laboratoryReserveManage', [
        'editDateVisibleUpdate',
        'editsubmitForm'
        // 'studentsCheck'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.editsubmitForm()
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
