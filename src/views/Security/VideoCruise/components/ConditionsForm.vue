<template>
  <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
    <el-form-item label="名称" prop="deviceName">
      <el-input placeholder="名称" size="medium" v-model="ruleForm.deviceName"/>
    </el-form-item>
    <el-form-item label="编码" prop="deviceCode">
      <el-input placeholder="编码" size="medium" v-model="ruleForm.deviceCode"/>
    </el-form-item>
    <el-form-item label="状态" prop="deviceStatus">
      <el-select v-model="ruleForm.deviceStatus" size="medium" clearable placeholder="状态">
        <el-option
          v-for="item in deviceStatusSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="flex" label-width="20px" style='width:auto'>
      <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
      <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <p class="both"/>
  </el-form>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import action from '../action'
  import store from '../store'

  const state = {
    ruleForm: () => action.state.conditionsForm.ruleForm,
    period: () => action.state.conditionsForm.period,
    pickerOptions: () => action.state.pickerOptions,
    deviceStatusSelect: () => action.state.conditionsForm.deviceStatusSelect
  }
  const mapAction = {
    inquiry: store.inquiry
  }
  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {

    },
    computed: {
      ...state
    },
    methods: {
      ...mapAction,
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
