<template>
  <div class="h100 body-main flex">
    <section class="main-tree">
      <tree-sidebar
        title='所有位置'
        :treelist='palceTree'
        @change='checkChange'
      />
    </section>
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <conditions-form/>
      </section>
      <section class="main-table">
        <section class="main-table-con">
          <main-table/>
        </section>
        <el-pagination
          @size-change="paginationSizeChange()"
          @current-change="paginationCurrentChange"
          :current-page.sync="pagination.pageCurrent"
          :page-sizes="[1, 10, 50, 100]"
          :page-size="pagination.pageRows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </section>
    </section>
    <video-list v-if='videoListVidible'/>
    <detail-modal/>
  </div>
</template>
<script>
  import ConditionsForm from './components/ConditionsForm'
  import VideoList from './components/VideoList'
  import DetailModal from './components/DetailModal'
  
  import { mapState } from 'vuex'
  import MainTable from './components/MainTable'
  import TreeSidebar from '@/components/Tree/TreeSidebar'
  import action from './action'
  import store from './store'

  const state = {
    pagination: () => action.state.pagination,
    period: () => action.state.period,
    palceTree: () => action.state.palceTree,
    videoListVidible: () => action.state.videoListVidible
  }
  const mapAction = {
    info: store.info,
    paginationSizeChange: store.paginationSizeChange,
    paginationCurrentChange: store.paginationCurrentChange,
    checkChange: store.checkChange
  }
  export default {
    data () {
      return {}
    },
    components: {
      ConditionsForm,
      MainTable,
      TreeSidebar,
      VideoList,
      
      DetailModal
    },
    mounted () {
      this.info()
    },
    computed: {
      ...state
    },
    methods: {
      ...mapAction
    },
    watch: {}
  }
</script>
<style scoped>
  .body-main {
    position: relative;
  }
</style>
