<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm"
  >
    <el-form-item label="名称" prop='dictionaryTypeName'>
      <el-input
        placeholder="请输入名称"
        size="medium"
        :value="ruleForm.dictionaryTypeName"
        @input='conditionsRuleFormDictionaryTypeNameUpdate'
      />
    </el-form-item>
    <el-form-item label="状态" prop='dictionaryTypeStatus'>
      <el-select
        :value="ruleForm.dictionaryTypeStatus"
        @input="conditionsRuleFormDictionaryTypeStatusUpdate"
        size="medium"
        clearable
        placeholder="请选择字典状态"
      >
        <el-option
          v-for="item in dictionaryTypeStatusSelect"
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
        ruleForm: state => state.dictionaryManage.conditionsForm.ruleForm,
        dictionaryTypeStatusSelect: state => state.dictionaryManage.conditionsForm.dictionaryTypeStatusSelect
      })
    },
    methods: {
      ...mapActions('dictionaryManage', [
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
