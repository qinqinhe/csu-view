<template>
	<div class="operation">
		<el-button type="primary" size="mini" @click="AddVisibleChange(true)">新增</el-button>
		<el-button type="danger" size="mini" @click="delInfo()">批量删除</el-button>
		<el-button type="warning" size="mini" @click="importVisibleChange()">导入</el-button>
	</div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	import { code } from '@/config/wildcard'
	export default {
		props: {
			info: {
				type: Function
			}
		},
		data() {
			return {};
		},
		watch: {},
		methods: {
			...mapMutations([
				
				"AddVisibleChange",
				
				"importVisibleChange"
			]),
			delInfo() {
				if(this.tableCheck.length) {
					const InfoIds = this.tableCheck.map(item => item.showroomInfoId).join(",");					
					this.$confirm('确认删除选中数据', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.delApi(InfoIds)
					})
				} else {
					this.$message({
						type: "warning",
						message: "请选择要操作的数据！"
					});
				}
			},
			delApi(InfoIds) {
				this.webapi({ //管理员批量删除陈列室信息 
					url: "/showroom/api/showroom/delShowrooms",
					data: {
						showroomInfoId: InfoIds
					}
				}).then(res => {
					const {
						resultCode,
						data,
						resultMessage
					} = res;
					if(resultCode === code.CODE_SUCCESS) {
						this.info();
						this.$message({
							type: "success",
							message: "删除成功!"
						});
					} else {
						this.$message({
							type: "warning",
							message: resultMessage
						});
					}
				});
			}
		},
		computed: {
			...mapState({
				tableCheck: state => state.tableCheck
			})
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">

</style>