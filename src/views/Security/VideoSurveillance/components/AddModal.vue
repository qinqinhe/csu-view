<template>
	<div class="modal-dialog">
		<el-dialog class="dialog-model"
			:visible="AddVisible"
			@close="AddVisibleChange(false)"
			width="660px"
			:modal-append-to-body='false'			
			title="添加设备"
			>
				<el-form
					:model="ruleForm"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="dialog-form fsize14P"
					>
					<section class="dialog-from-content">
						<el-form-item label="传输装置" prop="transportDeviceId">
							<el-select v-model="ruleForm.transportDeviceId" placeholder="请选择传输装置">
									<el-option
										v-for="item in transportSelect"
										:key="item.transportDeviceId"
										:label="item.transportDeviceName"
										:value="item.transportDeviceId"
									></el-option>
								</el-select>
						</el-form-item>
						<el-form-item label="编码" prop="deviceCode">
							<el-input v-model="ruleForm.deviceCode" placeholder="请输入设备编码"/>
						</el-form-item>
						<el-form-item label="名称" prop="deviceName">
							<el-input v-model="ruleForm.deviceName" placeholder="请输入设备名称"/>
						</el-form-item>
						<el-form-item label="生产厂商" prop="deviceFactoryOwner">
							<el-input v-model="ruleForm.deviceFactoryOwner" placeholder="请输入设备生产厂商"/>
						</el-form-item>
						<el-form-item label="生产日期" prop="produceDate">
							<el-date-picker v-model="ruleForm.produceDate" value-format="yyyy-MM-dd" placeholder="选择日期"  :picker-options="pickerOptionsBegin"/>
						
						</el-form-item>
						<el-form-item label="有效至期" prop="warrantyDeadline">
							<el-date-picker v-model="ruleForm.warrantyDeadline" value-format="yyyy-MM-dd" placeholder="选择日期"  :picker-options="pickerOptionsFinish"/>
						</el-form-item>
						<el-form-item label="型号" prop="deviceModel">
							<el-input v-model="ruleForm.deviceModel" placeholder="请输入设备型号"/>
						</el-form-item>
						<el-form-item label="采购人" prop="purchaserName">
							<el-input v-model="ruleForm.purchaserName" placeholder="请输入采购人"/>
						</el-form-item>
						<el-form-item label="采购人电话" prop="purchaserPhone">
							<el-input v-model="ruleForm.purchaserPhone" placeholder="请输入采购人电话" maxlength='11'/>
						</el-form-item>
						<el-form-item label="状态" prop="deviceStatus">
							<el-select v-model="ruleForm.deviceStatus" placeholder="请选择设备状态">
								<el-option
									v-for="item in deviceStatusSelect"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="类型" prop="deviceType">
							<el-select v-model="ruleForm.deviceType" placeholder="请选择设备类型">
								<el-option
									v-for="item in deviceTypeSelect"
									:key="item.dictionaryDataInfoId"
									:label="item.dictionaryValue"
									:value="item.dictionaryDataInfoId"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="正常值" prop="deviceNormalValue">
							<el-input type='number' v-model="ruleForm.deviceNormalValue" placeholder="请输入设备正常值"/>
						</el-form-item>
						<el-form-item label='测量范围' prop="toplimit">
							<el-col :span="11">
								<el-form-item prop="lowerLimit">							
									<el-input type='number' v-model="ruleForm.lowerLimit" placeholder="设备测量范围下限 "/>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="2">-</el-col>						
							<el-col :span="11">
								<el-form-item prop="toplimit">							
									<el-input type='number' v-model="ruleForm.toplimit" placeholder="设备测量范围上限 "/>
								</el-form-item>
							</el-col>
						</el-form-item>
						<el-form-item label="所属大系统" prop="belongSystem">
							<el-select v-model="ruleForm.belongSystem" placeholder="请选择所属大系统">
								<el-option
									v-for="item in systemSelect"
									:key="item.dictionaryDataInfoId"
									:label="item.dictionaryValue"
									:value="item.dictionaryDataInfoId"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属子系统" prop="belongSubsystem">
							<el-select v-model="ruleForm.belongSubsystem" placeholder="请选择所属子系统">
								<el-option
									v-for="item in subsystemSelect"
									:key="item.dictionaryDataInfoId"
									:label="item.dictionaryValue"
									:value="item.dictionaryDataInfoId"
								></el-option>
							</el-select>
						</el-form-item>					
						<el-form-item label="位置" prop="belongSubsystem">
							<el-input v-model="ruleForm.palceParentNames" @focus="TreeChooseState=true" placeholder="请选择位置"/>
						</el-form-item>
					</section>
					<el-form-item class="dialog-footer">
						<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			<!-- </div> -->
		</el-dialog>
		<TreeChooseParent
			:dataTree='dataTree'
			:dataNative='dataNative'
			:visible.sync='TreeChooseState'
			:parentIds.sync='ruleForm.palceParentIds'
			:parentNames.sync='ruleForm.palceParentNames'
			:id.sync='ruleForm.id'
			:TreeChooseType='0'
			title='位置选择'
		/>
	</div>
</template>

<script>
	import { code } from '@/config/wildcard'
	import { Message } from 'element-ui'
	import { mapState,mapMutations } from 'vuex'
	import TreeChooseParent from '@/components/Tree/TreeChooseParent'
	import { local } from '@/config/wildcard'
	export default {
		props: {
			dataTree: {
				type: Array,
				default: true
			},
			
			dataNative: {
				type: Array,
				default: true
			},
			info: {
				type: Function
			}
		},
		data() {
			return {
				ruleForm: {
					transportDeviceId: '',
					deviceCode: '',
					deviceName: '',
					deviceFactoryOwner: '',
					produceDate: '',
					warrantyDeadline: '',
					deviceModel: '',
					purchaserName: '',
					purchaserPhone: '',
					deviceStatus: '',
					deviceType: '',
					deviceNormalValue: '',
					toplimit: '',
					lowerLimit: '',
					belongSystem: '',
					belongSubsystem: '',
					affiliatedBuilding: '0',
					affiliatedFloor: '0',
					affiliatedRoom: '0',
					palceParentIds: '',
					palceParentNames: ''
				},
				dataTreeFilter: [],
				deviceStatusSelect: [
					{
						value: "1",
						label: "正常"
					},
					{
						value: "0",
						label: "异常"
					},
				],
				
				rules: {
					deviceCode: [
						{ required: true, message: '请输入设备编码', trigger: 'blur' }
					],
					deviceName: [
						{ required: true, message: '请输入设备名称', trigger: 'blur' }
					],
					deviceFactoryOwner: [
						{ required: true, message: '请输入设备生产厂商', trigger: 'blur' }
					],
					produceDate: [
						{ required: true, message: '请输入设备生产日期', trigger: 'blur' }
					],
					warrantyDeadline: [
						{ required: true, message: '请输入设备有效至期', trigger: 'blur' }
					],
					deviceModel: [
						{ required: true, message: '请输入设备型号', trigger: 'blur' }
					],
					purchaserName: [
						{ required: true, message: '请输入采购人姓名', trigger: 'blur' }
					],
					purchaserPhone: [
						{ required: true, message: '请输入采购人电话号码', trigger: 'blur' },
						{ trigger: 'blur', validator: (rule, value, callback) => {
								const reg = /^1\d{10}/
								if (reg.test(value)) {
									callback()
								} else {
									callback(new Error('请输入正确的电话号码格式'));
								}
							}
						}
					],
					deviceStatus: [
						{ required: true, message: '请选择设备状态', trigger: 'change' }
					],
					deviceType: [
						{ required: true, message: '请选择设备类型', trigger: 'change' }
					],
					deviceNormalValue: [
						{ required: true, message: '请输入设备正常值', trigger: 'blur' }
					],
					toplimit: [
						{ required: true, message: '请输入设备测量范围上限', trigger: 'blur' },
						{ trigger: 'blur', validator: (rule, value, callback) => {
								if (this.ruleForm.lowerLimit.length > 0 && value < this.ruleForm.lowerLimit) {
									callback(new Error('测量范围上线不能小于下线'));
								} else {
									callback()
								}
							}
						}
					],
					lowerLimit: [
						{ required: true, message: '请输入设备测量范围下限', trigger: 'blur' },
						{ trigger: 'blur', validator: (rule, value, callback) => {
								if (this.ruleForm.toplimit.length > 0 && value > this.ruleForm.toplimit) {
									callback(new Error('测量范围上线不能小于下线'));
								} else {
									callback()
								}
							}
						}
					],
					belongSystem: [
						{ required: true, message: '请输入所属大系统', trigger: 'change' }
					],
					belongSubsystem: [
						{ required: true, message: '请输入所属子系统', trigger: 'change' }
					],
					palceParentNames: [
						{ required: true, message: '请选择位置', trigger: 'change' }
					]
				},
				TreeChooseState: false,
			}
		},
		components: {
			TreeChooseParent
		},
		computed: {			
			...mapState({
				AddVisible: state => state.menu.AddVisible,
				deviceTypeSelect: state => state.deviceType,
				systemSelect: state => state.system,
				subsystemSelect: state => state.subsystem,
				transportSelect: state => state.transport
			}),
			pickerOptionsBegin () {
				return {
					disabledDate: (time) => {
						
						const curDate = Date.now()
						if(this.ruleForm.warrantyDeadline) {
							return (time.getTime() > curDate) || (time.getTime() > new Date(this.ruleForm.warrantyDeadline).getTime())
						} else{
							return (time.getTime() > curDate)
						}
					}
				}
			},
			pickerOptionsFinish () {
				return {
					disabledDate: (time) => {
						const curDate = Date.now()
						if(this.ruleForm.produceDate) {
							return (time.getTime() < new Date(this.ruleForm.produceDate).getTime())
						} else{
							
							return false
						}
					}
				}
			}
		},
		mounted () {
		},
		watch: {
			'ruleForm.placeType': function (val) {
				this.dataTreeFilter = []
				const dataTree = JSON.parse(JSON.stringify(this.dataTree.filter(item=>item.placeType !== '4')))
				if (val === '3' || val === '2') {					
					this.parentName = ''
					this.parentIds = ''
					dataTree.forEach(item=>{
						if (item.children && val !== '2') {
							item.children.forEach(items => {
								delete items.children
							})
						} else {
							delete item.children
						}
						this.dataTreeFilter.push(item)
					})

				} else {					
					this.parentName = ''
					this.parentIds = '0'
				}
			}
		},
		methods: {
			
			...mapMutations([
				
				'AddVisibleChange'
			]),
			
			
			
				
			
			
			
			
			
			
			
			
			
      
      
      
      
      
      
      
			
      
			
			
			
			addMenu () {
				const parentIds = this.ruleForm.palceParentIds.split(",");
      	const len = parentIds.length;
				this.ruleForm.affiliatedBuilding =
          len > 0 ? parentIds[len - 1] : "0";
          
          
          
            this.ruleForm.affiliatedFloor =
              len > 1 ? parentIds[len - 2] : "0";
          
				this.ruleForm.affiliatedRoom =
					len > 2 ? parentIds[len - 3] : "0";
					
					console.log(this.ruleForm)
				this.webapi({
					url: '/system/api/device/addDeviceInfo ',
					data: {
						...this.ruleForm
					}
				})
				.then(res=>{
					const { resultCode, resultMessage } = res
					if (resultCode === code.CODE_SUCCESS) {
						this.info()
						Message({
							message: resultMessage
						})
						this.resetForm('ruleForm')
						this.AddVisibleChange(false)

					}
				})
			},
			
			 submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						this.addMenu()
          } else {
            return false;
          }
        })
			},
			
      resetForm(formName) {
        this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import "@/assets/css/model.scss";
	.line{
		text-align: center;
	}
	.dialog-model {
		.dialog-form {
			div {
				overflow: hidden;
				margin-bottom: 5px;
				span:first-child {
					width: 100px;
					height: 24px;
					float: left;
					line-height: 28px;
					text-align: right;
					padding-right: 25px;
					text-align: justify;
					display: inline-block;
					vertical-align: top;
					i {
						display: inline-block;
						width: 100%;
						height: 0;
					}
				}
				span:last-child {
					width: calc(100% - 126px);
					float: right;
					input {
						width: 100%;
					}
				}
				.form-radio {
					line-height: 40px;
				}
			}
		}
	}
	
</style>