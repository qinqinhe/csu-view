<template>
  <div class="modal-dialog">
    <el-dialog
      title="视频监控"
      :visible="detailVisible"
      width="600px"
      :modal-append-to-body='false'
      class="video-dialog"
      @close='closeVisible'
    >    
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
      
        <section class="dialog-from-content" v-if='detailVisible'>
          <video poster="//smvideo.duowan.com/video_cover/14189/1.jpg" id='videoPlay' autoplay>
            <source src="//smvideo.duowan.com/video_upload/14189.mp4" type="video/mp4">
          </video>
          <section
            class="video-dialog-icon flex"
            :class="{'videoIconVisiblle': !videoArrt.paused}"
            @click='play("videoPlay")'
          >
            <i class="iconfont iconzanting" v-if='videoArrt.paused'/>
            <i class="iconfont iconkaishibofang" v-else/>
          </section>
        </section>
      </el-form>
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
          src: '',
          paused: true
        }
      }
    },
    components: {},
    mounted () {
      this.videoArrt.paused = true
      
    },
    updated () {
      
      
      
      
      
      
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
      closeVisible () {
        this.detailVisibleChange(false)
        this.videoArrt.paused = false
        
      }
    }
    
    
    
    
    
    
    
    
    
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .video-dialog {
    .dialog-from-content {
      display: flex;
      align-items: center;
      position: relative;
      background-color: rgba(0, 0, 0, .8);

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

      .videoIconVisiblle {
        opacity: 1;
      }
    }
  }
</style>
