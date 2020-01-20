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
    <el-table-column prop="inspectObjectSort" label="排序" align='center'/>
    <el-table-column prop="inspectObjectCode" label="编码" align='center'/>
    <el-table-column prop="inspectObjectName" label='名称' align='center'/>
    <el-table-column label='类型' align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.inspectObjectType==="1"'>房间</span>
        <span v-else-if='scope.row.inspectObjectType==="2"'>设备</span>
      </template>
    </el-table-column>
    <el-table-column label='类别' align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.inspectObjectBelong==="1"'>消防</span>
        <span v-else-if='scope.row.inspectObjectBelong==="2"'>安防</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.inspectObjectInfoId})'
          type='primary'
        >编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delDateOperation(scope.row.inspectObjectInfoId)"
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
        tableData: state => state.inspectObject.tableData
      })
    },
    methods: {
      ...mapActions('inspectObject', [
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
