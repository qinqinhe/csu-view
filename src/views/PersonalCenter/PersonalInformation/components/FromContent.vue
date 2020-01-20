<template>
  <section class="content">
    <el-form
      ref="ruleForm"
      label-width="120px" 
      :model="ruleForm"
      :rules="rules">
      <!-- <el-form-item label="安全码" prop='securityCode'>
        <section class="input flex">
          <el-input size="medium" :value='securityCodeArray[index]' class="input-security" v-for='(item, index) in 6' :key='index'/>
          <el-input size="medium" v-model='ruleForm.securityCode' class="input-security-hidden" @click='securityCode()' maxLength='6' />
        </section>
        <p class="prompt">请输入6位数安全码</p>
    </el-form-item> -->
      <el-form-item label="新密码" prop='password' class="BasicInformation">
        <el-input
          placeholder="请输入新密码"
          size="medium"
          v-model='ruleForm.password'
          type='password'
          />
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
    </el-form-item>
      <el-form-item label="确认新密码" prop='passwordEnter'>
        <el-input
          placeholder="请确认新密码"
          size="medium"
          v-model='ruleForm.passwordEnter'
          type='password'
          />
        <p class="prompt">密码6-16位，需要组合数字、字母</p>
    </el-form-item>
      <section class="ForgetPassword-submit" >
        <el-button
          class="btn-query"
          size="mini"
        >确认</el-button>
      </section>
      <p class="both"/>
    </el-form>
  </section>
</template>

<script>
import { code, local } from "@/config/wildcard";
import { mapMutations, mapState, mapGetters } from "vuex";
import action from '../action'
import store from '../store'
const state = {
  ruleForm: () => action.state.conditionsForm.ruleForm
}
const getter = {
  securityCodeArray: () => action.getters.securityCodeArray,
  rules: () => action.getters.rules,
}
const mapAction = {
  
}
export default {
  components: {
  },
  data() {
    return {
     
    };
  },
  components: {
    
  },
  methods: {
    ...mapAction
  },
  computed: {
    ...state,
    ...getter
  },
  mounted () {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.content{
  width: 650px;
  
  margin: 0 auto;
  background-color: #fff;
  padding-top: 32px;
  padding-bottom: 30px;
}
.el-input.input-security{
  width: 40px;
  text-align: center;
}
.el-input {
  width: 280px;
  
}

.input{
  width: 280px;
  justify-content: space-between;
  position: relative;
}
.input-security-hidden{
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.prompt{
	
	height: 15px;
	font-size: 14px;
  color: #909090;
  margin-left: 30px;
}
.ForgetPassword-submit{
  text-align: center;
  button{
    width: 280px;
  }
}
</style>