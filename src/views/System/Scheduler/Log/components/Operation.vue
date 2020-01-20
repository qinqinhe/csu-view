<template>
  <div class="operation">
    <el-button
      type="danger"
      size="mini"
      :disabled="selection.length === 0"
      @click="deleteSectionJobLog"
    >删除</el-button>
    <el-button type="danger" size="mini" @click="clearJobLog">清空</el-button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("schedulerLog", ["selection"])
  },
  methods: {
    ...mapActions("schedulerLog", ["deleteSectionJobLog", "clearJobLog"])
  }
};
</script>