<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="handleDateVisibleUpdate(false)"
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
              v-model='ruleForm.eventHandleCode'
              placeholder='请输入编码'
            />
          </el-form-item>
          <el-form-item label="名称" prop='eventName'>
            <el-input
              v-model='ruleForm.eventName'
              placeholder='请输入名称'
            />
          </el-form-item>
          <el-form-item label="类型" prop='eventType'>
            <el-input
              :value='eventType[ruleForm.eventType]'
              readonly
            />
          </el-form-item>
          <el-form-item label="被指派人" prop='feedbackPerson'>
            <el-select v-model="ruleForm.feedbackPerson">
              <el-option
                v-for="item in feedbackPerson"
                :key="item.userInfoId"
                :label="item.userName"
                :value="`${item.userInfoId}-${item.userName}`"
              />
            </el-select>
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
        visible: state => state.eventInfo.handleDate.visible,
        ruleForm: state => state.eventInfo.handleDate.ruleForm,
        rules: state => state.eventInfo.handleDate.rules,
        eventType: state => state.eventInfo.eventType,
        feedbackPerson: state => state.eventInfo.feedbackPerson
      })
    },
    methods: {
      ...mapActions('eventInfo', [
        'handleDateVisibleUpdate',
        'handlesubmitForm'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.handlesubmitForm()
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
