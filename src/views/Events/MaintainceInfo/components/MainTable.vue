<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
  >
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="maintaincePersonName" label="维修人" align='center'/>
    <el-table-column prop="description" label='描述' align='center'/>
    <el-table-column prop="dictionaryTypeStatus" label="审核结果" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.auditResult==="0"' class='red'>不通过</span>
        <span v-else-if='scope.row.auditResult==="1"' class='green'>通过</span>
        <span v-else-if='scope.row.auditResult==="2"' class='yellow'>待审核</span>
      </template>
    </el-table-column>
    <el-table-column label='审核人' align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.reviewerName'>{{ scope.row.reviewerName }}</span>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          v-if='scope.row.auditResult==="2"'
          size="mini"
          @click='maintainDateVisibleUpdate({state: true, infoId: scope.row.maintainceInfoId})'
          type='warning'
        >审核
        </el-button>
        <el-button
          v-else
          size="mini"
          @click='detailDateVisibleUpdate({state: true, infoId: scope.row.maintainceInfoId})'
          type='primary'
        >详情
        </el-button>
        <el-button
          v-if='scope.row.auditResult==="2"'
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.maintainceInfoId)"
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
        tableData: state => state.maintainceInfo.tableData
      })
    },
    methods: {
      ...mapActions('maintainceInfo', [
        'maintainDateVisibleUpdate',
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
