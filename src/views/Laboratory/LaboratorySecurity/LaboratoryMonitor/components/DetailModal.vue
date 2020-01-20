<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="detailVisible"
      @close="detailVisibleChange(false)"
      width="1200px"
      :modal-append-to-body='false'
      title="实验室实时监测详情"
    >
      <section class="dialog-from-content flex">
        <section class="basic">
          <p class="basic-title">基本信息</p>
          <ul>
            <li class="flex">
              <p class="title">实验室：</p>
              <p class="text">201</p>
            </li>
            <li class="flex">
              <p class="title">实验室负责人：</p>
              <p class="text">李某某</p>
            </li>
            <li class="flex">
              <p class="title">联系方式：</p>
              <p class="text">151****0199</p>
            </li>
            <li class="flex">
              <p class="title">实验室位置：</p>
              <p class="text">三一楼二楼201</p>
            </li>
            <li class="flex">
              <p class="title">设备数量：</p>
              <p class="text">10</p>
            </li>
            <li class="flex">
              <p class="title">上次巡检时间：</p>
              <p class="text">2019-10-10</p>
            </li>
            <li class="flex">
              <p class="title">当前状态：</p>
              <p class="text">未使用</p>
            </li>
          </ul>
        </section>
        <section class="room-detall flex">
          <p class="room-detall-title">设备详情</p>
          <section class="room-device">
            <ul class="flex room-device-list">
              <li class="room-device-detail">
                <p class="room-device-detail-title">水</p>
                <ul class="room-device-item">
                  <li class="flex">
                    <p>水压：</p>
                    <p>10pa</p>
                  </li>
                  <li class="flex">
                    <p>流量：</p>
                    <p>10L/s</p>
                  </li>
                  <li class="flex">
                    <p>液位：</p>
                    <p>10m</p>
                  </li>
                </ul>
              </li>
              <li class="room-device-detail">
                <p class="room-device-detail-title">电</p>
                <ul class="room-device-item">
                  <li class="flex">
                    <p>电流：</p>
                    <p>10mA</p>
                  </li>
                  <li class="flex">
                    <p>电压：</p>
                    <p>10v</p>
                  </li>
                  <li class="flex">
                    <p>功率：</p>
                    <p>10w</p>
                  </li>
                  <li class="flex">
                    <p>电量：</p>
                    <p>10kwh</p>
                  </li>
                  <li class="flex">
                    <p>温度：</p>
                    <p>10℃</p>
                  </li>
                </ul>
              </li>
              <li class="room-device-detail">
                <p class="room-device-detail-title">气</p>
                <ul class="room-device-item">
                  <li class="flex">
                    <p>氧气浓度：</p>
                    <p>1000ppm</p>
                  </li>
                  <li class="flex">
                    <p>甲烷爆炸下限：</p>
                    <p>10%LEL</p>
                  </li>
                  <li class="flex">
                    <p>乙炔爆炸下限：</p>
                    <p>10%LEL</p>
                  </li>
                  <li class="flex">
                    <p>乙炔爆炸下限：</p>
                    <p>10%LEL</p>
                  </li>
                </ul>
              </li>
              <li class="room-device-detail">
                <p class="room-device-detail-title">其他</p>
                <ul class="room-device-item">
                  <li class="flex">
                    <p>风量：</p>
                    <p>10m³/h</p>
                  </li>
                  <li class="flex">
                    <p>烟感：</p>
                    <p>正常</p>
                  </li>
                  <li class="flex">
                    <p>门禁：</p>
                    <p>开启</p>
                  </li>
                </ul>
              </li>
              <li class="room-device-detail">
                <p class="room-device-detail-title">监控</p>
                <ul class="room-device-itemMonitor flex">
                  <li v-for='items in 3' :key='items'>
                    <div class="play-icon">
                      <i class="iconfont iconzanting"/>
                    </div>
                    <video
                      poster="//smvideo.duowan.com/video_cover/14189/1.jpg"
                      @click="openVideo({visible: true,paused:false,src:'//smvideo.duowan.com/video_upload/14189.mp4'})"
                    >
                      <source src="//smvideo.duowan.com/video_upload/14189.mp4" type="video/mp4">
                    </video>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </section>
      </section>
      <section class="dialog-footer">
        <el-button type="primary" @click="detailVisibleChange(false)">确定</el-button>
      </section>
    </el-dialog>
    <el-dialog
      title="实时监控"
      :visible.sync="videoArrt.visible"
      width="600px"
      :modal-append-to-body='false'
      class="video-dialog"
    >
      <section class="dialog-from-content">
        <video poster="//smvideo.duowan.com/video_cover/14189/1.jpg" id='videoPlay'>
          <source src="//smvideo.duowan.com/video_upload/14189.mp4" type="video/mp4">
        </video>
        <section class="video-dialog-icon flex" @click='play("videoPlay")'>
          <i class="iconfont iconzanting" v-if='videoArrt.paused'></i>
          <i class="iconfont iconkaishibofang" v-else></i>
        </section>
      </section>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapMutations } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {
        
        videoArrt: {
          visible: false,
          src: '',
          paused: false
        }
      }
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        detailVisible: state => state.detailVisible
      })
    },
    methods: {
      ...mapMutations([
        'detailVisibleChange'
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
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content {
    padding: 0;

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

    .room-detall {
      
      flex: 1;
      flex-direction: column;
      margin-left: 20px;

      .room-detall-title {
        width: 184px;
        height: 47px;
        line-height: 47px;
        text-indent: 40px;
        font-size: 20px;
        color: #fefefe;
        background-image: url('~@/assets/images/tab-sel.png');
      }

      .room-device {
        background-color: $bg-color-blue;
        flex: 1;
        padding: 20px 0px 20px 20px;

        .room-device-list {
          width: 100%;
          height: 100%;
          flex-wrap: wrap;
          overflow-x: hidden;
          overflow-y: auto;

          .room-device-detail {
            width: calc((100% - 180px) / 3);
            height: 220px;
            padding: 20px;
            background: #fff;
            margin: 0 20px 20px 0;

            .room-device-detail-title {
              height: 30px;
              line-height: 30px;
              border-bottom: 1px solid #8e8e8e;
              font-size: 16px;
              color: $font-color-black;
            }

            .room-device-item {
              color: #515a6e;

              li {
                line-height: 35px;
                font-size: 14px;
                justify-content: space-between;
              }
            }

            .room-device-itemMonitor {
              flex-wrap: wrap;
              margin-top: 5px;

              li {
                width: 74px;
                height: 74px;
                position: relative;
                margin: 0 5px 5px 0;

                .play-icon {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  background-color: rgba(0, 0, 0, .2);
                  color: #fff;
                  font-size: 22px;
                  text-align: center;
                  line-height: 74px;
                }

                video {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .video-dialog {
    .dialog-from-content {
      display: flex;
      align-items: center;
      position: relative;

      video {
        height: 100%;
        width: 100%;
      }

      .video-dialog-icon {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .4);
        
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition-duration: .4s;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }

        i {
          font-size: 80px;
          color: rgba(255, 255, 255, .8);
        }
      }
    }
  }
</style>
