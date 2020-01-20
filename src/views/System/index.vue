<!--<template>
  <div id="System">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
        <p>System</p>
        <router-view/>
  </div>
</template>-->

<template>
	<!-- <div class="h100 posi-re"> -->
		<!-- <p>System</p> -->
		<router-view/>
	<!-- </div> -->
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {}
		},
		mounted() {

		},
		methods: {
			
		}
  }
  


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	
	.over-height {
		height: calc(100% - 8vh);
	}
	
	.pagination {
		position: absolute;
		bottom: 0;
	}
</style>

