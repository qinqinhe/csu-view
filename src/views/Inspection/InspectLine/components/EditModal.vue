<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="editDateVisibleUpdate(false)"
      width="900px"
      :modal-append-to-body='false'
      title="编辑巡检线路"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="inspectLineCode">
            <el-input
              v-model="ruleForm.inspectLineCode"
              placeholder="请输入编码"
            />
          </el-form-item>
          <el-form-item label="名称" prop="inspectLineName">
            <el-input
              v-model="ruleForm.inspectLineName"
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item label="排序" prop="inspectLineSort">
            <el-input
              v-model="ruleForm.inspectLineSort"
              type='number'
              placeholder="请输入排序"
            />
          </el-form-item>
          <el-form-item label="巡检对象" prop="inspectObjectInfoIdArray">
            <el-checkbox-group v-model="ruleForm.inspectObjectInfoIdArray">
              <el-checkbox
                v-for='(item,index) in inspectObjectInfoIdArraySelect'
                :key='index'
                :label="item.inspectObjectInfoId"
              >{{ item.inspectObjectName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              type='textarea'
              v-model="ruleForm.remarks"
              placeholder="请输入备注"
            />
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        visible: state => state.inspectLine.editDate.visible,
        ruleForm: state => state.inspectLine.editDate.ruleForm,
        rules: state => state.inspectLine.editDate.rules,
        inspectObjectTypeSelect: state => state.inspectLine.editDate.inspectObjectTypeSelect,
        inspectObjectBelongSelect: state => state.inspectLine.editDate.inspectObjectBelongSelect,
        inspectObjectInfoIdArraySelect: state => state.inspectLine.inspectObjectInfoIdArraySelect
      })
    },
    methods: {
      ...mapActions('inspectLine', [
        'editDateVisibleUpdate',
        'editsubmitForm'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.editsubmitForm()
          }
        })
      }

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content > .el-form-item {
    width: 500px;
  }

  .table-add {
    padding-top: 30px;

    .table-add-head {
      justify-content: space-between;

      .table-add-title {
        font-size: 20px;

        .table-add-warn {
          color: #F56C6C;
          font-size: 12px;
          padding-left: 8px;
        }
      }
    }
  }

  .table-add .el-form-item {
    margin-bottom: 0;
  }
</style>
