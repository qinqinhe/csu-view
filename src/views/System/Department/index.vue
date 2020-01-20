<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="部门编码" prop='departmentCode'>
            <el-input placeholder="部门编码" size="medium" v-model="ruleForm.departmentCode"/>
          </el-form-item>
          <el-form-item label="部门名称" prop='departmentName'>
            <el-input placeholder="部门名称" size="medium" v-model="ruleForm.departmentName"/>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style='width:auto'>
            <el-button
              class="btn-query"
              size="mini"
              @click='inquiry()'
            >查询
            </el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>

      <Operation :info='info'/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
            @selection-change='tableCheckChange'
          >
            <el-table-column type="selection" width="55" align='center'/>
            <el-table-column type='index' label="排序" width='60' align='center'/>
            <el-table-column prop="departmentCode" label="编码" align='center'/>
            <el-table-column prop="departmentName" label='名称' align='center'/>
            <!-- <el-table-column prop="departmentStatus" label="状态" align='center' /> -->
            <el-table-column label="操作" align='center' width='180'>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click='edit(scope.row.departmentInfoId)'
                  type='primary'
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="del(scope.row.departmentInfoId)"
                >删除
                </el-button>
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
    <add-modal
      :dataTree='dataTree'
      :dataNative='data'
      :info='info'
    />
    <edit-modal
      :dataTree='dataTree'
      :dataNative='data'
      :infoId='infoId'
      :info='info'
    />
  </div>
</template>

<script>
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code } from '@/config/wildcard'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      
      AddModal: AddModal,
      
      
      Operation,
      
      EditModal
    },
    data () {
      return {
        ruleForm: {
          
          departmentCode: '',
          
          departmentName: ''
        },
        
        positionStatusSelect: [
          {
            value: '',
            label: '所有'
          }, {
            value: '0',
            label: '停用'
          }, {
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
        treesTitle: '选择菜单',
        data: [],
        dataTree: [],
        showed: ''
      }
    },
    async mounted () {
      await this.info()
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange'
      ]),
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.inquiry()
      },
      
      headCall: function (msg) {
        
      },
      info () {
        this.webapi({
          url: '/user/api/department/queryDepts'
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.dataTree = tree({
                arr: JSON.parse(JSON.stringify(data)),
                ids: 'departmentInfoId',
                name: 'departmentName'
              })
              this.data = data.map(item => {
                item.id = item.departmentInfoId
                return item
              })
              this.inquiry()
            }
          })
      },
      
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        for (let i in this.ruleForm) {
          this.ruleForm[i] && (data[i] = this.ruleForm[i])
        }
        this.webapi({
          url: '/user/api/department/queryDeptByPage',
          data: {
            ...data
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              const { rowSum, rows } = data
              this.tableData = rows.map(item => {
                item.departmentStatus = item.departmentStatus === '0' ? '停用' : '正常'
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
        this.info()

      },
      del (InfoId) {
        this.$confirm('确认删除此条数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delApi(InfoId)
        }).catch(() => {
        })
      },
      delApi (InfoId) {
        this.webapi({
          url: '/user/api/department/delDept',
          data: {
            departmentInfoId: InfoId
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
        this.info()
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
