<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="detailDateVisibleUpdate({state:false, infoId: ''})"
      width="700px"
      :modal-append-to-body='false'
      title="事件详情"
    >
      <section class="dialog-from-content">
        <ul>
          <li class="flex">
            <p class="title">编码：</p>
            <p class="text">{{ ruleForm.eventCode }}</p>
          </li>
          <li class="flex">
            <p class="title">名称：</p>
            <p class="text">{{ ruleForm.eventName }}</p>
          </li>
          <li class="flex">
            <p class="title">类型：</p>
            <p class="text">{{ eventType[ruleForm.eventType] }}</p>
          </li>
          <li class="flex">
            <p class="title">对象：</p>
            <p class="text">{{ ruleForm.eventObjectName }}</p>
          </li>
          <li class="flex">
            <p class="title">所属大系统：</p>
            <p class="text">{{ system[ruleForm.belongSystem] }}</p>
          </li>
          <li class="flex">
            <p class="title">所属子系统：</p>
            <p class="text">{{ subsystem[ruleForm.belongSubsystem] }}</p>
          </li>
          <li class="flex">
            <p class="title">上报时间：</p>
            <p class="text">{{ ruleForm.reportTime }}</p>
          </li>
          <li class="flex">
            <p class="title">事件等级：</p>
            <p class="text">{{ eventLevel[ruleForm.eventLevel] }}</p>
          </li>
          <li class="flex">
            <p class="title">处置状态：</p>
            <p class="text">
              <span v-if='ruleForm.eventStatus==="1"' class="yellow">待处理</span>
              <span v-else-if='ruleForm.eventStatus==="1"' class="green">已处理</span>
              <span v-else-if='ruleForm.eventStatus==="2"'>处理中</span>
            </p>
          </li>
          <li class="flex">
            <p class="title">处置结果：</p>
            <p class="text">
              <span v-if='ruleForm.eventResult==="0"' class="yellow">未完成</span>
              <span v-else-if='ruleForm.eventResult==="1"' class="green">已完成</span>
            </p>
          </li>
          <!-- <li class="executor">
            <p>巡检结果：</p>
            <section>
              <el-table
              :data="ruleForm.inspectEductInfo"
              style="width: 100%"
              >
                <el-table-column type="index" lable=' ' width="55" />
                <el-table-column label="排序" prop='inspectEductSort' width="90" align='center' />
                <el-table-column label="编码" prop='inspectEductCode' align='center' />
                <el-table-column label="巡检对象" prop='inspectObjectName' align='center' />
                <el-table-column label="巡检项" prop='inspectItemContent' align='center' />
              </el-table>
            </section>
          </li> -->
        </ul>
      </section>
      <section class="dialog-footer">
        <el-button type="primary" @click="detailDateVisibleUpdate({state:false, infoId: ''})">确定</el-button>
      </section>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        visible: state => state.laboratoryEmergencyManage.detailDate.visible,
        ruleForm: state => state.laboratoryEmergencyManage.detailDate.ruleForm,
        system: state => state.laboratoryEmergencyManage.system,
        subsystem: state => state.laboratoryEmergencyManage.subsystem,
        eventType: state => state.laboratoryEmergencyManage.eventType,
        eventLevel: state => state.laboratoryEmergencyManage.eventLevel,
        eventStatus: state => state.laboratoryEmergencyManage.eventStatus,
        eventResult: state => state.laboratoryEmergencyManage.eventResult
      })
    },
    methods: {
      ...mapActions('laboratoryEmergencyManage', [
        'detailDateVisibleUpdate'
      ])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content {
    ul {
      li {
        padding: 13px 0;

        .title {
          line-height: 24px;
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }

        .text {
          line-height: 24px;
        }
      }

      .executor {
        padding-top: 10px;

        p {
          padding-bottom: 4px;
        }
      }
    }
  }
</style>
