<template>
  <section class="content">
    <el-form
      ref="ruleForm"
      label-width="120px"
      :model="ruleForm"
      :rules="rules">
      <el-form-item label="旧密码" prop='userPwd' class="ForgetPassword">
        <el-input
          placeholder="请输入旧密码"
          size="medium"
          v-model='ruleForm.userPwd'
          :type='ruleForm.userPwdVisible ? "text" : "password"'
          maxLength='15'
        />
        <div class="input-icon">
          <i
            class="iconfont icon-jianguanzhengyan"
            v-if='ruleForm.userPwdVisible'
            @click='userPwdVisibleUpdate(false)'
          />
          <i
            class="iconfont icon-biyan"
            v-else @click='userPwdVisibleUpdate(true)'
          />
        </div>
      </el-form-item>
      <el-form-item label="新密码" prop='password' class="ForgetPassword">
        <el-input
          placeholder="请输入新密码"
          size="medium"
          v-model='ruleForm.password'
          :type='ruleForm.passwordVisible ? "text" : "password"'
          maxLength='15'
        />
        <div class="input-icon">
          <i
            class="iconfont icon-jianguanzhengyan"
            v-if='ruleForm.passwordVisible'
            @click='passwordVisibleUpdate(false)'
          />
          <i
            class="iconfont icon-biyan"
            v-else
            @click='passwordVisibleUpdate(true)'
          />
        </div>
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
      </el-form-item>
      <el-form-item label="确认新密码" prop='passwordEnter' class="ForgetPassword">
        <el-input
          placeholder="请确认新密码"
          size="medium"
          v-model='ruleForm.passwordEnter'
          :type='ruleForm.passwordEnterVisible ? "text" : "password"'
          maxLength='15'
        />
        <div class="input-icon">
          <i
            class="iconfont icon-jianguanzhengyan"
            v-if='ruleForm.passwordEnterVisible'
            @click='passwordEnterVisibleUpdate(false)'
          />
          <i
            class="iconfont icon-biyan"
            v-else
            @click='passwordEnterVisibleUpdate(true)'
          />
        </div>
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
      </el-form-item>
      <section class="ForgetPassword-submit">
        <el-button
          class="btn-query"
          size="medium"
          @click='submitForm("ruleForm")'
        >确认
        </el-button>
      </section>
      <p class="both"/>
    </el-form>
  </section>
</template>

<script>
  import { code, local } from '@/config/wildcard'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import action from '../action'
  import store from '../store'

  const state = {
    ruleForm: () => action.state.conditionsForm.ruleForm
  }
  const getter = {
    
    rules: () => action.getters.rules
  }
  const mapAction = {
    submit: store.submit,
    userPwdVisibleUpdate: store.userPwdVisibleUpdate,
    passwordVisibleUpdate: store.passwordVisibleUpdate,
    passwordEnterVisibleUpdate: store.passwordEnterVisibleUpdate
  }
  export default {
    components: {},
    data () {
      return {}
    },
    components: {
      
    },
    methods: {
      ...mapAction,
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit()
            
          } else {
            
            return false
          }
        })
      }
    },
    computed: {
      ...state,
      ...getter
    },
    mounted () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .content {
    width: 690px;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 32px;
    padding-bottom: 30px;
  }

  .el-input.input-security {
    width: 40px;
    text-align: center;
  }

  .el-input {
    width: 280px;
  }

  .input {
    width: 280px;
    justify-content: space-between;
    position: relative;
  }

  .input-security-hidden {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .prompt {
    
    height: 15px;
    font-size: 14px;
    color: #909090;
    
  }

  .ForgetPassword-submit {
    text-align: center;
    margin-top: 60px;
    width: 100%;
    button {
      width: 280px;
    }
  }

  .iconfont {
    font-size: 16px;
  }

  .input-icon {
    width: 36px;
    height: 36px;
    transform: translateX(-36px);
    text-align: center;
    line-height: 36px;
  }
</style>
