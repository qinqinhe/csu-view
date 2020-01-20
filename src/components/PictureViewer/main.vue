<template>
  <section class="PictureViewer" :style='{zIndex: zIndex}'>
    <section class="Viewer">
      <img :src="current" :alt='"图片" + subscript'/>
      <section class="">
      </section>
    </section>
    <section class="scroll">
      <ul class="flex">
        <li v-for='(item,index) in list' :key='index' @click='swipe(index)' :class="{current: subscript===index}">
          <img :src='item'/>
        </li>
      </ul>
    </section>
    <section class="close" @click='close'>
      <img src='@/assets/images/close.png' alt=''/>
    </section>
  </section>
</template>
<script>
  import { local } from '@/config/wildcard'

  export default {
    props: {
      zIndex: {
        type: Number,
        default: 1
      },
      list: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        current: {
          src: ''
        },
        subscript: 0
      }
    },
    methods: {
      swipe (index) {
        this.subscript = index
        this.current = this.list[index]
      },
      close () {
        this.$emit('close', false)
      }
    },
    computed: {},
    mounted () {
      this.subscript = this.currentIndex
      this.current = this.list[this.subscript]
    }
  }
</script>

<style lang="scss" scoped>
  .PictureViewer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .6);

    .Viewer {
      width: 650px;
      height: 650px;
      text-align: center;
      border-top: 100px solid transparent;
      margin: 0 auto;

      img {
        height: 650px;
        max-width: 650px;
        min-width: 300px;
        background-color: #fff;
      }
    }

    .scroll {
      ul {
        margin: 80px auto 0;
        justify-content: center;

        li {
          width: 120px;
          height: 74px;
          background-color: #fff;
          margin: 0 10px;
          cursor: pointer;
          border: 3px solid #ccc;

          img {
            width: 120px;
            height: 74px;
          }
        }

        .current {
          border: 3px solid #1e2e52;
        }
      }
    }

    .close {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 60px;
      left: 50%;
      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
        margin-left: 325px;
      }
    }
  }
</style>



