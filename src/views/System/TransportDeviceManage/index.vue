<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="编码" prop="transportDeviceCode">
            <el-input placeholder="传输装置编码" size="medium" v-model="ruleForm.transportDeviceCode"/>
          </el-form-item>
          <el-form-item label="名称" prop="transportDeviceName">
            <el-input placeholder="传输装置名称" size="medium" v-model="ruleForm.transportDeviceName"/>
          </el-form-item>
          <el-form-item label="生产厂商" prop="transportDeviceVendor">
            <el-input placeholder="传输装置厂商" size="medium" v-model="ruleForm.transportDeviceVendor"/>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <Operation :info="inquiry"/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height="100%"
            border
            tooltip-effect="dark"
            @selection-change="tableCheckChange"
          >
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" align="center" label="排序" width="60"/>
            <el-table-column prop="transportDeviceName" align='center' label="名称"/>
            <el-table-column prop="transportDeviceCode" align='center' label="编码"/>
            <el-table-column prop="transportDeviceVendor" align='center' label="生产厂商"/>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.transportDeviceId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.transportDeviceId)">删除</el-button>
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
    <add-modal :dataTree="dataTree" :dataNative="data" :info="inquiry"/>
    <edit-modal :dataTree="dataTree" :dataNative="data" :infoId="infoId" :info="inquiry"/>
  </div>
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      TreeSidebar,
      AddModal: AddModal,
      Operation,
      EditModal
    },
    data () {
      return {
        ruleForm: {
          transportDeviceCode: '',
          transportDeviceName: '',
          transportDeviceVendor: ''
        },
        deviceStatusSelect: [
          {
            value: '',
            label: '所有'
          },
          {
            value: '0',
            label: '异常'
          },
          {
            value: '1',
            label: '正常'
          }
        ],
        placeTypeSelect: [
          {
            value: '',
            label: '所有'
          },
          {
            value: '4',
            label: '公共区域'
          }
        ],
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 0
        },
        
        infoId: '',

        tableData: [],
        treesTitle: '选择位置',
        data: [],
        dataTree: []
      }
    },
    async mounted () {
      await this.inquiry()
      await this.webapi({
        url: '/system/api/place/queryAllPlace '
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.dataTree = tree({
            arr: data,
            ids: 'placeInfoId',
            name: 'placeName'
          })
        }
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange',
        'deviceTypeChange',
        'systemChange',
        'subsystemChange',
        'transportChange'
      ]),
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
      },
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/system/api/transportDevice/getTransportDevice',
          data: {
            ...data,
            ...this.ruleForm
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              switch (item.deviceStatus) {
                case '0':
                  item.deviceStatus = '异常'
                  break
                case '1':
                  item.deviceStatus = '正常'
                  break
              }
              return item
            })
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
        this.$confirm('确认删除此数据', '提示', {
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
          url: '/system/api/transportDevice/delTransportDevice',
          data: {
            transportDeviceId: InfoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
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
      },
      resetForm (formName) {

        this.$refs[formName].resetFields()
        this.inquiry()
      },
      placeClear () {
        this.$refs.treeLeft.Keysclear()
      }
    },
    computed: {
      ...mapState({
        count: state => state.systemDeviceManage.count
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  


  .table {
    width: calc(100% + 30px);
    min-height: 430px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
