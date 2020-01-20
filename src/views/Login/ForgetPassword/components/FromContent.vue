<template>
  <section class="content">
    <el-form
      ref="ruleForm"
      label-width="120px"
      :model="ruleForm"
      :rules="rules">
      <el-form-item label="安全码" prop='securityCode' class="ForgetPassword">
        <section class="input flex">
          <el-input
            size="medium"
            :value='securityCodeArray[index]'
            class="input-security"
            v-for='(item, index) in 6'
            :key='index'
          />
          <el-input
            size="medium"
            type='number'
            :value='ruleForm.securityCode'
            class="input-security-hidden"
            @click='securityCode()'
            @input="securityCodeChange"
            @focus="securitystatusUpdate(true)"
            @blur="securitystatusUpdate(false)"
            maxLength='6'
          />
          <!--  v-if='securityCodeArray.length < 6' -->
          <p class="input-security-line" v-if='securitystatus' :style="{left: (ruleForm.securityCode.length < 6 ? ruleForm.securityCode.length * 48 : 5 * 48 + 10) + 'px'}"></p>
        </section>
        <!-- <section class="input flex">
          <el-input
            size="medium"
            v-model="securityCodeArray[index]"
            v-for='(item, index) in securityCodeArray'
            :key='index'
            class="input-security"
          />
        </section> -->
        <p class="prompt">请输入6位数安全码</p>
      </el-form-item>
      <el-form-item label="新密码" prop='password' class="ForgetPassword">
        <el-input
          placeholder="请输入新密码"
          size="medium"
          v-model='ruleForm.password'
          type='password'
        />
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
      </el-form-item>
      <el-form-item label="确认新密码" prop='passwordEnter' class="ForgetPassword">
        <el-input
          placeholder="请确认新密码"
          size="medium"
          v-model='ruleForm.passwordEnter'
          type='password'
        />
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
      </el-form-item>
      <section class="ForgetPassword-submit">
        <el-button
          class="btn-query"
          size="mini"
          @click='submit()'
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
    ruleForm: () => action.state.conditionsForm.ruleForm,
    securitystatus: () => action.state.securitystatus
  }
  const getter = {
    securityCodeArray: () => action.getters.securityCodeArray,
    rules: () => action.getters.rules
  }
  const mapAction = {
    submit: store.submit,
    securityCodeChange: store.securityCodeChange,
    securitystatusUpdate: store.securitystatusUpdate
  }
  export default {
    data () {
      return {}
    },
    methods: {
      ...mapAction,
      // securityChange (val) {
      //   this.ruleForm.securityCode =  val.length > 6 ? val.slice(0,6): val
      // }
    },
    computed: {
      ...state,
      ...getter
    },
    watch: {
      // 'ruleForm.securityCode': function (val) {
        // console.log(val)
        // return val.length > 6 ? val.slice(0,6): val
      // }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .content {
    width: 650px;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 32px;
    padding-bottom: 30px;
  }

  .el-input.input-security {
    width: 40px;
    text-align: center;
    position: relative;
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
  .input-security-line{
    width: 1px;
    height: 16px;
    background-color: #777;
    position: absolute;
    top: 11px;
    margin-left: 18px;
    animation: aniLine .7s infinite alternate;
  }
  @keyframes aniLine {
    0%,50%{
      opacity: 1;
    }
    51%,100%{
      opacity: 0;
    }
  }
  .prompt {
    height: 15px;
    font-size: 14px;
    color: #909090;
    margin-left: 30px;
  }
  .ForgetPassword-submit {
    text-align: center;
    width: 100%;
    button {
      width: 280px;
    }
  }
</style>
