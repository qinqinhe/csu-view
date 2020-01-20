<template>
  <el-table
    :data="tableData"
    height="100%"
    border
    tooltip-effect="dark"
  >
    <el-table-column type="index" align="center" label="排序" width="60"/>
    <el-table-column prop="" align='center' label="巡航名称"/>
    <el-table-column prop="" align='center' label="开始时间"/>
    <el-table-column prop="" align='center' label="结束时间"/>
    <el-table-column prop="" align='center' label="状态"/>
    <el-table-column label="操作" align="center" width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click='detail'>操作</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import action from '../action'
  import store from '../store'

  const state = {
    tableData: () => action.state.tableData,
    laboratoryType: () => action.state.laboratoryType
  }
  const mapAction = {
    inquiry: store.inquiry,
    detail: store.detail
  }
  export default {
    data () {
      return {}
    },
    components: {},
    computed: {
      ...state
    },
    methods: {
      ...mapAction,
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
