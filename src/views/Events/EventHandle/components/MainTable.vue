<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
  >
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="eventHandleCode" label="编码" align='center'/>
    <el-table-column prop="eventName" label='名称' align='center'/>
    <el-table-column prop="designatorName" label='指派人' align='center'/>
    <el-table-column prop="eventObjectName" label="状态" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.handleResult==="0"' class="red">无法处理</span>
        <span v-else-if='scope.row.handleResult==="1"' class="gray">误报</span>
        <span v-else-if='scope.row.handleResult==="2"' class="yellow">需维修</span>
        <span v-else-if='scope.row.handleResult==="3"' class="red">警情</span>
        <span v-else>未处置</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click='editDateVisibleUpdate({state: true, infoId: scope.row.eventHandleId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          v-if='scope.row.handleResult==="2"'
          size="mini"
          @click='maintainDateVisibleUpdate({state: true, infoId: scope.row.eventHandleId})'
          type='warning'
        >维修
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        tableData: state => state.eventHandle.tableData
      })
    },
    methods: {
      ...mapActions('eventHandle', [
        'editDateVisibleUpdate',
        'maintainDateVisibleUpdate'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

