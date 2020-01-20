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
            <el-table-column prop="deviceName" align='center' label="设备名称"/>
            <el-table-column prop="deviceCode" align='center' label="设备编码"/>
            <el-table-column prop="deviceStatus" align='center' label="设备状态"/>
            <el-table-column label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type='primary' @click="edit(scope.row.deviceInfoId)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.deviceInfoId)">删除</el-button>
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
      
      AddModal: AddModal,
      Operation,
      
      EditModal,
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
          parentNames: ''
        },
        coordinateArrayVo: [],
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
      await this.webapi({
        url: '/system/api/dictionaryType/queryDictionaryByDictionaryTypeCodeArray',
        data: {
          dictionaryTypeCodeArray: [dictionary.device_type.code, dictionary.system.code, dictionary.fire_system.code, dictionary.security_system.code]
        }
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          
          data.forEach(item => {
            if (item.dictionaryTypeCode === dictionary.device_type.code) {
              this.deviceTypeChange(item.dictionaryTypeListValueList)
            } else if (item.dictionaryTypeCode === dictionary.system.code) {
              this.systemChange(item.dictionaryTypeListValueList)
            } else if (item.dictionaryTypeCode === dictionary.fire_system.code) {
              console.log(item.dictionaryTypeCode, item.dictionaryTypeListValueList)
              this.fireSystemSet(item.dictionaryTypeListValueList)
            } else if (item.dictionaryTypeCode === dictionary.security_system.code) {
              this.securitySystemSet(item.dictionaryTypeListValueList)
            }
          })
        }
      })
      await this.webapi({
        url: '/system/api/transportDevice/getAllTransport'
      }).then(res => {
        const { resultCode, data, resultMessage } = res
        if (resultCode === code.CODE_SUCCESS) {
          this.transportChange(data)
        }
      })
    },
    methods: {
      ...mapMutations([
        
        'EditVisibleChange',
        'tableCheckChange',
        'deviceTypeChange',
        'systemChange',
        'fireSystemSet',
        'securitySystemSet',
        'transportChange'
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
          url: '/system/api/device/getDeviceInfoList',
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
          url: '/system/api/device/delDeviceInfo',
          data: {
            deviceInfoId: InfoId
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
    computed: {},
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
