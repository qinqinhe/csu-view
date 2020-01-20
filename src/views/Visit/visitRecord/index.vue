<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="124px" :model="ruleForm">
          <el-form-item label="拜访者姓名" prop='visitorUserName'>
            <el-input placeholder="请输入拜访者姓名" size="medium" v-model="ruleForm.visitorUserName"/>
          </el-form-item>
          <el-form-item label="拜访者电话" prop='visitorPhoneNumber'>
            <el-input placeholder="请输入拜访者电话" size="medium" v-model="ruleForm.visitorPhoneNumber"/>
          </el-form-item>
          <el-form-item label="来访者身份证号码" prop='guestIdentificationNumber'>
            <el-input placeholder="请输入来访者身份证号码" size="medium" v-model="ruleForm.guestIdentificationNumber"/>
          </el-form-item>
          <el-form-item label="来访者姓名" prop='guestName'>
            <el-input placeholder="请输入来访者姓名" size="medium" v-model="ruleForm.guestName"/>
          </el-form-item>
          <el-form-item label="来访者电话" prop='guestPhoneNumber'>
            <el-input placeholder="请输入来访者电话" size="medium" v-model="ruleForm.guestPhoneNumber"/>
          </el-form-item>
          <el-form-item label="确认方式" prop='confirmationMethod'>
            <el-select v-model="ruleForm.confirmationMethod" size="medium" clearable placeholder="请选择确认方式">
              <el-option
                v-for="item in confirmationMethodSelect"
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
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
            @selection-change='tableCheckChange'
          >
            <el-table-column type="selection" width="55"/>
            <el-table-column type='index' label="排序" width='60' align='center'/>
            <!-- <el-table-column prop="visitorUserName" label="拜访人" align='center'/>
            <el-table-column prop="visitorPhoneNumber" label='拜访人电话' align='center' width='120'/> -->
            <el-table-column prop="guestIdentificationNumber" label="来访者身份证号码" align='center'/>
            <el-table-column prop="guestName" label="来访者姓名" align='center'/>
            <el-table-column prop="guestPhoneNumber" label="来访者电话" align='center'/>
            <el-table-column label="进出入时间" width='180' align='center'>
              <template slot-scope="scope">
                <span>{{ scope.row.visitTime }} - {{ scope.row.departureTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="确认状态" align='center'>
              <template slot-scope="scope">
                <span v-if='scope.row.confirmationStatus === "0"' :style='{color: color.yellow}'>等待确认</span>
                <span v-else-if='scope.row.confirmationStatus === "1"' :style='{color: color.green}'>已确认</span>
                <span v-else-if='scope.row.confirmationStatus === "2"' :style='{color: color.red}'>已拒绝</span>
              </template>
            </el-table-column>
            <el-table-column prop="visitCause" label="拜访原因" align='center'/>
            <el-table-column label="操作" align='center' width='180'>
              <template slot-scope="scope">
                <section v-if='(scope.row.confirmationStatus === "0")'>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="enter(scope.row.visitRecordId)"
                  >确认
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.row.visitRecordId)"
                  >拒绝
                  </el-button>
                </section>
                <span v-else>-</span>
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
    <edit-modal
      :dataTree='dataTree'
      :dataNative='data'
      :infoId='infoId'
      :info='inquiry'
    />
  </div>
</template>

<script>
  import tree from '@/api/tree'
  import EditModal from './components/EditModal'
  import { code, color } from '@/config/wildcard'
  import { mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      
      EditModal
    },
    data () {
      return {
        ruleForm: {
          visitorUserName: '',
          visitorPhoneNumber: '',
          guestIdentificationNumber: '',
          guestName: '',
          guestPhoneNumber: '',
          confirmationMethod: ''
        },
        confirmationMethodSelect: [
          {
            value: '',
            label: '所有'
          },
          {
            value: '1',
            label: '电话确认'
          },
          {
            value: '2',
            label: '消息确认'
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
        color: color
      }
    },
    async mounted () {
      await this.inquiry()
      await this.webapi({
        url: '/user/api/user/queryVisitor'
      }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            this.facultyChange(data)
          }
        })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange'
      ]),
      ...mapActions('visitRecord', [
        'facultyChange'
      ]),
      edit (infoId) {
        this.infoId = infoId
        this.EditVisibleChange(true)
        this.inquiry()
      },
      
      headCall: function (msg) {
        
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
          url: '/guard/api/CollegeVisitRecord/queryVisitRecordByUserId',
          data: {
            ...data
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
        this.$confirm('拒绝来访', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operation({
            confirmationStatus: '2',
            visitRecordId: InfoId
          })
        }).catch(() => {
        })
      },
      operation (params) {
        this.webapi({
          url: '/guard/api/CollegeVisitRecord/confirmVisit',
          data: {
            ...params
            
          }
        }).then(res => {
            const { resultCode, data, resultMessage } = res
            if (resultCode === code.CODE_SUCCESS) {
              this.inquiry()
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
            } else {
              this.$message({
                type: 'success',
                message: resultMessage
              })
            }
          })
      },
      enter (InfoId) {
        this.$confirm('确认来访', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operation({
            confirmationStatus: '1',
            visitRecordId: InfoId
          })
        }).catch(() => {
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
