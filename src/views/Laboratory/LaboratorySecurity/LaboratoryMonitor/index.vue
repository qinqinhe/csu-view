<template>
  <div class="h100 body-main flex">
    <!-- <section class="main-tree">
      <Tree
        :contentTrees="dataTree"
        treesTitle="选择楼层"
        :clickType='false'
        :dataNative='data'
        :parentIds.sync="ruleForm.parentIds"
        :parentNames.sync="ruleForm.parentNames"
        v-on:headCallBack="headCall"
        ref='treeLeft' />
    </section> -->
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
            <li v-for='(item,index) in tableData' :key='index'>
              <div class="room" @click='detailVisibleChange(true)'>
                <!-- <section class="room-main">
                </section> -->
                <section class="flex room-title">
                  <p class="room-name">{{ item.laboratoryName }}</p>
                  <p class="green room-state">未使用</p>
                </section>
                <section class="room-device">
                  <p class="room-device-rate">设备完好率</p>
                  <ul class="flex" v-if='item.statisticType.length'>
                    <li class="water" v-for='(items,indexs) in item.statisticType' :key='indexs' v-if='items==="1"'>
                      <div class="room-device-icon">
                        <i class="iconfont iconny4"/>
                      </div>
                      <div class="progress">
                        <p :style='{width: "80%"}'/>
                      </div>
                      <p class="room-device-detal-rate">90%</p>
                    </li>
                    <li class="electricity" v-else-if='items==="2"'>
                      <div class="room-device-icon">
                        <i class="iconfont icondian"/>
                      </div>
                      <div class="progress">
                        <p :style='{width: "80%"}'/>
                      </div>
                      <p class="room-device-detal-rate">90%</p>
                    </li>
                    <li class="gas" v-else-if='items==="3"'>
                      <div class="room-device-icon">
                        <i class="iconfont iconqiti"/>
                      </div>
                      <div class="progress">
                        <p :style='{width: "80%"}'/>
                      </div>
                      <p class="room-device-detal-rate">90%</p>
                    </li>
                    <li class="smoke" v-else-if='items==="4"'>
                      <div class="room-device-icon">
                        <i class="iconfont iconyangan"/>
                      </div>
                      <div class="progress">
                        <p :style='{width: "80%"}'/>
                      </div>
                      <p class="room-device-detal-rate">90%</p>
                    </li>
                    <li class="monitor" v-else-if='items==="5"'>
                      <div class="room-device-icon">
                        <i class="iconfont iconshipin"/>
                      </div>
                      <div class="progress">
                        <p :style='{width: "80%"}'/>
                      </div>
                      <p class="room-device-detal-rate">90%</p>
                    </li>
                  </ul>
                  <p v-else class="room-device-null">暂无设备！</p>
                </section>
                <section class="room-info flex">
                  <p class="room-info-name">管理员：{{ item.responsibleUserName }}</p>
                  <p class="room-info-phoneNumber">联系方式：<span>{{ item.laboratoryAdminPhone }}</span></p>
                </section>
              </div>
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
  import Tree from '@/components/Tree/tree'
  import tree from '@/api/tree'
  import DetailModal from './components/DetailModal'
  import { code, dictionary } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      Tree: Tree,
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
          affiliatedBuilding: '0',
          affiliatedFloor: '0',
          affiliatedRoom: '0'
        },
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
      inquiry () {
        let data = {
          belongSystem: '7857509038833549313',
          belongSubsystem: '7857531464971730948',
          pageCurrent: this.pagination.pageCurrent,
          pageRows: this.pagination.pageRows
        }
        this.webapi({
          url: '/laboratory/api/laboratory/getLaboratoryDevices',
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
              item.statisticType = item.statisticType ? item.statisticType.split(',') : []
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
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  


  .main-table-con {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .table {
    width: calc(100% + 30px);
    min-height: 430px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .room-list {
    flex-wrap: wrap;    
    .room {
      width: 315px;
      height: 200px;
      padding: 0 20px;
      margin-right: 10px;
      background: url('~@/assets/images/laboratory_card.png');
      &:hover{
        // transform: scale(1.1);
      }
      .room-title {
        font-size: 15px;
        justify-content: space-between;
        padding-top: 24px;
        line-height: 15px;

        .room-name {
          color: #fff;
        }

        .room-state {
          font-size: 14px;
        }
      }

      .room-device {
        height: 118px;

        .room-device-rate {
          font-size: 12px;
          line-height: 12px;
          padding: 11px 0 16px 0;
          color: #fff;
        }

        ul {
          li {
            width: 50px;
            height: 78px;
            text-align: center;
            margin-right: 15px;

            .room-device-icon {
              width: 34px;
              height: 34px;
              border-radius: 50%;
              line-height: 34px;
              margin: 0 auto 7px;
              background-color: rgba(102, 102, 102, .4);

              i {
                font-size: 20px;
              }
            }

            .progress {
              width: 48px;
              height: 5px;
              border-radius: 2px;
              margin-bottom: 5px;

              p {
                height: 100%;
              }
            }

            .room-device-detal-rate {
              font-size: 12px;
            }
          }

          .water {
            .room-device-icon {
              @include laboratory-device-border(#00e4ff);
            }

            @include laboratory-device-color(#00e4ff);

            .progress {
              @include laboratory-device-border(#00e4ff);

              p {
                @include laboratory-device-bgColor(#00e4ff);
              }
            }
          }

          .electricity {
            .room-device-icon {
              @include laboratory-device-border(#fcff00);
            }

            @include laboratory-device-color(#fcff00);

            .progress {
              @include laboratory-device-border(#fcff00);

              p {
                @include laboratory-device-bgColor(#fcff00);
              }
            }
          }

          .gas {
            .room-device-icon {
              @include laboratory-device-border(#ffffff);
            }

            @include laboratory-device-color(#ffffff);

            .progress {
              @include laboratory-device-border(#ffffff);

              p {
                @include laboratory-device-bgColor(#ffffff);
              }
            }
          }

          .smoke {
            .room-device-icon {
              @include laboratory-device-border(#17c67a);
            }

            @include laboratory-device-color(#17c67a);

            .progress {
              @include laboratory-device-border(#17c67a);

              p {
                @include laboratory-device-bgColor(#17c67a);
              }
            }
          }

          .monitor {
            .room-device-icon {
              @include laboratory-device-border(#ffa800);
            }

            @include laboratory-device-color(#ffa800);

            .progress {
              @include laboratory-device-border(#ffa800);

              p {
                @include laboratory-device-bgColor(#ffa800);
              }
            }
          }
        }

        .room-device-null {
          color: #fff;
          font-size: 14px;
        }
      }

      .room-info {
        color: #fff;
        font-size: 12px;
        line-height: 12px;

        .room-info-name {
          
          margin-right: 10px;
        }

        .room-info-phoneNumber {
          span {
            color: #3c4e72;
          }
        }
      }
    }
  }
</style>
