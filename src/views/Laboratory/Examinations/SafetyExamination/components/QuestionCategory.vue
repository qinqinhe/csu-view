<template>
  <section class='fixed flex'>
    <section class="category flex">
      <p class="category-title">请输入考试密码:</p>
      <section class="category-select">
        <el-input
          :value="examinationHallPwd"
          :type='passwordVisible ? "text" : "password"'
          @input="passwowrdUpdate"
          placeholder="请输入考试密码"
        />
        <img
          class='icon'
          :src='passwordVisible ? require("@/assets/images/eyeText.png") :  require("@/assets/images/eyePassword.png")'
          @click='passwordVisibleUpdate'
          alt=""
        />
      </section>
      <el-button size="medium" @click='ExaminationListset'>确定</el-button>
    </section>
  </section>
</template>

<script>
  import { code, dictionary } from '@/config/wildcard'
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    data () {
      return {}
    },
    computed: {
      ...mapState({
        examinationHallPwd: state => state.laboratorySafetyExamination.examinationHallPwd,
        passwordVisible: state => state.laboratorySafetyExamination.passwordVisible
      })
    },
    methods: {
      ...mapActions('laboratorySafetyExamination', [
        'ExaminationListset',
        'passwowrdUpdate',
        'passwordVisibleUpdate'
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
        width: 240px;
        margin: 0 30px 0 12px;
        position: relative;
        padding-right: 40px;
        
        background-color: #fff;
        border-radius: 4px;

        .icon {
          position: absolute;
          top: 10px;
          right: 8px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
