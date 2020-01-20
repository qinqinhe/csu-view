<template>
  <div class="video-con flex">
    <Breadcrumb :customize='customize' v-if='this.customize.length'/>
    <section class="main-table-con">
      <ul class='flex room-list'>
        <li v-for='(item,index) in 10' :key='index' @click='detailVisibleUpdate(true)'>
          <section class="video-show wi he">
            <video poster="//smvideo.duowan.com/video_cover/14189/1.jpg" class="wi he">
              <source src="//smvideo.duowan.com/video_upload/14189.mp4" type="video/mp4">
            </video>
            <div class="video-play">
              <i class="iconfont iconkaishibofang"/>
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
  </div>
</template>

<script>
  import { code, local } from '@/config/wildcard'
  import { mapMutations, mapState } from 'vuex'
  
  import action from '../action'
  import store from '../store'

  const state = {
    detailVisible: () => action.state.detailVisible
  }
  const mapAction = {
    detailVisibleUpdate: store.detailVisibleUpdate,
    videoListVidibleUpdate: store.videoListVidibleUpdate
  }
  export default {
    data () {
      return {
        pagination: {
          pageCurrent: 1,
          pageRows: 10,
          total: 0
        },
        supplement: [
          { route: '#', text: '视频列表' }
        ],
        customize: []
      }
    },
    components: {
      
    },
    methods: {
      ...mapAction,
      handleSizeChange (val) {
        this.pagination.pageRows = val
        this.inquiry()
      },
      handleCurrentChange (val) {
        this.pagination.pageCurrent = val
        this.inquiry()
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
                _this.videoListVidibleUpdate(false)
              } else {
                _this.$router.push(item.path)
              }
            }
          })
        }
        list.push({ route: '', text: '视频列表' })
        this.customize = list
      }
    },
    computed: {
      ...state
    },
    mounted () {
      this.customizeSet()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .video-con {
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    border-left: 20px solid #f5f7f9;
    flex-direction: column;

    .main-table-con {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      margin: 20px;

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
    }
  }
</style>
