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
        v-model='ruleForm.meetingRoomName'
      />
    </el-form-item>
    <el-form-item label="日期" prop='date'>
      <el-date-picker
        v-model="ruleForm.date"
        :picker-options='pickerOptions'
        value-format='yyyy-MM-dd'
        format='yyyy-MM-dd'
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="时间" prop='time'>
      <el-select
        v-model='ruleForm.time'
        size="medium"
        placeholder="请选择时间">
        <el-option
          v-for="(item, index) in period"
          :key="index"
          :label="`${item.start}-${item.end}`"
          :value="`${item.start}-${item.end}`"
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
        ruleForm: state => state.meetingRoomReserveManage.conditionsForm.ruleForm,
        period: state => state.meetingRoomReserveManage.conditionsForm.period,
        pickerOptions: state => state.meetingRoomReserveManage.pickerOptions
      })
    },
    methods: {
      ...mapActions('meetingRoomReserveManage', [
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
