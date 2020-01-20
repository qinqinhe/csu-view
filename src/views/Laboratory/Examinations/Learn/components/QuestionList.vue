<template>
  <section class="question flex">
    <!-- <div class="question-time">
      <p class="question-time-text">19:20:30</p>
    </div> -->
    <section class="question-list">
      <ul class="flex">
        <li
          v-for='(item, index) in learnList'
          :key='index'
          :class='{questionAnswer: item.learnRecordStatus === "1" || item.answered, questionCheck: questionIndex === index}'
          @click='questionChange(index)'
        >{{ index + 1 }}
        </li>
      </ul>
    </section>
    <!-- <footer>
      <el-button>提交</el-button>
    </footer> -->
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        learnList: state => state.laboratoryLearn.learnList,
        questionIndex: state => state.laboratoryLearn.questionIndex
      })
    },
    methods: {
      ...mapMutations('laboratoryLearn', [
        'questionChange'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .question {
    width: 470px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    flex-direction: column;
    margin-bottom: 20px;
    
    
    
    
    
    
    
    
    
    
    
    
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
          margin-bottom: 2px;
          border-radius: 2px;
          margin-right: 3px;
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

    
    
    
    
    
  }
</style>
