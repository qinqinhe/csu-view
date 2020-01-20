<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="dialog-form fsize14P"
    >
      <el-form-item label="归属部门" prop="departmentName">
        <el-input v-model="ruleForm.departmentName" @focus="departmentState()"/>
      </el-form-item>
      <el-form-item label="选择文件" prop="file">
        <!-- <el-input type='file' accept='*.jpe' v-model="ruleForm.file" @focus="departmentState()" /> -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          class="upload-demo"
          multiple
          :limit="1"
          accept='application/vnd.ms-excel'
          :file-list="ruleForm.fileList"
          :auto-upload='false'
          :on-change='fileListChange'
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="选择部门"
      :visible.sync="DepartmentVisible"
      :modal-append-to-body='false'
      key='10'
      :append-to-body='true'
    >
      <TreeChooseParent :dataTree='[]' :dataNative='[]'/>
    </el-dialog>

  </div>
</template>

<script>
  import TreeChooseParent from '@/components/Tree/TreeChooseParent'

  export default {
    props: {},
    components: {
      TreeChooseParent
    },
    data () {
      return {
        ruleForm: {
          
          departmentInfoId: '',
          
          departmentName: '',
          parentId: [],
          file: '',
          
          fileList: []
        },

        
        rules: {
          departmentName: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        },
        DepartmentVisible: false
      }
    },
    watch: {
      'ruleForm.fileList': (a, b) => {
        console.log(a, b)
      }
    },
    methods: {
      
      fileListChange (arr, list) {
        console.log(arr, list)
      },
      
      departmentState () {
        this.DepartmentVisible = !this.DepartmentVisible
      },
      
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addUser()
          } else {
            return false
          }
        })
      },
      
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
