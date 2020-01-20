<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="editDateVisibleUpdate(false)"
      width="660px"
      :modal-append-to-body='false'
      title="事件处置"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop='eventHandleCode'>
            <el-input
              disabled
              v-model='ruleForm.eventHandleCode'
              placeholder='请输入编码'
            />
          </el-form-item>
          <el-form-item label="名称" prop='eventName'>
            <el-input
              disabled
              v-model='ruleForm.eventName'
              placeholder='请输入名称'
            />
          </el-form-item>
          <el-form-item label="类型" prop='eventType'>
            <el-select v-model="ruleForm.eventType" disabled>
              <el-option
                v-for="item in eventType"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="被指派人" prop='feedbackPerson'>
            <el-input
              disabled
              v-model='ruleForm.feedbackPersonName'
              placeholder='请输入名称'
            />
            <!-- <el-select v-model="ruleForm.feedbackPerson"
              disabled>
              <el-option
                v-for="item in feedbackPerson"
                :key="item.userInfoId"
                :label="item.userName"
                :value="`${item.userInfoId}-${item.userName}`"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="处置结果" prop='handleResult'>
            <el-select v-model="ruleForm.handleResult">
              <el-option
                v-for="item in handleResult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处置说明" prop='handleDescription'>
            <el-input
              type='textarea'
              v-model='ruleForm.handleDescription'
              placeholder='请输入名称'
            />
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
        visible: state => state.eventHandle.editDate.visible,
        ruleForm: state => state.eventHandle.editDate.ruleForm,
        rules: state => state.eventHandle.editDate.rules,
        eventType: state => state.eventHandle.eventType,
        feedbackPerson: state => state.eventHandle.feedbackPerson,
        handleResult: state => state.eventHandle.handleResult
      })
    },
    methods: {
      ...mapActions('eventHandle', [
        'editDateVisibleUpdate',
        'editSubmitForm'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.editSubmitForm()
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

</style>
