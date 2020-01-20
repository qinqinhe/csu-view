<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
    @selection-change='handleSelectionChange'
  >
    <el-table-column type="selection" width="55" align='center'/>
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="inspectPlanCode" label="编码" align='center'/>
    <el-table-column prop="inspectPlanName" label='名称' align='center'/>
    <el-table-column label="状态" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.inspectPlanStatus==="1"' class="green">启用</span>
        <span v-if='scope.row.inspectPlanStatus==="0"' class="red">禁用</span>
      </template>
    </el-table-column>
    <el-table-column label="是否过期" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.expired' class="red">已过期</span>
        <span v-else class="green">未过期</span>
      </template>
    </el-table-column>
    <el-table-column prop='validPeriod' label="有效至期" align='center' width='170'/>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          v-if='scope.row.expired'
          size="mini"
          @click='detailDateVisibleUpdate({state: true, infoId: scope.row.inspectPlanId})'
          type='warning'
        >详情
        </el-button>
        <el-button
          v-else
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.inspectPlanId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.inspectPlanId)"
        >删除
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
        tableData: state => state.inspectPlan.tableData
      })
    },
    methods: {
      ...mapActions('inspectPlan', [
        'handleSelectionChange',
        'editDateVisibleOpen',
        'delDateOperation',
        'detailDateVisibleUpdate'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
