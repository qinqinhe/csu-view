<template>
  <div class="modal-dialog">
    <el-dialog class="dialog-model"
               :visible="visible"
               @close="detailDateVisibleUpdate({state: false,infoId:''})"
               width="700px"
               :modal-append-to-body='false'
               title="巡检计划详情"
    >
      <section class="dialog-from-content">
        <ul>
          <li class="flex">
            <p class="title">编码：</p>
            <p class="text">{{ ruleForm.inspectPlanCode }}</p>
          </li>
          <li class="flex">
            <p class="title">名称：</p>
            <p class="text">{{ ruleForm.inspectPlanName }}</p>
          </li>
          <li class="flex">
            <p class="title">排序：</p>
            <p class="text">{{ ruleForm.inspectItemSort }}</p>
          </li>
          <li class="flex">
            <p class="title">状态：</p>
            <p class="text">
              <span v-if='ruleForm.inspectPlanStatus==="1"' class="green">启用</span>
              <span v-if='ruleForm.inspectPlanStatus==="0"' class="red">禁用</span>
            </p>
          </li>
          <li class="flex">
            <p class="title">巡检路线：</p>
            <p class="text">{{ ruleForm.inspectLineInfoId }}</p>
          </li>
          <li class="flex">
            <p class="title">执行时间：</p>
            <p class="text">
              {{ ruleForm.inspectPlanExecuteStartTime }} - {{ ruleForm.inspectPlanExecuteEndTime }}
            </p>
          </li>
          <li class="flex">
            <p class="title">有效至期：</p>
            <p class="text">{{ ruleForm.validPeriod }}</p>
          </li>
          <li class="flex">
            <p class="title">巡检周期：</p>
            <p class="text">{{ ruleForm.inspectPeriod }} 天</p>
          </li>
          <li class="flex">
            <p class="title">备注：</p>
            <p class="text">{{ ruleForm.remarks }}</p>
          </li>
          <li class="executor">
            <p>巡检人：</p>
            <section>
              <el-table
                :data="ruleForm.inspectPlanExecutorAddVo"
                style="width: 100%"
              >
                <el-table-column type="index" lable=' ' width="55"/>
                <el-table-column label="排序" prop='planExecutorSort' width="90" align='center'/>
                <el-table-column label="编码" prop='inspectPlanExecutorCode' align='center'/>
                <el-table-column label="巡检人" prop='planExecutorUserName' align='center'/>
              </el-table>
            </section>
          </li>
        </ul>
      </section>
      <section class="dialog-footer">
        <el-button type="primary" @click="detailDateVisibleUpdate({state: false,infoId:''})">确定</el-button>
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
        visible: state => state.inspectPlan.detailDate.visible,
        ruleForm: state => state.inspectPlan.detailDate.ruleForm
      })
    },
    methods: {
      ...mapActions('inspectPlan', [
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
