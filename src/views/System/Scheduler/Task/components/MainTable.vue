<template>
  <el-table
    :data="jobList"
    height="100%"
    border
    tooltip-effect="dark"
    @selection-change="changeSelection"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column type="index" label="序号" width="60" align="center" />
    <el-table-column label="任务名称" align="center" prop="jobName" />
    <el-table-column label="任务组名" align="center" prop="jobGroup" />
    <el-table-column label="方法名称" align="center" prop="methodName" />
    <el-table-column label="方法参数" align="center" prop="methodParams" />
    <el-table-column label="执行表达式" align="center" prop="cronExpression" />
    <el-table-column label="任务状态" align="center">
      <span slot-scope="{row}" @click.stop="statusChange(row)" class="switch-mask">
        <el-switch v-model="row.status" active-value="1" inactive-value="0" @click.stop />
      </span>
    </el-table-column>
    <el-table-column label="创建时间" align="center" prop="createTime" />
    <el-table-column label="操作" align="center" width="180">
      <template slot-scope="{row}">
        <el-button size="mini" type="primary" @click="runJob(row.jobId)">执行</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="toggleModal({type: 'detailModal', data: row})"
        >详细</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("scheduler", ["jobList"])
  },
  methods: {
    ...mapActions("scheduler", ["queryJobList", "runJob", "changeStatus"]),
    ...mapMutations("scheduler", ["toggleModal", "changeSelection"]),
    statusChange(data) {
      const status = data.status === "1" ? "0" : "1";
      this.changeStatus({
        status,
        jobId: data.jobId
      }).then(() => {
        data.status = status;
      });
    }
  },
  created() {
    this.queryJobList();
  }
};
</script>

<style lang="scss" lang="scss">
.switch-mask {
  position: relative;
  display: inline-block;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>