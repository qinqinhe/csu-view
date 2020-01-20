<template>
  <section class="question flex">
    <section class="question-detail">
      <p class="question-detail-title">{{ questionCurrent.sort + 1 }}、 {{questionCurrent.examinationQuestion}}</p>
      <ul>
        <li
          v-for='(item, index) in questionCurrent.question'
          class='flex'
          :class="{blue: item.sort === questionCurrent.examineeAnswer}"
          @click='questionChoose(item.sort)'
          :key='index'
        >
          <div class="question-detail-choose flex">
            <i class="el-icon-success" v-if='item.sort === questionCurrent.examineeAnswer'/>
            <p class="choose" v-else/>
          </div>
          <p>{{ item.sort }} &nbsp; {{ item.text }}</p>
        </li>
      </ul>
    </section>
    <section class="submit">
      <el-button type="info" size='mini' disabled v-if='questionCurrent.sort===0'>上一题</el-button>
      <el-button type="primary" v-else size='mini' @click='questionChange(questionCurrent.sort-1)'>上一题</el-button>
      <el-button type="info" size='mini' disabled v-if='questionCurrent.sort===ExaminationListTotal-1'>下一题</el-button>
      <el-button type="primary" size='mini' v-else @click='questionChange(questionCurrent.sort+1)'>下一题</el-button>
    </section>
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
        questionCurrent: state => state.laboratorySafetyExamination.questionCurrent,
        ExaminationListTotal: state => state.laboratorySafetyExamination.ExaminationListTotal
      })
    },
    methods: {
      ...mapActions('laboratorySafetyExamination', [
        'questionChoose',
        'addLearnRecord',
        'questionChange'
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
  }
</style>
