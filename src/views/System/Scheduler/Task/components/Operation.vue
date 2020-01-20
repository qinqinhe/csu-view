<template>
  <div class="operation">
    <el-button type="primary" size="mini" @click="toggleModal({type: 'addModal'})">新增</el-button>
    <el-button
      type="success"
      size="mini"
      @click="toggleModal({type: 'editModal',data: selection[0]})"
      :disabled="selection.length !== 1"
    >修改</el-button>
    <el-button
      type="danger"
      size="mini"
      :disabled="selection.length === 0"
      @click="deleteSectionJob"
    >删除</el-button>
    <el-button type="info" size="mini" @click="$router.push({path: '/System/Scheduler/Log'})">日志</el-button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("scheduler", ["selection"])
  },
  methods: {
    ...mapActions("scheduler", ["deleteSectionJob"]),
    ...mapMutations("scheduler", ["toggleModal"])
  }
};
</script>