<template>
  <section class="question flex">
    <section class="question-detail">
      <p class="question-detail-title">{{ questionCurrent.sort }}、 {{questionCurrent.examinationQuestion}}</p>
      <ul>
        <li
          v-for='(item, index) in questionCurrent.question'
          :key='index'
          class='flex'
          :class="{
							blue: questionCurrent.answered ?
								item.sort === questionCurrent.correctAnswer.toUpperCase():
								item.sort === questionCurrent.Answer,
							red: questionCurrent.answered &&
								item.sort === questionCurrent.Answer &&
								questionCurrent.Answer !== questionCurrent.correctAnswer.toUpperCase()
						}"
          @click='()=>!questionCurrent.answered && questionChoose(item.sort)'>
          <div class="question-detail-choose flex">
            <i class="el-icon-success" v-if='questionCurrent.answered ?
								item.sort === questionCurrent.correctAnswer.toUpperCase():
								item.sort === questionCurrent.Answer'/>
            <i class="el-icon-error" v-else-if='questionCurrent.answered &&
								item.sort === questionCurrent.Answer &&
								questionCurrent.Answer !== questionCurrent.correctAnswer.toUpperCase()'/>
            <p class="choose" v-else></p>
          </div>
          <p>{{ item.sort }} &nbsp; {{ item.text }}</p>
        </li>
      </ul>
    </section>
    <section class="submit" v-if='!questionCurrent.answered && questionCurrent.learnRecordStatus==="0"'>
      <el-button
        type="primary"
        size='mini'
        @click='addLearnRecord(questionCurrent.questionBankInfoId)'
      >确定
      </el-button>
    </section>
    <p class="answer" v-if='questionCurrent.answered || questionCurrent.learnRecordStatus==="1"'>
      答案：<span>选项{{ questionCurrent.correctAnswer.toUpperCase() }} </span>
    </p>
    <article class="analysis flex" v-if='questionCurrent.answered || questionCurrent.learnRecordStatus==="1"'>
      <p class="analysis-title">答案解析:</p>
      <section class="analysis-text">
        <p>{{ questionCurrent.questionAnalysis }}</p>
      </section>
    </article>
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {}
    },
    async mounted () {

    },
    computed: {
      ...mapState({
        questionCurrent: state => state.laboratoryLearn.questionCurrent
      })
    },
    methods: {
      ...mapActions('laboratoryLearn', [
        'questionChoose',
        'addLearnRecord'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .question {
    flex: 1;
    background: #fff;
    border-radius: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 20px;
    flex-direction: column;

    .question-detail {
      .question-detail-title {
        color: #333;
        padding-top: 13px;
      }

      ul {
        color: #515a6e;

        li {
          margin-top: 30px;
          min-height: 30px;

          .question-detail-choose {
            width: 16px;
            margin-right: 25px;

            .el-icon-error, .el-icon-success {
              font-size: 18px;
              transform: translate(-2px, -2px);
            }

            .choose {
              width: 14px;
              height: 14px;
              border: solid 1px #dcdee2;
              border-radius: 50%;
            }
          }

          p {
            word-break: break-all;
          }
        }
      }
    }

    .submit {
      text-align: center;
      margin-top: 30px;
    }

    .answer {
      color: #333;
      margin-top: 30px;
      font: 18px;
      
      span {
        color: #666;
      }
    }

    .analysis {
      flex: 1;
      flex-direction: column;
      margin-top: 30px;

      .analysis-title {
        color: #333;
      }

      .analysis-text {
        word-break: break-all;
        margin-top: 14px;
        flex: 1;
        background-color: #f2f2f2;
        border: solid 20px transparent;
        color: #515a6e;
        text-indent: 2em;
        overflow-x: hidden;
        overflow-y: auto;
        border-radius: 10px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>
