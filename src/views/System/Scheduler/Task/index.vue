<template>
  <div class="h100 body-main flex">
    <div class="main-data">
      <Breadcrumb />
      <div class="main-from">
        <ConditionsForm />
      </div>
      <Operation />
      <div class="main-table">
        <div class="main-table-con">
          <MainTable />
          <SaveModal />
          <DetailModal />
        </div>
        <el-pagination
          @current-change="pageCurrentChange"
          :current-page.sync="pagination.pageCurrent"
          :page-sizes="[1, 10, 50, 100]"
          :page-size="pagination.pageRows"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ConditionsForm from "./components/ConditionsForm";
import Operation from "./components/Operation";
import MainTable from "./components/MainTable";
import SaveModal from "./components/SaveModal";
import DetailModal from "./components/DetailModal";

export default {
  name: "Task",
  components: {
    Operation,
    ConditionsForm,
    MainTable,
    SaveModal,
    DetailModal
  },
  computed: {
    ...mapState("scheduler", ["pagination"])
  },
  methods: {
    ...mapActions("scheduler", ["pageCurrentChange"])
  }
};
</script>