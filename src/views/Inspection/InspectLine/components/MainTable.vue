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
    <el-table-column prop="inspectLineCode" label="编码" align='center' width='200'/>
    <el-table-column prop="inspectLineName" label='名称' align='center'/>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.inspectLineInfoId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.inspectLineInfoId)"
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
        tableData: state => state.inspectLine.tableData
      })
    },
    methods: {
      ...mapActions('inspectLine', [
        'handleSelectionChange',
        'editDateVisibleOpen',
        'delDateOperation'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
