<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm"
  >
    <el-form-item label="编码" prop='inspectLineCode'>
      <el-input
        placeholder="请输入编码"
        size="medium"
        v-model="ruleForm.inspectLineCode"
      />
    </el-form-item>
    <el-form-item label="名称" prop='inspectLineName'>
      <el-input
        placeholder="请输入名称"
        size="medium"
        v-model="ruleForm.inspectLineName"
      />
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
        ruleForm: state => state.inspectLine.conditionsForm.ruleForm
      })
    },
    methods: {
      ...mapActions('inspectLine', [
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
