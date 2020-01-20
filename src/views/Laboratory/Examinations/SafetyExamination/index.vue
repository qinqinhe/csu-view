<template>
  <question-category v-if='questionCatgoryStatus'/>
  <div class="h100 body-main flex" v-else>
    <Breadcrumb/>
    <section class="learn-main flex">
      <question-detail/>
      <question-list/>
      <examination-result/>
    </section>
  </div>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'
  import QuestionDetail from './components/QuestionDetail'
  import QuestionList from './components/QuestionList'
  import QuestionCategory from './components/QuestionCategory'
  import ExaminationResult from './components/ExaminationResult'

  export default {
    components: {
      QuestionDetail,
      QuestionList,
      QuestionCategory,
      ExaminationResult
    },
    data () {
      return {}
    },
    mounted () {
      this.timeSet('start')
    },
    computed: {
      ...mapState({
        questionCatgoryStatus: state => state.laboratorySafetyExamination.questionCatgoryStatus
      })
    },
    methods: {
      ...mapMutations('laboratorySafetyExamination', [
        'timeSet'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .body-main {
    flex-direction: column;
    padding-left: 20px;

    .learn-main {
      flex: 1;
    }
  }
</style>
