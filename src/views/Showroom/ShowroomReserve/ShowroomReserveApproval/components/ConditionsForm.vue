<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm"
  >
    <el-form-item label="名称" prop='showroomName' class="both">
      <el-input
        placeholder="请输入名称"
        size="medium"
        v-model='ruleForm.showroomName'
      />
    </el-form-item>
    <el-form-item label="审核状态" prop='auditStatus'>
      <el-select
        v-model='ruleForm.auditStatus'
        size="medium"
        clearable
        placeholder="请选择时间"
      >
        <el-option
          v-for="item in auditStatusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="flex" label-width="20px" style='width:auto'>
      <el-button
        class="btn-query"
        size="mini"
        @click='inquiry()'
      >查询
      </el-button>
      <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <p class="both"/>
  </el-form>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {

    },
    computed: {
      ...mapState({
        ruleForm: state => state.showroomReserveApproval.conditionsForm.ruleForm,
        auditStatusSelect: state => state.showroomReserveApproval.conditionsForm.auditStatusSelect
      }),
      ...mapGetters('showroomReserveApproval', [
        'pickerOptionsBegin',
        'pickerOptionsFinish'
      ])
    },
    methods: {
      ...mapActions('showroomReserveApproval', [
        'conditionsRuleFormDictionaryTypeNameUpdate',
        'conditionsRuleFormDictionaryTypeStatusUpdate',
        'inquiry'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
