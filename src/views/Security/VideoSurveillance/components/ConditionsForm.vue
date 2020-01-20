<template>
  <el-form
    ref="ruleForm"
    label-width="95px" 
    :model="ruleForm" >
    <el-form-item label="编码" prop='inspectItemCode'>
      <el-input
        placeholder="请输入编码"
        size="medium"
        v-model="ruleForm.inspectItemCode"/>
    </el-form-item>
    <el-form-item label="状态" prop='inspectItemStatusSelect'>
      <el-select
        v-model="ruleForm.inspectItemStatus"
        size="medium"
        clearable
        placeholder="请选择状态">
        <el-option
          v-for="item in inspectItemStatusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="flex" label-width="0">
      <el-button
        class="btn-query"
        size="mini"
        @click='inquiry()'
      >查询</el-button>						
      <el-button class="btn-reset" size="mini"  @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <p class="both"/>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {

  },
  computed: {
    ...mapState({
      ruleForm: state => state.inspectItem.conditionsForm.ruleForm,
      inspectItemStatusSelect: state => state.inspectItem.conditionsForm.inspectItemStatusSelect
    })
  },
  methods: {
    ...mapActions('inspectItem', [
      'conditionsRuleFormDictionaryTypeNameUpdate',
      'conditionsRuleFormDictionaryTypeStatusUpdate',
      'inquiry'
    ]),
    resetForm (formName) {
      this.$refs[formName].resetFields();
      this.inquiry()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>


</style>