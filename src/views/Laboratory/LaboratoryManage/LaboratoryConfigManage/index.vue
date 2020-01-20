<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <Operation :info="inquiry"/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table :data="tableData" height="100%" border tooltip-effect="dark" @selection-change="tableCheckChange">
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="timeArrangeCode" width="240" align="center" label="编码"/>
            <el-table-column prop="timeArrangeName" align="center" label="名称"/>
            <el-table-column label="操作" align="center" width="160">
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.timeArrangeConfigId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.timeArrangeConfigId)">删除</el-button>
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
    <add-modal :info="inquiry"/>
    <edit-modal :infoId="infoId" :info="inquiry"/>
  </div>
</template>

<script>
  import Tree from '@/components/Tree/tree'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapActions, mapState } from 'vuex'

  export default {
    components: {
      
      AddModal,
      
      
      Operation,
      
      EditModal,
      Tree
    },
    data () {
      return {
        ruleForm: {},
        
        laboratoryStatusSelect: [{
          value: '',
          label: '所有'
        },
          {
            value: '1',
            label: '启用'
          },
          {
            value: '0',
            label: '禁用'
          }
        ],
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 0
        },
        infoId: '',

        tableData: [],
        treesTitle: '选择楼层'
      }
    },
    async mounted () {
      await this.inquiry()
      await this.laboratoryInfo()
    },
    computed: {
      ...mapState({
        AddVisible: state => state.AddVisible,
        EditVisible: state => state.EditVisible
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange'
      ]),
      ...mapActions('laboratoryConfigManage', [
        'laboratorychange'
      ]),
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
      },
      laboratoryInfo () {
        this.webapi({
          url: '/laboratory/api/timeArrangeConfig/queryNotConfiguredLaboratoryList'
        }).then(res => {
          const {
            resultCode,
            data,
            resultMessage
          } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.laboratorychange(data)
          }
        })
      },
      inquiry () {
        let page = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/laboratory/api/timeArrangeConfig/queryByPage',
          data: {
            ...page
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows
            this.pagination.total = rowSum
          }
        })
      },
      
      handleSizeChange (val) {
        this.pagination.pageRows = val
        this.inquiry()
      },
      
      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.inquiry()
      },
      del (InfoId) {
        this.$confirm('确认删除此条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.delApi(InfoId)
          })
          .catch(() => {})
      },
      delApi (InfoId) {
        this.webapi({
          url: '/laboratory/api/timeArrangeConfig/deleteTimeArrangeConfig',
          data: {
            timeArrangeConfigId: InfoId
          }
        }).then(res => {
          const {
            resultCode,
            data,
            resultMessage
          } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.inquiry()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: resultMessage
            })
          }
        })
      }
    },
    watch: {
      'AddVisible': function (val) {
        val && this.laboratoryInfo()
      },
      'EditVisible': function (val) {
        val && this.laboratoryInfo()
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  


  .table {
    width: calc(100% + 30px);
    min-height: 430px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
