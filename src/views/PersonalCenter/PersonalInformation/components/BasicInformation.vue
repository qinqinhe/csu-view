<template>
  <div class="basic">    
      <personal-title/>
      <main>
        <el-form
          ref="ruleForm"
          label-width="200px" 
          :model="ruleForm"
          :rules="rules"
          >
          <el-form-item label="姓名" prop='password' class="BasicInformation">
            <el-input placeholder="请输入姓名" size="medium" v-model='basicInformation.userName' />
          </el-form-item>
          <!-- <el-form-item label="职务" prop='passwordEnter' class="BasicInformation">
            <el-input
              placeholder="请输入职务"
              size="medium"
              v-model='basicInformation.job'
              type='password'
              />
        </el-form-item> -->
        <el-form-item label="性别" prop='passwordEnter' class="BasicInformation">
          <el-radio v-model="basicInformation.userSex" label="0">女</el-radio>
          <el-radio v-model="basicInformation.userSex" label="1">男</el-radio>
        </el-form-item>
        <el-form-item label="联系方式" prop='passwordEnter' class="BasicInformation">
          <el-input
            placeholder="请输入联系方式"
            size="medium"
            v-model='basicInformation.phoneNumber'
            />
        </el-form-item>
        <el-form-item label="证件号码" prop='identificationNumber' class="BasicInformation">
            <el-input
              placeholder="请输入证件号码"
              size="medium"
              v-model='basicInformation.identificationNumber'
              />
        </el-form-item>
        <el-form-item label="生日" prop='passwordEnter' class="BasicInformation">
            <el-input
              placeholder="请输入出生日期"
              size="medium"
              v-model='basicInformation.userBirthday'
              />
        </el-form-item>
          <section class="submit-input" >
            <el-button
              class="btn-query"
              size="mini"
              @click='submit()'
            >保存</el-button>
          </section>
          <p class="both"/>
        </el-form>
      </main>
  </div>
</template>

<script>
import { code, local } from "@/config/wildcard";
import { mapMutations, mapState, mapGetters } from "vuex";
import action from '../action'
import store from '../store'
import PersonalTitle from './PersonalTitle'
const state = {
  ruleForm: () => action.state.conditionsForm.ruleForm,
  basicInformation: () => action.state.basicInformation
}
const getter = {
  securityCodeArray: () => action.getters.securityCodeArray,
  rules: () => action.getters.rules,
}
const mapAction = {
  
}
export default {
  components: {
    PersonalTitle,
  },
  data() {
    return {
     
    };
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
.basic{
  main{
    padding: 30px 0;
  }
}
.submit-input{
  width: 100%;
  text-align: center;
}
.BasicInformation{
  width: 100%;
}
</style>