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
    <edit-modal/>
    <maintain-modal/>
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import ConditionsForm from './components/ConditionsForm'
  import MainTable from './components/MainTable'
  import EditModal from './components/EditModal'
  import MaintainModal from './components/MaintainModal'

  export default {
    data () {
      return {}
    },
    components: {
      ConditionsForm,
      MainTable,
      EditModal,
      MaintainModal
    },
    async mounted () {
      await this.inquiry()
      await this.feedbackPersonSet()
      await this.dictionary()
      await this.maintaincePersonSet()
    },
    computed: {
      ...mapState({
        pagination: state => state.eventHandle.pagination
      })
    },
    methods: {
      ...mapActions('eventHandle', [
        'paginationSizeChange',
        'paginationCurrentChange',
        'inquiry',
        'feedbackPersonSet',
        'dictionary',
        'maintaincePersonSet'
      ])
    }
  }
</script>
