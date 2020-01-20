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
    <el-table-column prop="inspectItemCode" label="编码" align='center'/>
    <el-table-column prop="inspectItemContent" label='名称' align='center'/>
    <el-table-column label="状态" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.inspectItemStatus==="0"' class="green">启用</span>
        <span v-if='scope.row.inspectItemStatus==="1"' class="red">禁用</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.inspectItemInfoId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.inspectItemInfoId)"
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
      this.inquiry()
    },
    computed: {
      ...mapState({
        tableData: state => state.inspectItem.tableData
      })
    },
    methods: {
      ...mapActions('inspectItem', [
        'inquiry',
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
