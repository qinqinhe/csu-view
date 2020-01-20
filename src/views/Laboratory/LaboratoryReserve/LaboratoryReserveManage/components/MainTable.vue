<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
    @selection-change='handleSelectionChange'
  >
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="laboratoryName" label='名称' align='center'/>
    <el-table-column label="类型" align='center' prop="laboratoryType"/>
    <el-table-column prop="capacityNum" label="容纳人数" align='center'/>
    <el-table-column prop="reserveNum" label="已预约人数" align='center'/>
    <el-table-column label="操作" align='center' width='180'>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click='editDateVisibleOpen({
            state: true,
            infoId: scope.row.laboratoryInfoId,
            infoName: scope.row.laboratoryName,
            laboratoryType: scope.row.laboratoryType,
            laboratoryTypeId: scope.row.laboratoryTypeId
          })'
          type='primary'
        >预约
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
        tableData: state => state.laboratoryReserveManage.tableData,
        laboratoryType: state => state.laboratoryReserveManage.laboratoryType
      })
    },
    methods: {
      ...mapActions('laboratoryReserveManage', [
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

<style lang="scss" rel="stylesheet/scss" scoped>
  

</style>
