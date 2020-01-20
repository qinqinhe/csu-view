<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="editDateVisibleUpdate(false)"
      width="900px"
      :modal-append-to-body='false'
      title="编辑字典"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="字典编码" prop="dictionaryTypeCode">
            <el-input
              v-model="ruleForm.dictionaryTypeCode"
              placeholder="请输入字典编码"
            />
          </el-form-item>
          <el-form-item label="字典名称" prop="dictionaryTypeName">
            <el-input
              v-model="ruleForm.dictionaryTypeName"
              placeholder="请输入字典名称"
            />
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              placeholder="请输入备注"
            />
          </el-form-item>
          <section class="table-add">
            <section class="table-add-head flex">
              <p class="table-add-title">添加字典值<span class="table-add-warn" v-show='ruleForm.addListTotalwarning'>
                <i class="el-icon-warning-outline"/>请添加字典值</span>
              </p>
              <el-button type="primary" size="medium" @click='editDateAddTemplate'>添加模板</el-button>
            </section>
            <el-table
              :data="ruleForm.dictionaryDataInfoAddVoList"
              style="width: 100%"
            >
              <el-table-column type="index" lable=' ' width="55"/>
              <el-table-column label="编码" width="90" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    type='number'
                    label-width='0'
                    :prop='"dictionaryDataInfoAddVoList." + scope.$index + ".dictionaryCode"'
                    :rules='rules.dictionaryCode'
                  >
                    <el-input v-model="scope.row.dictionaryCode" placeholder="请输入排序"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="值" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"dictionaryDataInfoAddVoList." + scope.$index + ".dictionaryValue"'
                    :rules='rules.dictionaryValue'
                  >
                    <el-input v-model="scope.row.dictionaryValue" placeholder="请输入字典值"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="状态" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"dictionaryDataInfoAddVoList." + scope.$index + ".dictionaryDataStatus"'
                    :rules='rules.dictionaryDataStatus'
                  >
                    <el-select v-model="scope.row.dictionaryDataStatus" size="medium" clearable placeholder="请选择字典状态">
                      <el-option
                        v-for="item in dictionaryTypeStatusSelect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="备注" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"dictionaryDataInfoAddVoList." + scope.$index + ".remarks"'
                  >
                    <el-input v-model="scope.row.remarks" placeholder="请输入备注"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align='center'>
                <template slot-scope="scope">
                  <el-button type="danger" size="medium" @click='editDatedelTemplate(scope.$index)'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
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
        visible: state => state.dictionaryManage.editDate.visible,
        ruleForm: state => state.dictionaryManage.editDate.ruleForm,
        rules: state => state.dictionaryManage.editDate.rules,
        dictionaryTypeStatusSelect: state => state.dictionaryManage.editDate.dictionaryTypeStatusSelect
      })
    },
    methods: {
      ...mapActions('dictionaryManage', [
        'editDateVisibleUpdate',
        'editsubmitForm',
        'editDatedelTemplate',
        'editDateAddTemplate',
        'editListTotalwarningUpdate'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid && this.ruleForm.dictionaryDataInfoAddVoList.length) {
            this.editsubmitForm()
          } else if (this.ruleForm.dictionaryDataInfoAddVoList.length === 0) {
            this.editListTotalwarningUpdate(true)
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
