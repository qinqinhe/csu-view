<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="InfoVisible"
      @close="hideData()"
      width="660px"
      :modal-append-to-body="false"
    >
      <div class="dialog-container radius10P">
        <div class="dialog-header">
          <p class="fsize24P textC mB20P">进出入记录</p>
        </div>
        <div class="dialog-form fsize14P">
          <div>
            <span>
              会议室名称
              <i/>
            </span>
            <span>{{content.meetingRoomName}}</span>
          </div>
          <div>
            <span>
              管理员
              <i/>
            </span>
            <span>{{content.meetingRoomAdminUserName}}</span>
          </div>
          <div>
            <span>
              联系方式
              <i/>
            </span>
            <span>{{content.meetingRoomAdminPhone}}</span>
          </div>
          <div>
            <span>
              进入时间
              <i/>
            </span>
            <span>{{content.enterDate}}</span>
          </div>
          <div>
            <span>
              结束时间
              <i/>
            </span>
            <span>{{content.endDate}}</span>
          </div>
          <div>
            <span>
              近期出入记录
              <i/>
            </span>
            <span/>
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
            <el-table-column fixed type="index" label="序号" width="50" align="center"/>
            <el-table-column prop="personnelName" label="人员名称" align="center"/>
            <el-table-column prop="personnelEnterDate" label="进入时间" width="160" align="center"/>
            <el-table-column prop="personnelOutDate" label="出入时间" width="160" align="center"/>
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'

  export default {
    props: {
      InfoVisible: {
        type: Boolean,
        default: false
      },
      roomAccessRecordId: [String, Array, Object]
    },
    data () {
      return {
        tableData: [],
        content: {},
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 100
        }
      }
    },
    watch: {
      InfoVisible (newVal, oldVal) {
        if (newVal) {
          this.getDetail()
        }
      }
    },
    mounted () {},
    methods: {
      hideData () {
        this.$emit('hideDialog')
        this.content = ''
        this.roomAccessRecordId = ''
      },
      cancel () {
        this.hideData()
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      
      handleSizeChange (val) {
        this.pagination.pageRows = val
        this.getDetailList()
      },
      
      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.getDetailList()
      },
      
      getDetail () {
        this.getDetailList()
        this.webapi({
          url:
            '/meeting/api/meetingRoomAccessRecord/queryMeetingRoomAccessDetail',
          data: {
            roomAccessRecordId: this.roomAccessRecordId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            console.log(data)
            this.content = data
          }
        })
      },
      //会议室出入记录详情近期进出列表
      getDetailList () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url:
            '/meeting/api/meetingRoomAccessRecord/queryMeetingRoomAccessDetailPage ',
          data: {
            roomAccessRecordId: this.roomAccessRecordId,
            ...data
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              return item
            })
            this.pagination.total = rowSum
          }
        })
      }
    }
  }
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
