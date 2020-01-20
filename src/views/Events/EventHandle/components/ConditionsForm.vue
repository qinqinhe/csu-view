<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm">
    <el-form-item label="名称" prop='eventName'>
      <el-input
        placeholder="请输入名称"
        size="medium"
        v-model="ruleForm.eventName"
      />
    </el-form-item>
    <el-form-item label="结果" prop='handleResult'>
      <el-select
        v-model="ruleForm.handleResult"
        size="medium"
        clearable
        placeholder="请选择结果">
        <el-option
          v-for="item in handleResultSelect"
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
    mounted () {},
    computed: {
      ...mapState({
        ruleForm: state => state.eventHandle.conditionsForm.ruleForm,
        handleResultSelect: state => state.eventHandle.conditionsForm.handleResultSelect
      })
    },
    methods: {
      ...mapActions('eventHandle', [
        'inquiry'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.inquiry()
      }
    }
  }
</script>
