<template>
  <div class="modal-dialog border-none">
    <el-dialog
      class="dialog-model"
      :visible="EditVisible"
      @close="EditVisibleChange(false)"
      width="660px"
      :modal-append-to-body="false"
      title="考试预约详情"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="dialog-form fsize14P">
        <section class="dialog-from-content">
          <el-form-item label="考场名称" prop="examinationHallName">
            <el-input size="medium" v-model="ruleForm.examinationHallName" readonly />
          </el-form-item>
          <el-form-item label="考试名称" prop="examinationName">
            <el-input size="medium" v-model="ruleForm.examinationName" readonly />
          </el-form-item>
          <el-form-item label="考场地址" prop="examinationHallAddress">
            <el-input size="medium" v-model="ruleForm.examinationHallAddress" readonly />
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.examinationStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择时间"
              readonly
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.examinationEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              readonly
            />
          </el-form-item>
          <el-form-item label="监考老师" prop="teacherName">
            <el-input size="medium" v-model="ruleForm.teacherName" readonly />
          </el-form-item>
          <el-form-item label="考试总分" prop="totalScore">
            <el-input size="medium" v-model="ruleForm.totalScore" readonly />
          </el-form-item>
          <el-form-item label="考试合格分数" prop="qualifiedScore">
            <el-input size="medium" v-model="ruleForm.qualifiedScore" readonly />
          </el-form-item>
          <el-form-item label="考试成绩" prop="examinationScore">
            <el-input size="medium" v-model="ruleForm.examinationScore" readonly />
          </el-form-item>
          <el-form-item label="考题总数" prop="questionsTotal">
            <el-input size="medium" v-model="ruleForm.questionsTotal" readonly />
          </el-form-item>
          <el-form-item label="答题正确题数" prop="correctNum">
            <el-input size="medium" v-model="ruleForm.correctNum" readonly />
          </el-form-item>
          <el-form-item label="答题错误题数" prop="wrongNum">
            <el-input size="medium" v-model="ruleForm.wrongNum" readonly />
          </el-form-item>
          <el-form-item label="考试状态" prop="examinationStatusValue">
            <el-input size="medium" v-model="ruleForm.examinationStatusValue" readonly />
          </el-form-item>
          <el-form-item label="考试注意事项" prop="examinationPrecautions">
            <el-input
              size="medium"
              type="textarea"
              v-model="ruleForm.examinationPrecautions"
              readonly
            />
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="EditVisibleChange(false)" size="medium">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <TreeChooseParent
      :dataTree="dataTree"
      :dataNative="dataNative"
      :visible="TreeChooseState"
      v-on:hideDialog="TreeChooseState = false"
      :parentIds.sync="ruleForm.parentIds"
      :TreeChooseName.sync="ruleForm.parentName"
      :id.sync="ruleForm.position"
      :parentNames.sync="ruleForm.parentName"
      :TreeChooseType="0"
      title="菜单选择"
    />
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapState, mapMutations } from "vuex";
import TreeChooseParent from "@/components/Tree/TreeChooseParent";
import { code, local } from "@/config/wildcard";

export default {
  props: {
    dataTree: {
      type: Array,
      default: true
    },
    
    dataNative: {
      type: Array,
      default: true
    },
    infoId: {
      type: String
    },
    info: {
      type: Function
    }
  },
  data() {
    return {
      ruleForm: {
        
        examinationReservationId: this.infoId,
        
        examinationHallName: "",
        
        examinationHallAddress: "",
        
        examinationName: "",
        
        examinationStartTime: "",
        
        examinationEndTime: "1",
        
        teacherName: "",
        
        totalScore: "",
        
        qualifiedScore: "",
        
        examinationScore: "",
        
        questionsTotal: "",
        
        correctNum: "",
        
        wrongNum: "",
        
        examinationStatus: "",
        examinationStatusValue: '',
        
        examinationPrecautions: ""
      },
      
      pickerOptions: {
        disabledDate: time => {
          const curDate = Date.now();
          return time.getTime() > curDate;
        }
      },
      TreeChooseState: false
    };
  },
  components: {
    TreeChooseParent
  },
  mounted() {},
  computed: {
    ...mapState({
      EditVisible: state => state.EditVisible,
      user: state => state.dictionary.user,
      laboratory: state => state.dictionary.laboratory
    })
  },
  methods: {
    ...mapMutations([
      
      "EditVisibleChange"
    ]),
    
    infoDetail() {
      this.webapi({
        url: `/examination/api/examinationReservation/queryDetailByExaminationReservationId`,
        data: {
          examinationReservationId: this.infoId
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res;
        if (resultCode === code.CODE_SUCCESS) {
          let ruleForm = this.ruleForm;
          for (let i in ruleForm) {
            (typeof data[i] !== "string" || data[i].length !== 0) &&
              (ruleForm[i] = data[i]);
          }
      
		  this.ruleForm = ruleForm;
		  
          for (let i in ruleForm) {
            if (ruleForm[i] == undefined || ruleForm[i] == null) {
              ruleForm[i] = "未考试";
            }
          }
        }
      });
    }
  },
  watch: {
    EditVisible: function(val) {
      
      val && this.infoDetail();
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss">
.border-none {
  .el-input__inner,
  .el-textarea__inner {
    border: none !important;
  }
}
</style>
<<<<<<< HEAD
=======
<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/css/model.scss";
.dialog-model {
  .dialog-form {
    .el-textarea {
      margin-bottom: 25px;
    }
    div {
      overflow: hidden;
      margin-bottom: -10px;
      span:first-child {
        width: 100px;
        height: 24px;
        float: left;
        line-height: 28px;
        text-align: right;
        padding-right: 25px;
        text-align: justify;
        display: inline-block;
        vertical-align: top;
        i {
          display: inline-block;
          width: 100%;
          height: 0;
        }
      }
      span:last-child {
        width: calc(100% - 126px);
        float: right;
        input {
          width: 100%;
        }
      }
      .el-date-editor {
        width: 100%;
      }

      .form-radio {
        line-height: 40px;
      }
    }
  }
}
</style>
>>>>>>> 15de3eb1689851aca2627a5e20fd0168b315f081
