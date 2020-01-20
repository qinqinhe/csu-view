<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      width="660px"
      title="任务详细"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <el-form class="dialog-form" label-width="120px">
        <div class="dialog-from-content">
          <el-form-item label="日志序号：">
            <div class="form-item-context">{{modalData.jobLogId}}</div>
          </el-form-item>
          <el-form-item label="任务名称：">
            <div class="form-item-context">{{modalData.jobName}}</div>
          </el-form-item>
          <el-form-item label="任务组名：">
            <div class="form-item-context">{{modalData.jobGroup}}</div>
          </el-form-item>
          <el-form-item label="任务方法：">
            <div class="form-item-context">{{modalData.methodName}}()</div>
          </el-form-item>
          <el-form-item label="日志信息：">
            <div class="form-item-context">{{modalData.jobMessage}}</div>
          </el-form-item>
          <el-form-item label="执行状态：">
            <div class="form-item-context" v-if="showStatus">
              <el-tag size="small" :type="showStatus.type">{{showStatus.label}}</el-tag>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import mixins from "../../mixins";

export default {
  mixins,
  computed: {
    ...mapState("schedulerLog", ["modalType", "modalData"]),
    dialogVisible: {
      get() {
        return this.modalType === "detailModal";
      },
      set(to) {
        to || this.toggleModal();
      }
    },
    showStatus() {
      return this.getStatus(this.modalData.status);
    }
  },
  methods: {
    ...mapMutations("schedulerLog", ["toggleModal"])
  }
};
</script>

<style lang="scss" scoped>
.form-item-context {
  line-height: 40px;
}
</style>