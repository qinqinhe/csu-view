<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      width='900px'
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      :modal-append-to-body="false"
      title="添加陈列室时间配置"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="timeArrangeCode">
            <el-input v-model="ruleForm.timeArrangeCode" placeholder="请输入编码" />
          </el-form-item>
          <el-form-item label="名称" prop="timeArrangeName">
            <el-input v-model="ruleForm.timeArrangeName" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注" />
          </el-form-item>
          
          <el-form-item label="陈列室" prop="showRoom">
            <el-checkbox-group v-model="ruleForm.showRoom">
              <el-checkbox v-for="item in showRoom" :label="item.showroomInfoId" :key="item.showroomInfoId"  v-model="item.showroomInfoId">{{ item.showroomName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <section class="table-add">
            <section class="table-add-head flex">
              <p class="table-add-title">添加时间段<span class="table-add-warn" v-show='tableWarn'><i class="el-icon-warning-outline"></i>请添加时间段</span></p>
              <el-button type="primary" size="medium" @click='addTtemplate'>添加模板</el-button>
            </section>
            <el-table
              :data="ruleForm.timeArrangeAddVo"
              style="width: 100%"
              >
              <el-table-column type="index" lable=' ' width="55" />
              <el-table-column label="排序" width="90" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"timeArrangeAddVo." + scope.$index + ".timeSort"' 
                    :rules='rules.timeSort'
                    >
                    <el-input v-model="scope.row.timeSort" placeholder="请输入排序" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="时间段" align='center'>
                <template slot-scope="scope">
                  <el-form-item
                    label-width='0'
                    :prop='"timeArrangeAddVo." + scope.$index + ".time"' 
                    :rules='rules.time'
                    >
                    <el-time-picker
                      is-range
                      v-model="scope.row.time"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      format='HH:mm'
                      value-format='HH:mm'
                      placeholder="选择时间范围"
                      :picker-options="{
                        selectableRange: `00:00-23:59`
                      }"/>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align='center'>
                <template slot-scope="scope">
                  <el-button type="danger" size="medium" @click='delTtemplate(scope.$index)'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>          
          </section>
          
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')" size="medium">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapState, mapMutations } from "vuex";
import { code, local } from "@/config/wildcard";
export default {
  props: {
    info: {
      type: Function
    }
  },
  data() {
    return {
      ruleForm: {
        showRoom: [],
        roomType: '2',
        timeArrangeCode: '',
        timeArrangeName: '',
        remarks: '',
        timeArrangeAddVo: []
      },
      
      rules: {
        timeArrangeCode: [
          { required: true, message: "请输入时间安排编码", trigger: "blur" },
        ],        
        timeArrangeName: [
          { required: true, message: "请输入时间安排名称", trigger: "blur" },
        ],
        timeSort: [
          { required: true, message: "请输入排序", trigger: "blur" },          
        ],
        roomId: [
          { required: true, message: "请选择教室", trigger: "change" },          
        ],
        time: [
          { trigger: "blur",  validator: (rule, value, callBack) => {
            if (value) {
              callBack()
            } else {
              callBack(new Error('请选择时间'))
            }
          }}
        ],
        meetingRoom: [
          { trigger: "blur",  validator: (rule, value, callBack) => {
            if (value.length) {
              callBack()
            } else {
              callBack(new Error('请选择房间'))
            }
          }}
        ]  
      },
      tableWarn: false
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      AddVisible: state => state.AddVisible,
      showRoom: state => state.showRoomConfigManage.showRoom
    })
  },
  methods: {
    ...mapMutations([
      "AddVisibleChange"
    ]),
    addTtemplate () {
      this.ruleForm.timeArrangeAddVo.push({
            startTime: '',
            endTime: '',
            timeSort: '',
            time: ''
          })          
      this.tableWarn = false
    },
    delTtemplate (index) {
      this.ruleForm.timeArrangeAddVo.splice(index, 1)
    },
    
    add () {
      let ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
      for (let i = 0;i<ruleForm.timeArrangeAddVo.length;i++) {
        const item = ruleForm.timeArrangeAddVo[i]
        ruleForm[`timeArrangeAddVo[${i}].timeSort`] = item.timeSort
        ruleForm[`timeArrangeAddVo[${i}].startTime`] = item.time[0] + ':00'
        ruleForm[`timeArrangeAddVo[${i}].endTime`] = item.time[1] + ':00'
      }
      delete ruleForm.timeArrangeAddVo
      for (let i = 0;i<ruleForm.showRoom.length;i++) {
        const item = ruleForm.showRoom[i]
        ruleForm[`timeArrangeRoomVo[${i}].roomId`] = item
        ruleForm[`timeArrangeRoomVo[${i}].roomType`] = 2
      }
      delete ruleForm.showRoom
      this.webapi({
        url: "/showroom/api/timeArrangeConfig/addTimeArrangeConfig",
        data: {
          ...ruleForm
        }
      }).then(res => {
        const { resultCode, resultMessage } = res;
        if (resultCode === code.CODE_SUCCESS) {
          this.info();
          Message({
            message: resultMessage
          });
          this.resetForm("ruleForm");
          this.AddVisibleChange(false);
        }
      });
    },
    
    submitForm(formName) {
      this.$refs[formName].validate(valid => {        
        if (this.ruleForm.timeArrangeAddVo.length) {
          if (valid) {
            this.add();
          }
        } else {
          this.tableWarn = true
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {
        showRoom: [],
        roomType: '2',
        timeArrangeCode: '',
        timeArrangeName: '',
        remarks: '',
        timeArrangeAddVo: []
      }
    }
  },
  watch: {
    'AddVisibleChange': function  (val) {
      !val && this.resetForm('ruleForm')
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.dialog-model{
}
.dialog-from-content>.el-form-item{
  width: 500px;
}
.table-add{
  padding-top: 30px;
  .table-add-head{
    justify-content: space-between;
    .table-add-title{
      font-size: 20px;
      .table-add-warn{
        color: #F56C6C;
        font-size: 12px;
        padding-left: 8px;
      }
    }
  }
}
.table-add .el-form-item{
  margin-bottom: 0;
}
</style>
