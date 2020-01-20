<template>
  <div class="h100 body-main flex">
    <section class="main-data">
      <Breadcrumb/>
      <section class="main-from">
        <conditions-form/>
      </section>
      <Operation/>
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
    <edit-modal/>
    <detail-modal/>
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import ConditionsForm from './components/ConditionsForm'
  import MainTable from './components/MainTable'
  import EditModal from './components/EditModal'
  import DetailModal from './components/DetailModal'
  import Operation from './components/Operation'

  export default {
    data () {
      return {}
    },
    components: {
      ConditionsForm,
      MainTable,
      EditModal,
      DetailModal,
      Operation
    },
    async created () {
      await this.inquiry()
      await this.students()
    },
    computed: {
      ...mapState({
        pagination: state => state.showroomReserveRecord.pagination
      })
    },
    methods: {
      ...mapActions('showroomReserveRecord', [
        'paginationSizeChange',
        'paginationCurrentChange',
        'inquiry',
        'students'
      ])
    }
  }
</script>
