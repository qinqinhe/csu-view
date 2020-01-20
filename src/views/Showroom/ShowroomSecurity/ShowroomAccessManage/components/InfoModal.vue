<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="InfoVisible"
      @close="hideData()"
      width="660px"
      :modal-append-to-body="false"
			title="进出入记录"
			>
      <section class="dialog-from-content">       
        <div class="dialog-form fsize14P">
          <div>
            <span>
              陈列室名称
              <i></i>
            </span>
            <span>{{content.showroomName}}</span>
          </div>
          <div>
            <span>
              管理员
              <i></i>
            </span>
            <span>{{content.showroomAdminUserName}}</span>
          </div>
          <div>
            <span>
              联系方式
              <i></i>
            </span>
            <span>{{content.showroomAdminPhone}}</span>
          </div>
          <div>
            <span>
              进入时间
              <i></i>
            </span>
            <span>{{content.enterDate}}</span>
          </div>
          <div>
            <span>
              结束时间
              <i></i>
            </span>
            <span>{{content.outDate}}</span>
          </div>
          <div>
            <span>
              近期出入记录
              <i></i>
            </span>
            <span></span>
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-row-style="{height:'40px'}"
            :row-style="{height:'36px'}"
            :header-cell-style="{padding:'0'}"
            :cell-style="{padding:'0'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="accessUserName" label="人员名称" align="center"></el-table-column>
            <el-table-column prop="enterDate" label="进入时间" width="160" align="center"></el-table-column>
            <el-table-column prop="outDate" label="离开时间" width="160" align="center"></el-table-column>
          </el-table>
          <div class="pagination w100">
            <div class="disflex padT15P">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.pageCurrent"
                :page-sizes="[1, 10, 50, 100]"
                :page-size="pagination.pageRows"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total"
              />
            </div>
          </div>
        </div>
      </section>
    </el-dialog>
  </div>
</template>

<script>
import { code } from "@/config/wildcard";
export default {
  props: {
    InfoVisible: {
      type: Boolean,
      default: false
    },
    parameter: [String, Array, Object]
  },
  data() {
    return {
      tableData: [],
      content: {},
      
      pagination: {
        
        pageCurrent: 1,
        
        pageRows: 10,
        
        total: 0
      }
    };
  },
  watch: {
    InfoVisible(newVal, oldVal) {
      if (newVal) {
        this.getDetail();
      }
    }
  },
  mounted() {},
  methods: {
    hideData() {
      this.$emit("hideDialog");
      this.content = '';
      this.parameter = '';
    },
    cancel() {
      this.hideData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    
    handleSizeChange(val) {
      this.pagination.pageRows = val;
      this.getDetailList();
    },
    
    handleCurrentChange(val) {
      this.pagination.pageCurrent = val;
      this.getDetailList();
    },
    
    getDetail() {
      this.getDetailList();
      console.log(this.parameter);
      this.webapi({
        url: "/showroom/api/showroomAccessRecord/queryShowRoomDetail",
        data: {
          showroomName: this.parameter.showroomName,
          searchTime: this.parameter.enterDate
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res;
        if (resultCode === code.CODE_SUCCESS) {
          const { rowSum, rows } = data;
          this.tableData = rows;
          console.log(data);
          this.content = data;
        }
      });
    },
    //分页查询陈列室出入记录
    getDetailList() {
      let data = {
        pageCurrent: this.pagination.pageCurrent,
        pageRows: this.pagination.pageRows
      };
      this.webapi({
        url:
          "/showroom/api/showroomAccessRecord/queryShowroomAccessRecordByPage  ",
        data: {
          showroomName: this.parameter.showroomName,
          searchTime: this.parameter.enterDate,
          ...data
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res;
        if (resultCode === code.CODE_SUCCESS) {
          const { rowSum, rows } = data;
          this.tableData = rows;
          this.pagination.total = rowSum;
        }
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "@/assets/css/model.scss";
.dialog-model {
  .dialog-form {
    div {
      overflow: hidden;
      margin-bottom: 5px;
      span:first-child {
        width: 95px;
        height: 24px;
        float: left;
        line-height: 28px;
        text-align: right;
        padding-right: 15px;
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
        width: calc(100% - 110px);
        line-height: 28px;
        float: right;
        input {
          width: 100%;
        }
      }
    }
  }
}
</style>