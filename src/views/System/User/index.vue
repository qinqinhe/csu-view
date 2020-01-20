<template>
  <div class="h100 body-main flex">
    <section class="main-tree">
      <tree-sidebar
        title='所有部门'
        :treelist='dataTree'
        @change='treeChange'
        :checkWay='1'
      />
    </section>
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="校园一卡通" prop='omnipotentCard'>
            <el-input placeholder="校园一卡通" size="medium" v-model="ruleForm.omnipotentCard"/>
          </el-form-item>
          <el-form-item label="用户姓名" prop='userName'>
            <el-input placeholder="用户姓名" size="medium" v-model="ruleForm.userName"/>
          </el-form-item>
          <el-form-item label="身份证号" prop='identificationNumber'>
            <el-input placeholder="身份证号" size="medium" v-model="ruleForm.identificationNumber"/>
          </el-form-item>
          <el-form-item label="手机号码" prop='phoneNumber'>
            <el-input placeholder="手机号码" size="medium" v-model="ruleForm.phoneNumber"/>
          </el-form-item>
          <el-form-item label="用户状态" prop='userStatus'>
            <el-select v-model="ruleForm.userStatus" size="medium" clearable placeholder="用户状态">
              <el-option
                v-for="item in userStatusSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
      <Operation :info='inquiry'/>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
            @selection-change='tableCheckChange'
            v-loading='tableLoading'
          >
            <el-table-column type="selection" align='center' width="55"/>
            <el-table-column prop="userName" align='center' label="用户姓名"/>
            <el-table-column prop="omnipotentCard" align='center' label="校园一卡通"/>
            <el-table-column prop="phoneNumber" align='center' label="手机号码"/>
            <el-table-column prop="departmentName" align='center' label="组织" width='100'/>
            <el-table-column prop="identificationNumber" align='center' label="身份证号" />
            <el-table-column label="操作" align='center' width='180'>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type='primary'
                  @click='edit(scope.row.userInfoId)'
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="del(scope.row.userInfoId)"
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
  </div>
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import AddModal from './components/AddModal'
  import EditModal from './components/EditModal'
  import Operation from './components/Operation'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapActions, mapState } from 'vuex'

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
          omnipotentCard: '',
          userName: '',
          phoneNumber: '',
          identificationNumber: '',
          userStatus: '',
          departmentInfoId: ''
        },
        
        userStatusSelect: [{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '锁定'
        }, {
          value: '1',
          label: '正常'
        }],
        pagination: {
          pageCurrent: 1,
          pageRows: 10,
          total: 0
        },
        AddVisible: true,
        infoId: '',

        tableData: [],
        treesTitle: '选择组织',
        data: [],
        dataTree: [],
        showed: ''
      }
    },
    async mounted () {
      this.tableLoadingUpdate(true)
      await this.info()
      await this.webapi({
        url: '/user/api/role/queryListRole'
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.rolechange(data)
        }
      })
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.user_type.code
        }
      }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.userTypeChange(data)
          }
        })
      await this.inquiry()
    },
    methods: {
      ...mapMutations([
        'EditVisibleChange',
        'tableCheckChange',
        'tableLoadingUpdate'
      ]),
      ...mapActions('user', {
        rolechange: 'rolechange',
        userTypeChange: 'userTypeChange'
      }),
      info () {
        this.webapi({
          url: '/user/api/department/queryDepts'
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.dataTree = tree({
              arr: data,
              ids: 'departmentInfoId',
              name: 'departmentName'
            })
            this.data = data
            this.departmentInfoId = data.length ? this.dataTree[0].id : ''
          }
        })
      },
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.info()
      },
      
      
      
      
      
      treeChange: function ({ childCheck, treeCheck, currentItem }) {
        this.ruleForm.departmentInfoId = currentItem.id
        this.inquiry()
        console.log(currentItem.id)
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
          url: '/user/api/user/queryUserByPage',
          data: {
            ...data
          }
        }).then(res => {
            this.tableLoadingUpdate(false)
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              const { rowSum, rows } = data
              this.tableData = rows.map(item => {
                item.userSex = item.userSex === '0' ? '女' : '男'
                item.userStatus = item.userStatus === '0' ? '锁定' : '正常'
                return item
              })
              this.pagination.total = rowSum
            } else {
              this.tableData = []
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
          url: '/user/api/user/delUser',
          data: {
            userId: InfoId
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.inquiry()
              this.$message({
                type: 'success',
                message: '删除成功!'
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
    },
    watch: {
      'departmentInfoIds': function (val) {
        console.log(val)
        
        
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
