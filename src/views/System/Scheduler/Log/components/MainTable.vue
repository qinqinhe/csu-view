<template>
  <el-table
    height="100%"
    border
    tooltip-effect="dark"
    :data="showJobList"
    @selection-change="changeSelection"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column type="index" label="序号" width="60" align="center" />
    <el-table-column label="任务名称" align="center" prop="jobName" />
    <el-table-column label="任务组名" align="center" prop="jobGroup" />
    <el-table-column label="方法名称" align="center" prop="methodName" />
    <el-table-column label="方法参数" align="center" prop="methodParams" />
    <el-table-column label="日志信息" align="center" prop="jobMessage" />
    <el-table-column label="任务状态" align="center">
      <template slot-scope="{row}">
        <div class="form-item-context" v-if="row.showStatus">
          <el-tag size="small" :type="row.showStatus.type">{{row.showStatus.label}}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" align="center" prop="createTime" />
    <el-table-column label="操作" align="center" width="100">
      <template slot-scope="{$index}">
        <el-button
          size="mini"
          type="danger"
          @click="toggleModal({type: 'detailModal', data: jobList[$index]})"
        >详细</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import mixins from "../../mixins";

export default {
  mixins,
  computed: {
    ...mapState("schedulerLog", ["jobList"]),
    showJobList() {
      return this.jobList.map(item => {
        return { ...item, showStatus: this.getStatus(item.status) };
      });
    }
  },
  methods: {
    ...mapActions("schedulerLog", ["queryJobList"]),
    ...mapMutations("schedulerLog", ["toggleModal", "changeSelection"])
  },
  created() {
    this.queryJobList();
  }
};
</script>