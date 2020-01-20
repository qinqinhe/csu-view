<template>
  <question-category v-if='questionCatgoryStatus'/>
  <div class="h100 body-main flex" v-else>
    <Breadcrumb/>
    <section class="learn-main flex">
      <question-detail/>
      <question-list/>
    </section>
  </div>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import QuestionDetail from './components/QuestionDetail'
  import QuestionList from './components/QuestionList'
  import QuestionCategory from './components/QuestionCategory'

  export default {
    components: {
      QuestionDetail,
      QuestionList,
      QuestionCategory
    },
    data () {
      return {}
    },
    async mounted () {
      await this.questionCatgorySet()
    },
    computed: {
      ...mapState({
        questionCatgoryStatus: state => state.laboratoryLearn.questionCatgoryStatus
      })
    },
    methods: {
      ...mapActions('laboratoryLearn', [
        'questionCatgorySet'
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
