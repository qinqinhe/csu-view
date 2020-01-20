<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="editDateVisibleUpdate(false)"
      width="660px"
      :modal-append-to-body='false'
      title='编辑事件'
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码">
            <el-input
              :value='ruleForm.eventCode'
              disabled
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              :value='ruleForm.eventName'
              disabled
            />
          </el-form-item>
          <el-form-item label="类型">
            <el-input
              :value='eventType[ruleForm.eventType]'
              disabled
            />
          </el-form-item>
          <el-form-item label="对象">
            <el-input
              :value='ruleForm.eventObjectName'
              disabled
            />
          </el-form-item>
          <el-form-item label="所属大系统">
            <el-input
              :value='system[ruleForm.belongSystem]'
              disabled
            />
          </el-form-item>
          <el-form-item label="所属子系统">
            <el-input
              :value='subsystem[ruleForm.belongSubsystem]'
              disabled
            />
          </el-form-item>
          <el-form-item label="上报时间">
            <el-input
              :value='ruleForm.reportTime'
              disabled
            />
          </el-form-item>
          <el-form-item label="事件等级">
            <el-input
              :value='eventLevel[ruleForm.eventLevel]'
              disabled
            />
          </el-form-item>
          <el-form-item label="处置状态">
            <el-select v-model="ruleForm.eventStatus">
              <el-option
                v-for="item in eventStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处置结果">
            <el-select v-model="ruleForm.eventResult">
              <el-option
                v-for="item in eventResult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              placeholder="请输入备注"/>
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
        visible: state => state.eventInfo.editDate.visible,
        ruleForm: state => state.eventInfo.editDate.ruleForm,
        rules: state => state.eventInfo.editDate.rules,
        system: state => state.eventInfo.system,
        subsystem: state => state.eventInfo.subsystem,
        eventType: state => state.eventInfo.eventType,
        eventLevel: state => state.eventInfo.eventLevel,
        eventStatus: state => state.eventInfo.eventStatus,
        eventResult: state => state.eventInfo.eventResult
      })
    },
    methods: {
      ...mapActions('eventInfo', [
        'editDateVisibleUpdate',
        'editsubmitForm',
        'editDatedelTemplate',
        'editDateAddTemplate'
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

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

</style>
