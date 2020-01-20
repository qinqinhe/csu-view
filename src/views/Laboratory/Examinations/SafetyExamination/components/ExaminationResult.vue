<template>
  <section>
    <el-dialog
      class="modal-dialog"
      :visible="examinationResultVisible"
      @close="examinationResultVisibleUpdate"
      width="660px"
      :modal-append-to-body='false'
      title="考试结果"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content border-none">
          <el-form-item label="总分：">
            <el-input size="medium" readonly :value='`${examinationResult.totalScore}分`'/>
          </el-form-item>
          <el-form-item label="试题总数：">
            <el-input size="medium" readonly :value='`${examinationResult.questionsTotal}题`'/>
          </el-form-item>
          <el-form-item label="合格分数：">
            <el-input size="medium" readonly :value='`${examinationResult.qualifiedScore}分`'/>
          </el-form-item>
          <el-form-item label="考试得分：">
            <el-button>{{ examinationResult.examinationScore }}分</el-button>
            <el-button v-if='examinationResult.qualified' class='green'>合格</el-button>
            <el-button v-else class='red'>不合格</el-button>
          </el-form-item>
          <el-form-item label="正确：">
            <el-input size="medium" readonly :value='`${examinationResult.correctNum}题`'/>
          </el-form-item>
          <el-form-item label="错误：">
            <el-input size="medium" readonly :value='`${examinationResult.wrongNum}题`'/>
          </el-form-item>
          <el-form-item label="得分率：">
            <el-progress
              type="dashboard"
              class="el-progress-modules"
              :percentage="examinationResult.scoringRate"
              color="#67c23a" :stroke-width="10"
            />
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" size="medium" @click="examinationResultVisibleUpdate">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapActions, mapState, mapMutations } from 'vuex'
  import { MessageBox } from 'element-ui'

  export default {
    data () {
      return {
        centerDialogVisible: false,
        ruleForm: {},
        rules: {}
      }
    },
    mounted () {
    },
    computed: {
      ...mapState({
        examinationResult: state => state.laboratorySafetyExamination.examinationResult,
        examinationResultVisible: state => state.laboratorySafetyExamination.examinationResultVisible
      })
    },
    methods: {
      ...mapActions('laboratorySafetyExamination', [
        'examinationResultVisibleUpdate'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-progress-modules {
    margin: 30px 0 0 80px;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
