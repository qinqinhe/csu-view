<template>
  <section class='fixed flex'>
    <section class="category flex">
      <p class="category-title">请选择学习科目:</p>
      <section class="category-select">
        <el-select v-model="category" placeholder="请选择学习科目">
          <el-option
            v-for="item in questionCatgory"
            :key="item.dictionaryDataInfoId"
            :label="item.dictionaryValue"
            :value="item.dictionaryDataInfoId">
          </el-option>
        </el-select>
      </section>
      <el-button size="medium" @click='learnListset(category)'>确定</el-button>
    </section>
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        category: ''
      }
    },
    computed: {
      ...mapState({
        questionCatgory: state => state.laboratoryLearn.questionCatgory
      })
    },
    methods: {
      ...mapActions('laboratoryLearn', [
        'learnListset'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .fixed {
    position: fixed;
    top: 76px;
    left: 200px;
    right: 0;
    bottom: 0;
    background-color: #1e2e52;
    justify-content: center;

    .category {
      align-items: center;

      .category-title {
        color: #fff;
      }

      .category-select {
        margin: 0 30px 0 12px;
      }
    }
  }
</style>
