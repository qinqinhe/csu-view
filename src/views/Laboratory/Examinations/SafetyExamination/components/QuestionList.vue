<template>
  <section class="question flex">
    <div class="question-time">
      <p class="question-time-text" :class='{red: minute15}'>{{ timer }}</p>
    </div>
    <section class="question-list">
      <ul class="flex">
        <li
          v-for='(item, index) in ExaminationList'
          :key='index'
          :class='{questionAnswer: item.answered,questionCheck: questionIndex === index}'
          @click='questionChange(index)'
        >{{ index + 1 }}
        </li>
      </ul>
    </section>
    <footer>
      <el-button type='primary' @click='questionSubmit' v-if='!examinationEnd'>提交</el-button>
    </footer>
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    mounted () {
      this.countdown()
    }
    ,
    computed: {
      ...mapState({
        ExaminationList: state => state.laboratorySafetyExamination.ExaminationList,
        questionIndex: state => state.laboratorySafetyExamination.questionIndex,
        timer: state => state.laboratorySafetyExamination.timer,
        minute15: state => state.laboratorySafetyExamination.minute15,
        examinationEnd: state => state.laboratorySafetyExamination.examinationEnd
      })
    },
    methods: {
      ...mapActions('laboratorySafetyExamination', [
        'questionChange',
        'countdown',
        'questionSubmit'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .question {
    width: 510px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    flex-direction: column;
    margin-bottom: 20px;

    .question-time {
      width: 510px;
      height: 119px;
      border: solid 2px #3f5071;
      margin: 0 auto 20px auto;
      color: #1e2e52;

      .question-time-text {
        line-height: 119px;
        text-align: center;
        font-size: 71px;
      }
    }

    .question-list {
      flex: 1;
      background-color: #f1f2f7;
      overflow-x: hidden;
      overflow-y: auto;

      ul {
        flex-wrap: wrap;
        color: #333;

        li {
          width: 49px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          background-color: #fff;
          border-radius: 2px;
          margin: 1px;
        }

        .questionAnswer {
          background-color: rgba(30, 46, 82, .4);
        }

        .questionCheck {
          background-color: #409eff;
          color: #fff;
        }
      }
    }

    footer {
      height: 40px;
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
