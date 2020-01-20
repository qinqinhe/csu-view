<template>
  <div class="personalTitle flex">
    <p class="personalTitle-text">个人资料</p>
    <!-- <div class="personalTitle-drow flex">
      <p>收起</p>
      <img src="@/assets/images/drow.png"/>
    </div> -->
  </div>
</template>

<script>
import { code, local } from "@/config/wildcard";
import { mapMutations, mapState } from "vuex";
import action from '../action'
import store from '../store'
export default {
  components: {
  },
  data() {
    return {
     
    };
  },
  components: {
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.personalTitle{
  height: 60px;
  border-bottom: solid 1px #f1f2f7;
  line-height: 60px;
  margin: 0 20px;
  justify-content: space-between;
  .personalTitle-text{

  }
  .personalTitle-drow{
    align-items: center;
    p{
      margin-right: 8px;
    }
    img{
      width: 14px;
      height: 14px;
    }
  }
}
</style>