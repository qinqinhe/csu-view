<template>
  <el-table
    :data="tableData"
    height='100%'
    border
    tooltip-effect="dark"
    @selection-change='handleSelectionChange'
  >
    <!-- <el-table-column type="selection" width="55" align='center'/> -->
    <el-table-column type='index' label="序号" width='60' align='center'/>
    <el-table-column prop="eventName" label='名称' align='center'/>
    <el-table-column prop="eventObjectName" label="发生地点" align='center'/>
    <!-- <el-table-column prop="eventObjectName" label="状态" align='center' /> -->
    <el-table-column prop="reportTime" label="发生时间" align='center'/>
    <!-- <el-table-column prop="eventObjectName" label="状态" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.eventStatus==="0"' class="yellow">待处理</span>
        <span v-else-if='scope.row.eventStatus==="1"' class="green">已处理</span>
        <span v-else-if='scope.row.eventStatus==="2"'>处理中</span>
      </template>
    </el-table-column>
    <el-table-column prop="eventObjectName" label="结果" align='center'>
      <template slot-scope="scope">
        <span v-if='scope.row.eventResult==="0"' class="red">未完成</span>
        <span v-else-if='scope.row.eventResult==="1"' class="green">已完成</span>
      </template>
    </el-table-column> -->
    <!-- <el-table-column label="操作" align='center' width='180' >
      <template slot-scope="scope">
        <el-button
          v-if='scope.row.eventResult==="0"'
          size="mini"
          @click='editDateVisibleOpen({state: true, infoId: scope.row.laboratoryEmergencyManageId})'
          type='primary'
        >编辑</el-button>
        <el-button
          v-else
          size="mini"
          @click='detailDateVisibleUpdate({state: true, infoId: scope.row.laboratoryEmergencyManageId})'
          type='success'
        >详情</el-button>
        <el-button
          v-if='scope.row.eventResult==="0"'
          size="mini"
          @click='handleDateVisibleUpdate({state: true, infoId: scope.row.laboratoryEmergencyManageId, eventType: scope.row.eventType})'
          type='warning'
        >处置</el-button>
      </template>
    </el-table-column> -->
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
        tableData: state => state.laboratoryEmergencyManage.tableData
      })
    },
    methods: {
      ...mapActions('laboratoryEmergencyManage', [
        'handleSelectionChange',
        'editDateVisibleOpen',
        'detailDateVisibleUpdate',
        'handleDateVisibleUpdate'
      ]),
      conditionsRuleFormReset (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
/n
