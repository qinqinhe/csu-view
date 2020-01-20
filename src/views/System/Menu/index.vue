<template>
  <div class="h100 body-main flex">
    <!-- <section class="main-tree">
      <Tree
        :contentTrees="dataTree"
        :treesTitle="treesTitle"
        v-on:headCallBack="headCall"
        :Optional='false'
        />
    </section> -->
    <section class="main-tree">
      <tree-sidebar
        title='所有菜单'
        :treelist='dataTree'
        :showCheckbox='false'
      />
    </section>
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="菜单编码" prop="menuCode">
            <el-input placeholder="菜单编码" size="medium" v-model="ruleForm.menuCode"/>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input placeholder="菜单名称" size="medium" v-model="ruleForm.menuName"/>
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
            v-loading='tableLoading'
          >
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" label="序号" width="60" align="center"/>
            <el-table-column prop="menuName" label="菜单名称" align="center"/>
            <el-table-column prop="menuRoute" label="菜单路由" align="center"/>
            <el-table-column prop="menuSort" label="菜单排序" width="150" align="center"/>
            <el-table-column prop="menuType" label="菜单类型" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="center"/>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.menuInfoId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.menuInfoId)">删除</el-button>
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
    <add-modal :dataTree="dataTreeOpration" :dataNative="data" :info="info"/>
    <edit-modal :dataTree="dataTreeOpration" :dataNative="data" :infoId="infoId" :info="info"/>
  </div>
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code } from '@/config/wildcard'
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
          menuCode: '',
          menuName: ''
        },
        pagination: {
          pageCurrent: 1,
          pageRows: 10,
          total: 0
        },
        AddVisible: true,
        infoId: '',

        tableData: [],
        treesTitle: '菜单预览',
        data: [],
        dataTree: [],
        dataTreeOpration: [],
        showed: ''
      }
    },
    mounted () {
      this.tableLoadingUpdate(true)
      this.info()
    },
    methods: {
      ...mapMutations([
        'EditVisibleChange',
        'tableCheckChange',
        'tableLoadingUpdate'
      ]),
      info () {
        this.webapi({
          url: '/user/api/menu/queryMenuListByUserInfoId'
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.dataTreeOpration = [{label: '根目录', id: '0', children: tree({
              arr: data,
              ids: 'menuInfoId',
              name: 'menuName'
            })}]
            this.dataTree = tree({
              arr: data,
              ids: 'menuInfoId',
              name: 'menuName'
            })
            this.data = [{label: '根目录', id: '0'},...data]
            this.inquiry()
          }
        })
      },
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.info()
      },
      headCall: function (msg) {
      },
      inquiry () {
        this.tableLoadingUpdate(true)
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        for (let i in this.ruleForm) {
          this.ruleForm[i] && (data[i] = this.ruleForm[i])
        }
        this.webapi({
          url: '/user/api/menu/queryMenuInfo',
          data: {
            ...data
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              item.menuType = item.menuType === '0' ? '目录' : '菜单'
              return item
            })
            this.pagination.total = rowSum
          } else {
            this.tableData = []
          }

          this.tableLoadingUpdate(false)
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
        }).catch(() => {})
      },
      delApi (InfoId) {
        this.webapi({
          url: '/user/api/menu/delMenu',
          data: {
            menuInfoId: InfoId
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
    computed: {
      ...mapState([
        'tableLoading'
      ])
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
