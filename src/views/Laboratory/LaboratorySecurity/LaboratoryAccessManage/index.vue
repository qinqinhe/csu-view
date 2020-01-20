<template>
  <div class="h100 body-main flex">
    <!-- <section class="main-tree">
      <Tree
        :contentTrees="dataTree"
        :treesTitle="treesTitle"
        v-on:headCallBack="headCall"
        :clickType='false'
      />
    </section> -->
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form
          ref="ruleForm"
          label-width="100px"
          :model="ruleForm"
        >
          <el-form-item label="实验室名称" prop='laboratoryName'>
            <el-input placeholder="实验室名称" size="medium" v-model="ruleForm.laboratoryName"/>
          </el-form-item>
          <!-- <el-form-item label="出入人员电话" prop='accessUserPhone'>
            <el-input type='number' placeholder="出入人员电话" size="medium" v-model="ruleForm.accessUserPhone"></el-input>
          </el-form-item> -->
          <el-form-item label="开始时间" prop='searchBeginTime'>
            <el-date-picker
              v-model="ruleForm.searchBeginTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsBegin"
            />
          </el-form-item>
          <el-form-item label='结束时间' prop='searchFinishTime'>
            <el-date-picker
              v-model="ruleForm.searchFinishTime"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptionsFinish"
            />
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

        <!-- <Operation
        :info='info'
        /> -->
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height='100%'
            border
            tooltip-effect="dark"
          >
            <!-- <el-table-column type="selection" width="55"/> -->
            <el-table-column type='index' label="排序" width='60' align='center'/>
            <el-table-column prop="laboratoryName" label="实验室名称" align='center'/>
            <el-table-column prop="roomType" label="类型" align='center'/>
            <el-table-column prop="laboratoryAdminName" label="管理员" align='center'/>
            <el-table-column prop="laboratoryAdminPhone" label="管理员联系电话" align='center'/>
            <el-table-column prop="accessUserName" label="出入人名字" align='center'/>
            <el-table-column prop="accessUserPhone" label="出入人电话" align='center'/>
            <el-table-column prop="time" label="出入时间" align='center' width='320'/>
            <el-table-column prop="outState" label="出入状态" align='center'>
              <template slot-scope="scope">
                <span v-if='scope.row.outState' style='color:#17c67a'>已出</span>
                <span v-else style='color:#f4332f'>未出</span>
              </template>
            </el-table-column>
            <!--  :style='{color: "#ff0"}' -->
            <!-- <el-table-column prop="affiliatedRoom" label="所属房间" /> -->
            <!-- <el-table-column label="操作" align='center' width='180' >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click='edit(scope.row.positionInfoId)'
                  >编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.row.positionInfoId)"
                  >删除</el-button>
                </template>
              </el-table-column> -->
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
  </div>
</template>

<script>
  import Tree from '@/components/Tree/tree'
  import tree from '@/api/tree'
  import { code } from '@/config/wildcard'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      
      Tree: Tree
    },
    data () {
      return {
        ruleForm: {
          
          laboratoryName: '',
          
          accessUserPhone: '',
          
          searchBeginTime: '',
          
          searchFinishTime: '',
          
          affiliatedBuilding: '',
          
          affiliatedFloor: '',
          
          affiliatedRoom: ''
        },
        
        menuTypeSelect: [{
          value: '',
          label: '所有'
        }, {
          value: '0',
          label: '目录'
        }, {
          value: '1',
          label: '菜单'
        }],
        
        pagination: {
          
          pageCurrent: 1,
          
          pageRows: 10,
          
          total: 0
        },
        
        AddVisible: true,
        
        infoId: '',

        tableData: [],
        treesTitle: '选择房间',
        data: [],
        dataTree: [],
        parentId: []
      }
    },
    mounted () {
      this.info()
    },
    computed: {
      pickerOptionsBegin () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            if (this.ruleForm.searchFinishTime) {
              return (time.getTime() > curDate) || (time.getTime() > new Date(this.ruleForm.searchFinishTime).getTime())
            } else {
              return (time.getTime() > curDate)
            }
          }
        }
      },
      pickerOptionsFinish () {
        return {
          disabledDate: (time) => {
            const curDate = Date.now()
            if (this.ruleForm.searchBeginTime) {
              return (time.getTime() > curDate) || (time.getTime() < new Date(this.ruleForm.searchBeginTime).getTime())
            } else {
              return (time.getTime() > curDate)
            }
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange'
      ]),
      info () {
        
        this.webapi({
          url: '/system/api/place/queryBuildingAndFloorAndRoom'
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
      
      headCall: function (msg) {
        this.parentId = [msg.id]
        this.dataNativeSet(msg.parentId)
        this.ruleForm.affiliatedRoom = this.parentId[this.parentId.length - 3]
        this.ruleForm.affiliatedFloor = this.parentId[this.parentId.length - 2]
        this.ruleForm.affiliatedBuilding = this.parentId[this.parentId.length - 1]
        this.inquiry()

      },
      
      dataNativeSet (parentId) {
        if (parentId !== '0') {
          for (let i = 0; i < this.data.length - 1; i++) {
            const items = this.data[i]
            if (items.id === parentId) {
              this.parentId.push(items.id)
              this.dataNativeSet(items.parentId)
            }
          }
        }
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
          url: '/laboratory/api/accessRecord/queryAccessRecordByPage ',
          data: {
            ...data
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              switch (item.roomType) {
                case '1':
                  item.roomType = '实验室'
                  break
                case '2':
                  item.roomType = '陈列室'
                  break
                case '3':
                  item.roomType = '会议室'
                  break
              }
              
              item.time = (item.enterDate || '') + '-' + (item.outDate || '')
              item.outState = Boolean(item.outDate)
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
