<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="detailDateVisibleUpdate(false)"
      width="960px"
      :modal-append-to-body='false'
      title="考试详情"
    >
    
      <el-form
        ref="ruleForm"
        label-width="100px"
      >
        <section class="dialog-from-content">
          <ul>
            <li class="flex">
              <p class="title">考试名称：</p>
              <p class="text">{{ ruleForm.examinationName || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">开始时间：</p>
              <p class="text">{{ ruleForm.startTime || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">结束时间：</p>
              <p class="text">{{ ruleForm.endTime || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">科目：</p>
              <p class="text">{{ laboratoryType || '-'}}</p>
            </li>
            <li class="flex">
              <p class="title">状态：</p>
              <p class="text">
                <span class="red" v-if='ruleForm.examinationStatus === "0"'>不可预约</span>
                <span class="green" v-else-if='ruleForm.examinationStatus === "1"'>可预约</span>
              </p>
            </li>
            <li class="flex">
              <p class="title">注意事项：</p>
              <p class="text">{{ ruleForm.examinationPrecautions || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">题目总数：</p>
              <p class="text">{{ ruleForm.questionsTotal || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">总分：</p>
              <p class="text">{{ ruleForm.totalScore || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">及格分数：</p>
              <p class="text">{{ ruleForm.qualifiedScore || '-' }}</p>
            </li>
            <li class="flex">
              <p class="title">备注：</p>
              <p class="text">{{ ruleForm.remarks || '无' }}</p>
            </li>
            <li class="executor">
              <p>考场信息：</p>
              <section>
                <el-table
                  :data="ruleForm.examinationHallInfoList"
                  style="width: 100%"
                >
                  <el-table-column type="index" label="序号" width="60"/>
                  <el-table-column label="考场名称" prop='examinationHallName' width="150" align='center'/>
                  <el-table-column label="位置" prop='examinationHallAddress' width="150" align='center'/>
                  <el-table-column label="监考人" prop='userName' width="100" align='center'/>
                  <el-table-column label="考试密码" prop='examinationHallPwd' align='center'/>
                </el-table>
              </section>
            </li>
          </ul>
        </section>
      </el-form>
      <footer class="dialog-footer">
        <el-button @click="detailDateVisibleUpdate(false)">关闭</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {
      visible: {
        type: Boolean
      },
      infoId: {
        type: String
      },
      laboratoryType: {
        type: String
      }
    },
    data () {
      return {
        ruleForm: {}
      }
    },
    components: {},
    mounted () {
    },
    computed: {},
    methods: {
      detailDateVisibleUpdate (state) {
        this.$emit('update:visible', state)
      },
      detail () {
        this.webapi({
          url: '/examination/api/examinationInfo/queryExamDetail',
          data: {
            examinationInfoId: this.infoId
          }
        }).then(res => {
            const { resultCode, data } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.ruleForm = data
            }
          })
      }
    },
    watch: {
      'visible': function (val) {
        val && this.detail()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content {
    ul {
      li {
        line-height: 50px;

        .title {
          width: 80px;
          text-align: right;
          margin-right: 20px;
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
