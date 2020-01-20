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
    <el-table-column prop="laboratoryName" label='名称' align='center' width='150'/>
    <el-table-column prop='address' label="位置" align='center' width='180' />
    <el-table-column prop="applyTime" label="申请时间" align='center'/>
    <el-table-column label="使用时间段" align='center'>
      <template slot-scope="scope">
        <span>{{ scope.row.startTime }} - {{ scope.row.endTime }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="applyUserName" label='预约人' align='center'/>
    <el-table-column label="审核状态" align='center' width='90'>
      <template slot-scope="scope">
        <span v-if='scope.row.auditStatus === "0"'>未审核</span>
        <span class="green" v-else-if='scope.row.auditStatus === "1"'>已通过</span>
        <span class="red" v-else>拒绝</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          v-if='scope.row.auditStatus === "0"'
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.reserveInfoId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          v-else
          size="mini"
          @click='detailDateVisibleOpen({state: true, infoId: scope.row.reserveInfoId})'
          type='success'
        >查看
        </el-button>
        <el-button
          v-if='scope.row.auditStatus === "0"'
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.reserveInfoId)"
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
    computed: {
      ...mapState({
        tableData: state => state.laboratoryReserveRecord.tableData
      })
    },
    methods: {
      ...mapActions('laboratoryReserveRecord', [
        'inquiry',
        'handleSelectionChange',
        'editDateVisibleOpen',
        'detailDateVisibleOpen',
        'delDateOperation'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
