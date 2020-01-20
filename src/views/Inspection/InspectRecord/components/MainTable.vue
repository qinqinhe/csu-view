<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
  >
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="inspectRecordCode" label="编码" align='center' width='180'/>
    <el-table-column prop="inspectPlanName" label='名称' align='center'/>
    <el-table-column prop="planExecutorUserName" label="完成情况" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.inspectRecordStatus==="0"' class="red">未完成</span>
        <span v-else-if='scope.row.inspectRecordStatus==="1"' class="green">已完成</span>
      </template>
    </el-table-column>
    <el-table-column prop="planExecutorUserName" label="执行人" align='center'/>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          v-if='scope.row.inspectRecordStatus==="0"'
          size="mini"
          type="danger"
          @click="carryOutOperation(scope.row.inspectRecordInfoId)"
        >完成
        </el-button>
        <el-button
          size="mini"
          type='primary'
          @click="detailDateVisibleUpdate({state: true,infoId:scope.row.inspectRecordInfoId})"
        >详情
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
      this.inquiry()
    },
    computed: {
      ...mapState({
        tableData: state => state.inspectRecord.tableData
      })
    },
    methods: {
      ...mapActions('inspectRecord', [
        'inquiry',
        'carryOutOperation',
        'detailDateVisibleUpdate'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
