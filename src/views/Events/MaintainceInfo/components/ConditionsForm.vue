<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm"
  >
    <el-form-item label="审核人" prop='reviewerName'>
      <el-input
        placeholder="请输入审核人"
        size="medium"
        v-model='ruleForm.reviewerName'
      />
    </el-form-item>
    <el-form-item label="维修人" prop='maintaincePersonName'>
      <el-input
        placeholder="请输入维修人"
        size="medium"
        v-model='ruleForm.maintaincePersonName'
      />
    </el-form-item>
    <el-form-item label="审核结果" prop='auditResult'>
      <el-select
        v-model='ruleForm.auditResult'
        size="medium"
        clearable
        placeholder="请选择处置状态">
        <el-option
          v-for="item in auditResultSelect"
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
        ruleForm: state => state.maintainceInfo.conditionsForm.ruleForm,
        auditResultSelect: state => state.maintainceInfo.conditionsForm.auditResultSelect
      })
    },
    methods: {
      ...mapActions('maintainceInfo', [
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
