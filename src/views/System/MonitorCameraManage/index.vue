<template>
  <div class="h100 body-main flex">
    <section class="main-tree">
      <tree-sidebar
        title='所有位置'
        :treelist='dataTree'
        :childCheck.sync='coordinateArrayVo'
      />
    </section>
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <el-form ref="ruleForm" label-width="95px" :model="ruleForm">
          <el-form-item label="名称" prop="monitorCameraName">
            <el-input placeholder="请输入名称" size="medium" v-model="ruleForm.monitorCameraName"/>
          </el-form-item>
          <el-form-item label="类型" prop="monitorCameraType">
            <el-select v-model="ruleForm.monitorCameraType" size="medium" clearable placeholder="请选择类型">
              <el-option
                key="null"
                label="所有"
                value=""
              />
              <el-option
                v-for="item in monitorCameraTypeSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景" prop="monitorCameraScenes">
            <el-select v-model="ruleForm.monitorCameraScenes" size="medium" clearable placeholder="请选择场景">
              <el-option
                key="null"
                label="所有"
                value=""
              />
              <el-option
                v-for="item in monitorCameraScenesSelect"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="monitorCameraStatus">
            <el-select v-model="ruleForm.monitorCameraStatus" size="medium" clearable placeholder="请选择状态">
              <el-option
                key="null"
                label="所有"
                value=""
              />
              <el-option
                v-for="item in monitorCameraStatusSelect"
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
            <el-table-column type="selection" width="55"/>
            <el-table-column type="index" align="center" label="排序" width="60"/>
            <el-table-column prop="monitorCameraName" align='center' label="名称"/>
            <el-table-column prop="monitorCameraCode" align='center' label="编码"/>
            <el-table-column prop="monitorCameraScenesValue" align='center' label="场景"/>
            <el-table-column prop="monitorCameraTypeValue" align='center' label="类型"/>
            <el-table-column prop="purchaserName" align='center' label="采购人"/>
            <el-table-column prop="purchaserPhone" align='center' label="采购人电话"/>
            <el-table-column prop="monitorCameraStatus" align='center' label="状态"/>
            <el-table-column prop="affiliated" align='center' label="位置"/>
            <el-table-column label="操作" align="center" width="180" x>
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.monitorCameraInfoId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.monitorCameraInfoId)">删除</el-button>
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
          monitorCameraName: '',
          monitorCameraType: '',
          monitorCameraScenes: '',
          monitorCameraStatus: ''
        },
        coordinateArrayVo: [],
        monitorCameraStatusSelect: [
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
        infoId: '',

        tableData: [],
        treesTitle: '选择位置',
        data: [],
        dataTree: []
      }
    },
    async mounted () {
      await this.info()
      
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.monitor_camera_type.code
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.monitorCameraTypeChange(data)
        }
      })
      await this.webapi({
        url: '/system/api/dictionaryData/getDictionaryDataByDictionaryTypeCode',
        data: {
          dictionaryTypeCode: dictionary.monitor_camera_scenes.code
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.monitorCameraScenesChange(data)
        }
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange',
        'monitorCameraTypeChange',
        'monitorCameraScenesChange'
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
      },
      
      inquiry () {
        let data = {
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/system/api/monitorCamera/queryMonitorCameraInfoByPage',
          data: {
            ...data,
            ...this.ruleForm
          }
        }).then(res => {
          const { resultCode, data, resultMessage } = res
          if (resultCode === code.CODE_SUCCESS) {
            const { rowSum, rows } = data
            this.tableData = rows.map(item => {
              switch (item.monitorCameraStatus) {
                case '0':
                  item.monitorCameraStatus = '异常'
                  break
                case '1':
                  item.monitorCameraStatus = '正常'
                  break
              }
              item.affiliated = ''
              const affiliated = [item.affiliatedBuildingValue, item.affiliatedFloorValue, item.affiliatedRoomValue]
              for (let i = 0; i < affiliated.length; i++) {
                const items = affiliated[i]
                if (items) {
                  item.affiliated += items + ((i < affiliated.length - 1) ? ',' : '')
                } else {
                  item.affiliated += '公共区域'
                  break
                }
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
          url: '/system/api/monitorCamera/deleteMonitorCameraInfo',
          data: {
            monitorCameraInfoId: InfoId
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
      },
      placeClear () {
        this.$refs.treeLeft.Keysclear()
      }
    },
    computed: {
      ...mapState({
        monitorCameraTypeSelect: state => state.monitorCameraType,
        monitorCameraScenesSelect: state => state.monitorCameraScenes
      })
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
