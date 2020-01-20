<template>
  <section
    class="video-plugin"
    :style="{width: width + 'px',height: height + 'px'}"
    v-loading="loading"
    element-loading-text="正在初始化视频控件"
  >
    <div :id="id" class="video-plugin-control"/>
  </section>
</template>

<script>
  import VideoPlugin from './video'

  export default {
    name: 'index',
    props: {
      // 播放器宽度
      width: Number,
      // 播放器高度
      height: Number,
      // 控制点编号
      cameraIndexCode: String,
      // 是否开启预览
      preview: false
    },
    data () {
      return {
        // 播放器ID
        id: VideoPlugin.createVideoId(),
        // 是否初始化完成
        loading: true,
        // 播放器实例
        videoInstance: null
      }
    },
    mounted () {
      this.videoInstance = new VideoPlugin({
        id: this.id,
        width: this.width,
        height: this.height,
        onInit: () => {
          this.videoInstance.startPreview(this.cameraIndexCode)
          this.loading = false
        }
      })
      this.videoInstance.initPlugin()
    },
    watch: {
      preview (to) {
        if (to) {
          this.videoInstance.initPlugin()
        } else {
          this.videoInstance.close()
          this.loading = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .video-plugin {
    position: relative;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .4);
      cursor: pointer;

      .iconfont {
        font-size: 80px;
        color: rgba(255, 255, 255, .8);
      }
    }
  }
</style>
