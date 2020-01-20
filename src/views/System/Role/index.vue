<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="角色名称" prop='roleName'>
            <el-input placeholder="角色名称" size="medium" v-model="ruleForm.roleName"/>
          </el-form-item>
          <el-form-item label="展示风格" prop='displayStyle'>
            <el-select v-model="ruleForm.displayStyle" size="medium" placeholder="展示风格">
              <el-option v-for="item in displayStyleSelect" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
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
      <Operation
        :info='inquiry'
      />
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
            @selection-change='tableCheckChange'
          >
            <el-table-column type="selection" align='center' width="55"/>
            <el-table-column type='index' align='center' label="排序" width='60'/>
            <el-table-column prop="roleName" align='center' label="名称"/>
            <el-table-column prop="displayStyle" align='center' label="展示风格"/>
            <el-table-column label="操作" align='center' width='260'>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type='primary'
                  @click='edit(scope.row.roleInfoId)'
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type='success'
                  @click='permission(scope.row.roleInfoId)'
                >数据权限
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="del(scope.row.roleInfoId)"
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
      :info='inquiry'
    />
    <edit-modal
      :dataTree='dataTree'
      :dataNative='data'
      :infoId='infoId'
      :info='inquiry'
    />
    <data-permission
      :dataTree='dataTree'
      :dataNative='data'
      :infoId='infoId'
      :info='inquiry'
    />
  </div>
</template>

<script>
  import tree from '@/api/tree'
  import treeAssembleAndFitter from '@/api/treeAssembleAndFitter'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import DataPermission from './components/DataPermission'
  import Operation from './components/Operation'
  import { code } from '@/config/wildcard'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      AddModal: AddModal,
      Operation,
      EditModal,
      DataPermission
    },
    data () {
      return {
        ruleForm: {
          roleName: '',
          displayStyle: ''
        },
        displayStyleSelect: [{
          value: '',
          label: '所有'
        }, {
          value: '1',
          label: '正常'
        }, {
          value: '2',
          label: '3D'
        }],
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
      await this.inquiry()
      await this.webapi({
        url: '/user/api/menu/queryAllMenuInfo'
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          const permission = treeAssembleAndFitter({
            arr: data,
            ids: 'menuInfoId',
            name: 'menuName'
          })
          this.permissionChange(permission.assemble)
          this.permissionFitterSet(permission.fitter)
        }
      })
      await this.webapi({
        url: '/user/api/department/queryDepts'
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          const department = new treeAssembleAndFitter({
            arr: data,
            ids: 'departmentInfoId',
            name: 'departmentName'
          })
          this.departmentChange(department.assemble)
          this.departmentFitterSet(department.fitter)
        }
      })
      await this.webapi({
        url: '/system/api/place/queryPlaceByUserId'
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          const place = new treeAssembleAndFitter({
            arr: data,
            ids: 'placeInfoId',
            name: 'placeName'
          })
          this.placeAllChange(place.assemble)
          this.placeFitterSet(place.fitter)
        }
      })
    },
    methods: {
      ...mapMutations([
        'EditVisibleChange',
        'tableCheckChange',
        'permissionChange'
      ]),
      ...mapActions('role', [
        'permissionVisibleChange',
        'permissionFitterSet',
        'departmentChange',
        'departmentFitterSet',
        'placeAllChange',
        'placeFitterSet'
      ]),
      permission (infoId) {
        this.infoId = infoId
        this.permissionVisibleChange(true)
      },
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
      },
      inquiry () {
        this.webapi({
          url: '/user/api/role/queryRoleByPage',
          data: {
            ...this.ruleForm,
            pageCurrent: this.pagination.pageCurrent,
            pageRows: this.pagination.pageRows
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              item.displayStyle = (item.displayStyle === '1') ? '正常' : '3D'
              switch (item.roleStates) {
                case '0':
                  item.roleStates = '锁定'
                  break
                case '1':
                  item.roleStates = '正常'
                  break
                case '2':
                  item.roleStates = '已删除'
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
          url: '/user/api/role/delRole',
          data: {
            roleInfoId: InfoId
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
