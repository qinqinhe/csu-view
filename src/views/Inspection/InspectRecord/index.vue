<template>
  <div class="h100 body-main flex">
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
          @size-change="paginationSizeChange"
          @current-change="paginationCurrentChange"
          :current-page.sync="pagination.pageCurrent"
          :page-sizes="[1, 10, 50, 100]"
          :page-size="pagination.pageRows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </section>
    </section>
    <detail-modal/>
    <picture-viewer
      :list='pictureList'
      :visible='pictureStatus'
      @close='pictureStatusUpdate'
      :currentIndex='current'
    />
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import ConditionsForm from './components/ConditionsForm'
  import MainTable from './components/MainTable'
  import DetailModal from './components/DetailModal'

  export default {
    data () {
      return {}
    },
    components: {
      ConditionsForm,
      MainTable,
      DetailModal
    },
    mounted () {

    },
    computed: {
      ...mapState({
        pagination: state => state.inspectRecord.pagination,
        pictureList: state => state.inspectRecord.picture.list,
        pictureStatus: state => state.inspectRecord.picture.status,
        current: state => state.inspectRecord.picture.current
      })
    },
    methods: {
      ...mapActions('inspectRecord', [
        'paginationSizeChange',
        'paginationCurrentChange',
        'pictureStatusUpdate'
      ])
    },
    watch: {
      pictureStatus: function (val) {
        console.log(val)
      }
    }
  }
</script>
<style scoped lang='scss'>
  .body-main {
    position: relative;
  }
</style>
