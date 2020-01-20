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
      <section class="main-table">
        <section class="main-table-con">
          <ul class='flex room-list'>
            <li v-for='(item,index) in 10' :key='index' @click='detailVisibleChange(true)'>
              <section class="video-show wi he">
                <video poster="//smvideo.duowan.com/video_cover/14189/1.jpg" class="wi he">
                  <source src="//smvideo.duowan.com/video_upload/14189.mp4" type="video/mp4">
                </video>
                <div class="video-play">
                  <i class="iconfont iconkaishibofang"></i>
                </div>
              </section>
              <p class="video-name">视屏{{ index }}</p>
            </li>
          </ul>
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
    <detail-modal/>
  </div>
</template>

<script>
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import tree from '@/api/tree'
  import DetailModal from './components/DetailModal'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      TreeSidebar,
      DetailModal
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
        'detailVisibleChange'
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
      headCall: function (msg) {
        const parentIds = this.ruleForm.parentIds.split(',')
        const len = parentIds.length
        this.ruleForm.affiliatedBuilding =
          len > 0 ? parentIds[len - 1] : '0'
        if (msg.placeType === '4' && len === 1) {
          this.ruleForm.affiliatedFloor = 1
        } else {
          this.ruleForm.affiliatedFloor =
            len > 1 ? parentIds[len - 2] : '0'
        }
        this.ruleForm.affiliatedRoom =
          len > 2 ? parentIds[len - 3] : '0'

        this.ruleForm.placeType = msg.placeType
        this.inquiry()
      },
      inquiry () {
        let data = {
          belongSystem: '7857509038833549313',
          belongSubsystem: '7857531464971730944',
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
  


  .main-table-con {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .room-list {
    flex-wrap: wrap;

    li {
      width: 345px;
      height: 313px;
      margin: 0 20px 20px 0;
      cursor: pointer;

      .video-show {
        width: 100%;
        height: 268px;
        overflow: hidden;
        position: relative;

        video {
          background-color: rgba(0, 0, 0, .8);
        }

        .video-play {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-color: rgba(0, 0, 0, .5);
          text-align: center;
          transition: .1s .2s linear;
          opacity: 1;

          &:hover {
            background-color: rgba(0, 0, 0, .1);

            i {
              opacity: .8;
            }
          }

          i {
            font-size: 80px;
            color: #fff;
            line-height: 268px;
            opacity: .8;
            transition-duration: .2s;
          }
        }
      }

      .video-name {
        height: 45px;
        line-height: 45px;
        color: #1e2e52;
        text-align: center;
      }
    }
  }
</style>
