<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      width="660px"
      :title="modalType === 'editModal' ? '修改任务' : '添加任务'"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <el-form
        :model="modalForm"
        :rules="modalFormRules"
        class="dialog-form"
        label-width="120px"
        ref="form"
      >
        <div class="dialog-from-content">
          <el-form-item label="任务名称：" prop="jobName">
            <el-input v-model="modalForm.jobName" />
          </el-form-item>
          <el-form-item label="任务组名：" prop="jobGroup">
            <el-input v-model="modalForm.jobGroup" />
          </el-form-item>
          <el-form-item label="方法名称：" prop="methodName">
            <el-input v-model="modalForm.methodName" />
          </el-form-item>
          <el-form-item label="方法参数：" prop="methodParams">
            <el-input v-model="modalForm.methodParams" />
          </el-form-item>
          <el-form-item label="cron表达式：" prop="cronExpression">
            <el-popover v-model="cronPopover">
              <cron @change="changeCron" @close="cronPopover=false" class="cron" />
              <el-input
                slot="reference"
                @click="cronPopover=true"
                v-model="modalForm.cronExpression"
                placeholder="请输入定时策略"
              />
            </el-popover>
          </el-form-item>
          <el-form-item label="执行策略：" prop="misfirePolicy">
            <el-radio-group v-model="modalForm.misfirePolicy">
              <el-radio
                v-for="(item,index) in misfirePolicy"
                :label="item.value"
                :key="index"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="并发执行：" prop="concurrent">
            <el-radio-group v-model="modalForm.concurrent">
              <el-radio
                v-for="(item,index) in concurrent"
                :label="item.value"
                :key="index"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态：" v-if="modalType === 'editModal'">
            <el-radio-group v-model="modalForm.status">
              <el-radio
                v-for="(item,index) in status"
                :label="item.value"
                :key="index"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" v-model="modalForm.remark" />
          </el-form-item>
        </div>
        <el-form-item class="dialog-footer">
          <el-button
            type="primary"
            @click="saveForm($refs['form'])"
          >{{modalType === 'editModal' ? '立即修改' : '立即添加'}}</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { cron } from "vue-cron";
import { mapState, mapActions, mapMutations } from "vuex";
import mixins from "../../mixins";

export default {
  mixins,
  components: {
    cron
  },
  data() {
    return {
      cronPopover: false
    };
  },
  computed: {
    ...mapState("scheduler", ["modalType", "modalForm", "modalFormRules"]),
    dialogVisible: {
      get() {
        return ["addModal", "editModal"].indexOf(this.modalType) >= 0;
      },
      set(to) {
        to || this.toggleModal();
      }
    }
  },
  methods: {
    ...mapActions("scheduler", ["saveForm", "resetForm"]),
    ...mapMutations("scheduler", ["toggleModal"]),
    changeCron(value) {
      this.modalForm.cronExpression = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-radio {
  line-height: 40px;
}
.cron {
  >>> .el-tabs__content {
    max-height: 262px;
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
