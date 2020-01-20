<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm"
  >
    <el-form-item label="名称" prop='inspectPlanName'>
      <el-input
        placeholder="请输入名称"
        size="medium"
        v-model="ruleForm.inspectPlanName"
      />
    </el-form-item>
    <el-form-item label="状态" prop='inspectPlanStatus'>
      <el-select
        v-model="ruleForm.inspectPlanStatus"
        size="medium"
        clearable
        placeholder="请选择状态"
      >
        <el-option
          v-for="item in inspectPlanStatusSelect"
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
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {

    },
    computed: {
      ...mapState({
        ruleForm: state => state.inspectPlan.conditionsForm.ruleForm,
        inspectPlanStatusSelect: state => state.inspectPlan.conditionsForm.inspectPlanStatusSelect
      })
    },
    methods: {
      ...mapActions('inspectPlan', [
        'conditionsRuleFormDictionaryTypeNameUpdate',
        'conditionsRuleFormDictionaryTypeStatusUpdate',
        'inquiry'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.inquiry()
      }
    }
  }
</script>
/n
