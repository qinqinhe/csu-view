<template>
  <div class="h100 body-main flex">
    <section class="main-data mL0">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="名称" prop="examinationName">
            <el-input placeholder="考试名称" size="medium" v-model="ruleForm.examinationName"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择时间"
              :picker-options="pickerOptionsBegin"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :editable="false"
              placeholder="选择时间"
              :picker-options="pickerOptionsFinish"
            />
          </el-form-item>
          <el-form-item label="科目" prop="laboratoryType">
            <el-select
              v-model="ruleForm.laboratoryType"
              size="medium"
              clearable
              placeholder="科目"
            >
              <el-option
                v-for="item in laboratoryTypeSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="考试状态" prop="examinationStatus">
            <el-select
              v-model="ruleForm.examinationStatus"
              size="medium"
              clearable
              placeholder="考试状态"
            >
              <el-option
                v-for="item in examinationStatusSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="flex" label-width="0" style='width:auto' >
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both" />
        </el-form>
      </section>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height="100%"
            border
            tooltip-effect="dark"
            @selection-change="tableCheckChange"
          >
            <el-table-column type="index" label="序号" width="60" align="center" />
            <el-table-column prop="examinationName" align="center" label="名称" />
            <el-table-column prop="laboratoryType" label="科目" align="center" />
            <el-table-column align="center" label="开始时间">
              <template slot-scope="scope">
                <span>{{ scope.row.startTime.substr(0, scope.row.startTime.length-3) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间">
              <template slot-scope="scope">
                <span>{{ scope.row.endTime.substr(0, scope.row.endTime.length-3) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="capacity" align="center" label="预约人数" />
            <!-- <el-table-column prop="examinationStatus" align="center" label="考试状态" /> -->
            <el-table-column label="操作" align="center" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="order(scope.row.examinationInfoId)"
                >预约</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.pageCurrent"
          :page-sizes="[1, 10, 50, 100]"
          :page-size="pagination.pageRows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </section>
    </section>
  </div>
</template>

<script>
import { code, dictionary } from "@/config/wildcard";
import { mapMutations } from "vuex";
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      ruleForm: {
        
        examinationName: "",
        
        startTime: "",
        
        endTime: "",
        
        laboratoryType: "",
        
        
      },
      
      laboratoryTypeSelect: [],
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      laboratoryTypeJson: {

      },
      
      pagination: {
        
        pageCurrent: 1,
        
        pageRows: 10,
        
        total: 100
      },
      
      AddVisible: true,
      
      infoId: "",

      tableData: [],
      treesTitle: "选择楼层",
      data: [],
      dataTree: [],
      
      dataTreeFloor: [],
      
      dataFloor: []
    };
  },
  async mounted() {

    
    await this.webapi({
      url: "/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode",
      data: {
        dictionaryTypeCode: dictionary.laboratory_type.code
      }
    }).then(res => {
      const { resultCode, data, resultMessage } = res;
      if (resultCode === code.CODE_SUCCESS) {
        this.laboratoryTypeSelect = data
        this.laboratoryTypeSelect.unshift({dictionaryDataInfoId:'',dictionaryValue:'所有'})
        this.laboratorySet(data);
        this.laboratoryTypeJson = {}
        data.forEach(item => {
          this.laboratoryTypeJson[item.dictionaryDataInfoId] = item.dictionaryValue
        })

        //列表
        this.inquiry();
      }
    });
  },
  computed: {
    pickerOptionsBegin() {
      return {
        disabledDate: time => {
          const curDate = Date.now();
          if (this.ruleForm.endTime) {
            return (
              time.getTime() < curDate ||
              time.getTime() < new Date(this.ruleForm.endTime).getTime()
            );
          } else {
            return time.getTime() < curDate - 24 * 60 * 60 * 1000;
          }
        }
      };
    },
    pickerOptionsFinish() {
      return {
        disabledDate: time => {
          const curDate = Date.now();
          if (this.ruleForm.startTime) {
            return (
              time.getTime() < curDate - 24 * 60 * 60 * 1000 ||
              time.getTime() <=
                new Date(this.ruleForm.startTime).getTime() -
                  24 * 60 * 60 * 1000
            );
          } else {
            return time.getTime() < curDate - 24 * 60 * 60 * 1000;
          }
        }
      };
    }
  },
  methods: {
    ...mapMutations([
      
      "tableCheckChange",
      "userChange",
      "laboratorySet"
    ]),
    order(infoId) {
       MessageBox.confirm("确认预约该场考试！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.webapi({
            url:
              "/examination/api/examinationReservation/addExaminationReservation",
            data: {
              examinationInfoId: infoId
            }
          }).then(res => {
            const { resultCode, data, resultMessage } = res;
            if (resultCode === code.CODE_SUCCESS) {
              this.$message({
                type: "success",
                message: resultMessage
              });
              this.inquiry();
            }else{
              
              
              
              

              this.inquiry();
            }
          });
        })
    },
    
    inquiry() {
      let data = {
        pageCurrent: this.pagination.pageCurrent,
        pageRows: this.pagination.pageRows
      };
      for (let i in this.ruleForm) {
        this.ruleForm[i] && (data[i] = this.ruleForm[i]);
      }
      this.webapi({
        url: "/examination/api/examinationInfo/queryExamReservationList",
        data: {
          ...data
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res;
        if (resultCode === code.CODE_SUCCESS) {
          const { rowSum, rows } = data;
          this.tableData = rows.map(item => {
          if (item.laboratoryType === '0') {
            item.laboratoryType = '其它'
          } else {
            
            item.laboratoryType = this.laboratoryTypeJson[item.laboratoryType]
          }

          
            return item;
          });
          this.pagination.total = rowSum;
        }
      });
    },
    
    handleSizeChange(val) {
      this.pagination.pageRows = val;
      this.inquiry();
    },
    
    handleCurrentChange(val) {
      this.pagination.pageCurrent = val;
      this.inquiry();
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.inquiry();
    }
  }
};
</script>

<style lang='scss' rel='stylesheet/scss' scoped>


.table {
  width: calc(100% + 30px);
  min-height: 430px;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
