<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="addDateVisibleUpdate(false)"
      width="900px"
      :modal-append-to-body='false'
      title="添加巡检对象"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="inspectObjectCode">
            <el-input
              v-model="ruleForm.inspectObjectCode"
              placeholder="请输入编码"
            />
          </el-form-item>
          <el-form-item label="名称" prop="inspectObjectName">
            <el-input
              v-model="ruleForm.inspectObjectName"
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item label="排序" prop="inspectObjectSort">
            <el-input
              v-model="ruleForm.inspectObjectSort"
              type='number'
              placeholder="请输入排序"
            />
          </el-form-item>
          <el-form-item label="类型" prop="inspectObjectType">
            <el-select
              v-model="ruleForm.inspectObjectType"
              size="medium"
              placeholder="请选择类型">
              <el-option
                v-for="item in inspect_object_type"
                :key="item.dictionaryValue"
                :label="item.remarks"
                :value="item.dictionaryValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择房间" prop="inspectRoomId" v-if='ruleForm.inspectObjectType==="1"'>
            <el-select
              v-model="ruleForm.inspectRoomId"
              size="medium"
              placeholder="请选择房间">
              <el-option
                v-for="item in inspectRoom"
                :key="item.roomId"
                :label="item.roomName"
                :value="item.roomId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择设备" prop="inspectDeviceId" v-else-if='ruleForm.inspectObjectType==="2"'>
            <el-select
              v-model="ruleForm.inspectDeviceId"
              size="medium"
              placeholder="请输入关键词"
              filterable
              remote
              :remote-method="inspectDeviceSet"
              :loading='ruleForm.inspectDeviceLoad'
            >
              <el-option
                v-for="item in inspectDevice"
                :key="item.deviceInfoId"
                :label="item.deviceName"
                :value="item.deviceInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类别" prop="inspectObjectBelong">
            <el-select
              v-model="ruleForm.inspectObjectBelong"
              size="medium"
              placeholder="请选择类别">
              <el-option
                v-for="item in inspectObjectBelong"
                :key="item.dictionaryValue"
                :label="item.remarks"
                :value="item.dictionaryValue"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="巡检项" prop="inspectItemInfoIdArray">
            <el-checkbox-group v-model="ruleForm.inspectItemInfoIdArray">
              <el-checkbox
                v-for='(item,index) in inspectItem'
                :key='index'
                :label="item.inspectItemInfoId"
              >{{ item.inspectItemContent }}
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
        visible: state => state.inspectObject.addDate.visible,
        ruleForm: state => state.inspectObject.addDate.ruleForm,
        rules: state => state.inspectObject.addDate.rules,
        inspect_object_type: state => state.inspectObject.dictionary.inspect_object_type,
        inspectObjectBelong: state => state.inspectObject.dictionary.inspectObjectBelong,
        inspectRoom: state => state.inspectObject.inspectRoom,
        inspectDevice: state => state.inspectObject.inspectDevice,
        inspectItem: state => state.inspectObject.inspectItem
      })
    },
    methods: {
      ...mapActions('inspectObject', [
        'addDateVisibleUpdate',
        'addsubmitForm',
        'inspectDeviceSet'
      ]),
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      submitForm (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.addsubmitForm()
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
