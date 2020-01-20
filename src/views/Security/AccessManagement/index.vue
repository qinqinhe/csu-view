<template>
  <div class="h100 body-main flex">
    <!-- <section class="main-tree">
      <tree-sidebar
      title='所有位置'
      :treelist='dataTree'
      :childCheck.sync='coordinateArrayVo'
    />
    </section> -->
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="70px" :model="ruleForm">
          <el-form-item label="名称" prop="deviceName">
            <el-input placeholder="名称" size="medium" v-model="ruleForm.deviceName"/>
          </el-form-item>
          <el-form-item label="编码" prop="deviceCode">
            <el-input placeholder="编码" size="medium" v-model="ruleForm.deviceCode"/>
          </el-form-item>
          <el-form-item label="状态" prop="deviceStatus">
            <el-select v-model="ruleForm.deviceStatus" size="medium" clearable placeholder="状态">
              <el-option
                v-for="item in deviceStatusSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="flex" label-width="20px" style="width: auto">
            <el-button class="btn-query" size="mini" @click="inquiry()">查询</el-button>
            <el-button class="btn-reset" size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <p class="both"/>
        </el-form>
      </section>
      <section class="main-table">
        <section class="main-table-con">
          <el-table
            :data="tableData"
            height="100%"
            border
            tooltip-effect="dark"
            @selection-change="tableCheckChange"
          >
            <el-table-column type="index" align="center" label="排序" width="60"/>
            <el-table-column prop="accessType" align='center' label="闸道">
              <template slot-scope="scope">
                <span v-if='scope.row.accessType==="2"'>车行道</span>
                <span v-else>人行道</span>
              </template>
            </el-table-column>
            <el-table-column prop="userInfoName" align='center' label="姓名"/>
            <!-- <el-table-column prop="deviceStatus" align='center' label="联系方式" /> -->
            <el-table-column align='center' label="车牌号">
              <template slot-scope="scope">
                <span v-if='scope.row.accessType==="2"'>{{ scope.row.numberPlate }}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="deviceStatus" align='center' label="状态">
              <template slot-scope="scope">
                <span v-if='scope.row.departureTime' class="green">已出</span>
                <span v-else class="red">未出</span>
              </template>
            </el-table-column>
            <el-table-column align='center' label="出入时间">
              <template slot-scope="scope">
                <span>{{ scope.row.entryTime }} - {{ scope.row.departureTime }}</span>
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
  </div>
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      TreeSidebar
    },
    data () {
      return {
        ruleForm: {
          deviceName: '',
          deviceCode: '',
          deviceStatus: '',
          placeType: '',
          parentIds: '',
          parentNames: '',
          coordinateArrayVo: ''
        },
        coordinateArrayVo: '',
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
      await this.info()
      await this.inquiry()
    },
    methods: {
      ...mapMutations([
        'tableCheckChange'
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
          }
        })
      },
      inquiry () {
        let data = {
          belongSystem: '7857509038833549313',
          belongSubsystem: '7857531464971730945',
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/guard/api/collegeAccessRecord/queryAccessByPage',
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
      resetForm (formName) {

        this.$refs[formName].resetFields()
        this.inquiry()
      },
      placeClear () {
        this.$refs.treeLeft.Keysclear()
      }
    },
    watch: {
      'coordinateArrayVo': function (val) {
        const coordinateArrayVo = val.map(item => {
          const array = item.split(',')
          array[1] || (array[1] = 0)
          array[2] || (array[2] = 0)
          return array.join('|')
        })
        this.ruleForm.coordinateArrayVo = coordinateArrayVo.join(',')
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
