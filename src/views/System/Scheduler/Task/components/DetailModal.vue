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
          <el-form-item label="任务序号：">
            <div class="form-item-context">{{modalData.jobId}}</div>
          </el-form-item>
          <el-form-item label="任务名称：">
            <div class="form-item-context">{{modalData.jobName}}</div>
          </el-form-item>
          <el-form-item label="任务组名：">
            <div class="form-item-context">{{modalData.jobGroup}}</div>
          </el-form-item>
          <el-form-item label="方法名称：">
            <div class="form-item-context">{{modalData.methodName}}</div>
          </el-form-item>
          <el-form-item label="执行表达式：">
            <div class="form-item-context">{{modalData.cronExpression}}</div>
          </el-form-item>
          <el-form-item label="下次执行时间：">
            <div class="form-item-context">{{modalData.nextFireTime}}</div>
          </el-form-item>
          <el-form-item label="执行策略：">
            <div class="form-item-context" v-if="showMisfirePolicy">{{showMisfirePolicy.label}}</div>
          </el-form-item>
          <el-form-item label="并发执行：">
            <div class="form-item-context" v-if="showConcurrent">
              <el-tag size="small" :type="showConcurrent.type">{{showConcurrent.label}}</el-tag>
            </div>
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
    ...mapState("scheduler", ["modalType", "modalData"]),
    dialogVisible: {
      get() {
        return this.modalType === "detailModal";
      },
      set(to) {
        to || this.toggleModal();
      }
    },
    showMisfirePolicy() {
      return this.getMisfirePolicy(this.modalData.misfirePolicy);
    },
    showConcurrent() {
      return this.getConcurrent(this.modalData.concurrent);
    },
    showStatus() {
      return this.getStatus(this.modalData.status);
    }
  },
  methods: {
    ...mapMutations("scheduler", ["toggleModal"])
  }
};
</script>

<style lang="scss" scoped>
.form-item-context {
  line-height: 40px;
}
</style>
