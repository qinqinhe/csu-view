<template>
	<div id="main-header">
		<section >
			<img src='@/assets/images/logo.png' class='logo' />
		</section>
	</div>
</template>

<script>
import { local } from '@/config/wildcard'
export default {
	data() {
		return {

		}
	},
	mounted() {
	
	},
	beforeMount () {
	

	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#main-header{
	height: 75px;
	background-color: #1e2e52;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.logo{
	height: 58px;
	widows: 198px;
	margin-left: 36px;
}
</style>