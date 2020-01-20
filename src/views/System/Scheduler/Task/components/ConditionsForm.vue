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
  computed: {
    ...mapState("scheduler", ["searchForm"])
  },
  methods: {
    ...mapActions("scheduler", ["queryJobList", "resetSearchForm"])
  }
};
</script>