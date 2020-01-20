<template>
  <el-form :model="searchForm" ref="ruleForm" label-width="95px" size="medium">
    <el-form-item label="任务名称" prop="jobName">
      <el-input
        placeholder="请输入任务名称"
        v-model="searchForm.jobName"
        clearable
        @change="queryJobList"
      />
    </el-form-item>
    <el-form-item label="方法名称" prop="methodName">
      <el-input
        placeholder="请输入方法名称"
        v-model="searchForm.methodName"
        clearable
        @change="queryJobList"
      />
    </el-form-item>
    <el-form-item label="任务状态" prop="status">
      <el-select
        value
        placeholder="请选择任务状态"
        v-model="searchForm.status"
        clearable
        @change="queryJobList"
      >
        <el-option
          v-for="(item,index) in status"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="执行时间">
      <el-date-picker
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="dateRange"
        clearable
      />
    </el-form-item>
    <el-form-item class="flex" label-width="20px" style="width:auto">
      <el-button class="btn-query" size="mini" @click="queryJobList">查询</el-button>
      <el-button class="btn-reset" size="mini" @click="resetSearchForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixins from "../../mixins";

export default {
  mixins,
  data() {
    return {
      dateRange: []
    };
  },
  computed: {
    ...mapState("schedulerLog", ["searchForm"]),
    timeRange: {
      get() {
        const { searchStartTime, searchEndTime } = this.searchForm;
        return [searchStartTime, searchEndTime];
      },
      set(to) {
        !(to instanceof Array) && (to = []);
      }
    }
  },
  methods: {
    ...mapActions("schedulerLog", ["queryJobList", "resetSearchForm"])
  },
  watch: {
    dateRange(to) {
      to || (to = ["", ""]);
      const [searchStartTime, searchEndTime] = to;
      this.searchForm.searchStartTime = searchStartTime;
      this.searchForm.searchEndTime = searchEndTime;
      this.queryJobList()
    }
  }
};
</script>