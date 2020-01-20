<template>
  <div class="mB15P">
		<el-button type="danger" size="mini" @click='delDateBatchOperation'>删除</el-button>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { code } from '@/config/wildcard'
	export default {
		props: {
		},
		data() {
			return {
				
			}
		},
		watch: {
		},
		methods: {
			...mapActions('showroomReserveApproval', [
				'delDateBatchOperation'
			])
    }
	}
</script>
<style lang="scss" rel="stylesheet/scss">
</style>