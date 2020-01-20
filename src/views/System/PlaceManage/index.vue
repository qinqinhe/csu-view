<template>
  <div class="h100 body-main flex">
    <section class="main-tree">
      <tree-sidebar
        title='所有位置'
        :treelist='dataTree'
        :allCheck.sync='placeInfoIdArray'
      />
    </section>
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="80px" :model="ruleForm">
          <el-form-item label="名称" prop="placeName">
            <el-input placeholder="名称" size="medium" v-model="ruleForm.placeName"/>
          </el-form-item>
          <el-form-item label="类型" prop="placeType">
            <el-select v-model="ruleForm.placeType" size="medium" clearable placeholder="类型">
              <el-option
                v-for="item in placeTypeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <Operation :info="info"/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height="100%"
            border
            tooltip-effect="dark"
            @selection-change="tableCheckChange"
          >
            <el-table-column type="index" align="center" label="序号" width="60"/>
            <el-table-column prop="placeName" align='center' label="名称"/>
            <el-table-column prop="placeType" align='center' label="类型"/>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.placeInfoId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.placeInfoId)">删除</el-button>
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
    <add-modal :dataTree="dataTree" :dataNative="data" :info="info"/>
    <edit-modal :dataTree="dataTree" :dataNative="data" :infoId="infoId" :info="info"/>
  </div>
  <!--
         -->
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code } from '@/config/wildcard'
  import { mapMutations, mapActions, mapState } from 'vuex'

  export default {
    components: {
      
      AddModal: AddModal,
      Operation,
      EditModal,
      TreeSidebar
    },
    data () {
      return {
        placeInfoIdArray: [],
        ruleForm: {
          placeName: '',
          placeType: '',
          coordinateArrayVo: []
        },
        placeTypeSelect: [
          {
            value: '',
            label: '所有'
          },
          {
            value: '1',
            label: '楼栋'
          },
          {
            value: '2',
            label: '楼层'
          },
          {
            value: '3',
            label: '房间'
          },
          {
            value: '4',
            label: '公共区域'
          }
        ],
        placeStatusSelect: [
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
        pagination: {
          pageCurrent: 1,
          pageRows: 10,
          total: 0
        },
        AddVisible: true,
        infoId: '',
        tableData: [],
        data: [],
        dataTree: [],
        showed: ''
      }
    },
    mounted () {
      this.info()
    },
    computed: {},
    methods: {
      ...mapMutations([
        'EditVisibleChange',
        'tableCheckChange'
      ]),
      ...mapActions('tree', [
        'treelistUpdate'
      ]),
      info () {
        this.webapi({
          url: '/system/api/place/queryAllPlace '
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.dataTree = tree({
              arr: data,
              ids: 'placeInfoId',
              name: 'placeName'
            })
            this.data = data
            this.inquiry()
          }
        })
      },
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.info()
      },
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/system/api/place/queryPlace ',
          data: {
            ...data,
            ...this.ruleForm
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              switch (item.placeType) {
                case '1':
                  item.placeType = '楼栋'
                  break
                case '2':
                  item.placeType = '楼层'
                  break
                case '3':
                  item.placeType = '房间'
                  break
                case '4':
                  item.placeType = '公共区域'
                  break
              }
              switch (item.placeStatus) {
                case '0':
                  item.placeStatus = '异常'
                  break
                case '1':
                  item.placeStatus = '正常'
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
        this.$confirm('确认删除此位置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delApi(InfoId)
        }).catch(() => {})
      },
      delApi (InfoId) {
        this.webapi({
          url: '/system/api/place/delPlace',
          data: {
            placeInfoId: InfoId
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.info()
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
      }
    },
    watch: {
      'placeInfoIdArray': function (val) {
        this.ruleForm.placeInfoIdArray = val.join(',')
        this.inquiry()
      }
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
