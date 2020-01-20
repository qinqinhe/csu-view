<template>
  <el-form
    ref="ruleForm"
    label-width="95px"
    :model="ruleForm">
    <el-form-item label="编码" prop='inspectObjectCode'>
      <el-input
        placeholder="请输入编码"
        size="medium"
        v-model="ruleForm.inspectObjectCode"
      />
    </el-form-item>
    <el-form-item label="名称" prop='inspectObjectName'>
      <el-input
        placeholder="请输入名称"
        size="medium"
        v-model="ruleForm.inspectObjectName"
      />
    </el-form-item>
    <el-form-item label="类型" prop='inspect_object_type'>
      <el-select
        v-model="ruleForm.inspect_object_type"
        size="medium"
        placeholder="请选择类型"
      >
        <el-option
          v-for="item in inspect_object_typeAll"
          :key="item.dictionaryValue"
          :label="item.remarks"
          :value="item.dictionaryValue"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="类别" prop='inspectObjectBelong'>
      <el-select
        v-model="ruleForm.inspectObjectBelong"
        size="medium"
        placeholder="请选择类别">
        <el-option
          v-for="item in inspectObjectBelongAll"
          :key="item.dictionaryValue"
          :label="item.remarks"
          :value="item.dictionaryValue"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="flex" label-width="20px" style='width:auto'>
      <el-button
        class="btn-query"
        size="mini"
        @click='inquiry()'
      >查询
      </el-button>
      <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <p class="both"/>
  </el-form>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {
    data () {
      return {}
    },
    components: {},
    mounted () {

    },
    computed: {
      ...mapState({
        ruleForm: state => state.inspectObject.conditionsForm.ruleForm
      }),
      ...mapGetters('inspectObject', [
        'inspect_object_typeAll',
        'inspectObjectBelongAll'
      ])
    },
    methods: {
      ...mapActions('inspectObject', [
        'inquiry'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
        this.inquiry()
      }
    }
  }
</script>
/n
