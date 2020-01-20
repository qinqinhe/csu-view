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
          v-if='period'
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
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import ConditionsForm from './components/ConditionsForm'
  import MainTable from './components/MainTable'
  import EditModal from './components/EditModal'
  import TreeSidebar from '@/components/Tree/TreeSidebar'

  export default {
    data () {
      return {}
    },
    components: {
      ConditionsForm,
      MainTable,
      EditModal,
      TreeSidebar
    },
    async created () {
      this.conditionsFormRuleFormDateSet()
      await this.conditionsPeriodResponse()
      await this.place()
      await this.inquiry()
      await this.students()
    },
    computed: {
      ...mapState({
        pagination: state => state.showroomReserveManage.pagination,
        period: state => state.showroomReserveManage.conditionsForm.period,
        palceTree: state => state.showroomReserveManage.palceTree
      })
    },
    methods: {
      ...mapActions('showroomReserveManage', [
        'paginationSizeChange',
        'paginationCurrentChange',
        'conditionsPeriodResponse',
        'place',
        'inquiry',
        'students',
        'conditionsFormRuleFormDateSet',
        'checkChange'
      ])
    }
  }
</script>
