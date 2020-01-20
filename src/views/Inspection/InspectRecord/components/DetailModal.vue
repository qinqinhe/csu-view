<template>
  <div class="pseudoPage flex" v-if='visible'>
    <Breadcrumb :customize='customize'/>
    <section class="pseudoPage-content flex">
      <section class="basic">
        <p class="basic-title">基本信息</p>
        <ul>
          <li class="flex">
            <p class="title">巡检名称：</p>
            <p class="text">{{ ruleForm.inspectPlanName }}</p>
          </li>
          <li class="flex">
            <p class="title">巡检开始时间：</p>
            <p class="text">{{ ruleForm.inspectPlanExecuteStartTime }}</p>
          </li>
          <li class="flex">
            <p class="title">巡检结束时间：</p>
            <p class="text">{{ ruleForm.inspectPlanExecuteEndTime }}</p>
          </li>
          <li class="flex">
            <p class="title">巡检地点：</p>
            <p class="text">国重楼</p>
          </li>
          <li class="flex">
            <p class="title">负责人 ：</p>
            <p class="text">{{ ruleForm.planExecutorUserName }}</p>
          </li>
          <li class="flex">
            <p class="title">联系方式：</p>
            <p class="text">132****9568</p>
          </li>
          <li class="flex">
            <p class="title">巡检进度：</p>
            <p class="text">进行中</p>
          </li>
        </ul>
      </section>
      <section class="detailItem flex">
        <p class="detailItem-title">详细信息</p>
        <section class="detailItem-content flex">
          <p class="title">巡检事项:</p>
          <section class="detailItem-content-list">
            <el-table
              :data="ruleForm.inspectEductInfo"
              height='100%'
              border
              tooltip-effect="dark"
            >
              <el-table-column type="index" lable='序号' width="55" align='center'/>
              <el-table-column label="巡检事项" prop='inspectObjectName' align='center'/>
              <el-table-column label="巡检时间" prop='updateTime' align='center'/>
              <el-table-column label="异常图片" align='center' width='200px'>
                <template slot-scope="scope">
                  <ul class="image-list flex" v-if='scope.row.images.length>3'>
                    <li
                      v-for='(item,index) in scope.row.images'
                      :key='index'
                      @click='pictureStatus({pictureList:scope.row.images,current:index})'
                    >
                      <img :src='item' alt='暂无图片'/>
                    </li>
                    <li @click='pictureStatus({pictureList:scope.row.images})'>
                      <span>...</span>
                    </li>
                  </ul>
                  <ul class="image-list flex" v-else-if='scope.row.images.length'>
                    <li
                      v-for='(item,index) in scope.row.images'
                      :key='index'
                      @click='pictureStatus({pictureList:scope.row.images,current:index})'
                    >
                      <img :src='item' alt='暂无图片'/>
                    </li>
                  </ul>
                  <span v-else>-</span>
                  <section>
                  </section>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop='' align='center'/>
              <el-table-column label="备注" align='center'>
                <template slot-scope="scope">
                  <span>{{ scope.row.remarks || '-' }}</span>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { local, address } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {
        videoArrt: {
          visible: false,
          src: '',
          paused: false,
          customize: []
        }
      }
    },
    components: {},
    mounted () {
      this.customizeSet()
    },
    computed: {
      ...mapState({
        visible: state => state.inspectRecord.detailDate.visible,
        ruleForm: state => state.inspectRecord.detailDate.ruleForm
      })
    },
    methods: {
      ...mapActions('inspectRecord', [
        'detailDateVisibleUpdate',
        'pictureStatusUpdate',
        'pictureListUpdate',
        'pictureCurrenUpdate'
      ]),
      openVideo (param) {
        this.videoArrt = param
      },
      play (domId) {
        var videoPlay = document.getElementById(domId)
        if (this.videoArrt.paused) {
          videoPlay.pause()
          this.videoArrt.paused = false
        } else {
          videoPlay.play()
          this.videoArrt.paused = true
          const _this = this
          videoPlay.addEventListener('ended', function () {
            _this.videoArrt.paused = false
          })
        }
      },
      customizeSet () {
        const _this = this
        const list = [{ route: '/Home', text: '首页' }]
        const menu = JSON.parse(localStorage.getItem(local.MENU))
        const route = this.$route.matched
        for (let i = 1; i < route.length; i++) {
          const item = route[i]
          const menuItem = menu.filter(items => items.menuInfoId === item.name)[0]
          list.push({
            route: item.path,
            text: menuItem.menuName,
            junp: function () {
              if (i === route.length - 1) {
                _this.detailDateVisibleUpdate({ state: false })
              } else {
                _this.$router.push(item.path)
              }
            }
          })
        }
        list.push({ route: '', text: '巡检详情' })
        this.customize = list
      },
      pictureStatus ({ pictureList, current }) {
        this.pictureStatusUpdate(true)
        this.pictureListUpdate(pictureList)
        this.pictureCurrenUpdate(current)
      }
    },
    beforeDestroy () {
      this.detailDateVisibleUpdate({ state: false })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .pseudoPage {
    .pseudoPage-content {
      flex: 1;

      .basic {
        background: $bg-color-blue;
        width: 400px;
        padding: 30px;

        .basic-title {
          height: 46px;
          line-height: 46px;
          font-size: 18px;
          color: #17233d;
        }

        ul {
          li {
            font-size: 14px;
            line-height: 38px;
          }
        }
      }

      .detailItem {
        flex: 1;
        flex-direction: column;
        margin-left: 20px;
        margin-right: 20px;

        .detailItem-title {
          width: 184px;
          height: 47px;
          line-height: 47px;
          text-indent: 40px;
          font-size: 20px;
          color: #fefefe;
          background-image: url('~@/assets/images/tab-sel.png');
        }

        .detailItem-content {
          background-color: $bg-color-blue;
          flex: 1;
          padding: 20px 0px 20px 20px;
          flex-direction: column;

          .title {
            height: 24px;
            line-height: 24px;
          }

          .detailItem-content-list {
            flex: 1;

            .image-list {
              cursor: pointer;

              li {
                width: 50px;
                height: 60px;
                margin-right: 5px;
                line-height: 60px;

                img {
                  width: 50px;
                  height: 60px;
                  background: rgba(0, 0, 0, .2)
                }
              }
            }
          }
        }
      }
    }
  }
</style>
