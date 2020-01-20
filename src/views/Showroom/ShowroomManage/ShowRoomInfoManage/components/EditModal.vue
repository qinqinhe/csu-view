<template>
	<div class="modal-dialog">
		<el-dialog
			class="dialog-model"
			:visible="EditVisible"
			@close="EditVisibleChange(false)"
			width="660px"
			:modal-append-to-body="false"
			title="编辑陈列室"
			>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="dialog-form fsize14P">										
				<section class="dialog-from-content">
					<el-form-item label="陈列室编码" prop="showroomCode">
						<el-input size="medium" v-model="ruleForm.showroomCode" placeholder="请输入编码" />
					</el-form-item>
					<el-form-item label="陈列室名称" prop="showroomName">
						<el-input size="medium" v-model="ruleForm.showroomName" placeholder="请输入名称" />
					</el-form-item>
					<el-form-item label="陈列室类型" prop="showroomType">
						<el-select size="medium" v-model="ruleForm.showroomType" placeholder="陈列室类型" clearable>
							<el-option
                v-for="(item) in showRoom"
                :key="item.dictionaryDataInfoId"
                :label="item.dictionaryValue"
                :value="item.dictionaryDataInfoId"
              ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="陈列室状态" prop="showroomStatus">
						<el-select size="medium" v-model="ruleForm.showroomStatus" placeholder="陈列室状态" clearable>
							<el-option v-for="(item) in showroomStatusSel" :key="item.label" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="可容纳人数" prop="capacityNum">
						<el-input size="medium" type="number" v-model="ruleForm.capacityNum" placeholder="请输入可容纳人数" />
					</el-form-item>
					<el-form-item label="管理员" prop="showroomAdminUserId">
						<el-select size="medium" v-model="ruleForm.showroomAdminUserId" placeholder="请选择管理员" clearable>
							<el-option v-for="item in user" :key="item.userInfoId" :label="item.userName" :value="item.userInfoId" />
						</el-select>
					</el-form-item>
					<el-form-item label="安全责任人" prop="responsibleUserId">
						<el-select size="medium" v-model="ruleForm.responsibleUserId" placeholder="请选择安全责任人" clearable>
							<el-option v-for="item in user" :key="item.userInfoId" :label="item.userName" :value="item.userInfoId" />
						</el-select>
					</el-form-item>
					<el-form-item label="简介" prop="showroomIntroduction">
						<el-input size="medium" type="textarea" v-model="ruleForm.showroomIntroduction" placeholder="请输入简介" />
					</el-form-item>
					<el-form-item label="安全须知" prop="safetyInstruction">
						<el-input type="textarea" size="medium" v-model="ruleForm.safetyInstruction" placeholder="请输入安全须知" />
					</el-form-item>
					<el-form-item label="备注" prop="remarks">
						<el-input size="medium" type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注" />
					</el-form-item>
					<el-form-item label="位置" prop="parentName">
						<el-input size="medium" type="input" v-model="ruleForm.parentName" @focus="TreeChooseState=true" />
					</el-form-item>
				</section>
				<el-form-item class="dialog-footer">
					<el-button type="primary" @click="submitForm('ruleForm')" size="medium">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')" size="medium">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<TreeChooseParent :dataTree="dataTree" :dataNative="dataNative" :visible="TreeChooseState" v-on:hideDialog="TreeChooseState = false" :parentIds.sync="ruleForm.parentIds" :TreeChooseName.sync="ruleForm.parentName" :id.sync="ruleForm.position" :parentNames.sync="ruleForm.parentName" :TreeChooseType="0" title="菜单选择" />
	</div>
</template>

<script>
	import { Message } from "element-ui";
	import { mapState, mapMutations } from "vuex";
	import TreeChooseParent from "@/components/Tree/TreeChooseParent";
	import { code, local } from "@/config/wildcard";

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
			infoId: {
				type: String
			},
			info: {
				type: Function
			}
		},
		data() {
			return {
				ruleForm: {
					
					showroomInfoId: this.infoId,
					
					showroomCode: "",
					
					showroomName: "",
					
					safetyInstruction: "",
					
					showroomType: "",
					
					showroomStatus: "1",
					
					capacityNum: "",
					
					showroomAdminUserId: "",
					
					showroomAdminUserName: "",
					
					showroomAdminPhone: "",
					
					responsibleUserId: "",
					
					responsibleUserName: "",
					
					showroomIntroduction: "",
					
					createUserId: "",
					
					updateUserId: "",
					
					remarks: "",
					
					affiliatedBuilding: "",
					
					affiliatedFloor: "",
					
					affiliatedRoom: "",
					
					position: "",
					
					parentIds: "",
					
					parentName: ""
				},
				
				showroomTypeSelect: [{
						value: "0",
						label: "目录"
					},
					{
						value: "1",
						label: "菜单"
					}
				],
				showroomStatusSel: [{
						value: "0",
						label: "禁用"
					},
					{
						value: "1",
						label: "启用"
					}
				],
				
				departmentVisible: false,
				
				pickerOptions: {
					disabledDate: time => {
						const curDate = Date.now();
						return time.getTime() > curDate;
					}
				},
				
				rules: {
					showroomCode: [{
						required: true,
						message: "请输入陈列室编码",
						trigger: "blur"
					}],
					showroomName: [{
						required: true,
						message: "请输入陈列室名称",
						trigger: "blur"
					}],
					showroomType: [{
						required: true,
						message: "请选择陈列室类型",
						trigger: "change"
					}],
					showroomStatus: [{
						required: true,
						message: "请选择陈列室状态",
						trigger: "change"
					}],
					capacityNum: [{
						required: true,
						message: "请输入陈列室可容纳人数",
						trigger: "blur"
					}],
					showroomAdminUserId: [{
						required: true,
						message: "请选择管理员",
						trigger: "change"
					}],
					showroomAdminPhone: [{
						required: true,
						message: "请输入管理员电话号码",
						trigger: "blur"
					}],
					parentName: [{
							required: true,
							message: "请选择陈列室位置",
							trigger: "change"
						},
						{
							trigger: "change",
							validator: (rule, value, callback) => {
								const arr = value.split(",");
								if(arr.length === 3) {
									callback();
									this.TreeChooseState = false;
								} else {
									console.log(3);
									callback(new Error("请选择房间"));
								}
							}
						}
					],
					responsibleUserId: [{
						required: true,
						message: "请选择安全负责人",
						trigger: "blur"
					}],
					showroomIntroduction: [{
						required: true,
						message: "请输入陈列室简介",
						trigger: "blur"
					}],
					safetyInstruction: [{
						required: true,
						message: "请输入陈列室须知",
						trigger: "blur"
					}]
				},
				TreeChooseState: false
			};
		},
		components: {
			TreeChooseParent
		},
		mounted() {},
		computed: {
			...mapState({
				EditVisible: state => state.EditVisible,
				user: state => state.dictionary.user,
      showRoom: state => state.showRoom
			})
		},
		methods: {
			...mapMutations([
				
				"EditVisibleChange"
			]),
			
			infoDetail() {
				this.webapi({
					url: `/showroom/api/showroom/getShowroom`,
					data: {
						showroomInfoId: this.infoId
					}
				}).then(res => {
					const {
						resultCode,
						data,
						resultMessage
					} = res;
					if(resultCode === code.CODE_SUCCESS) {
						let ruleForm = this.ruleForm;
						for(let i in ruleForm) {
							(typeof data[i] !== "string" || data[i].length !== 0) &&
							(ruleForm[i] = data[i]);
						}
						this.ruleForm.parentIds = data.affiliatedBuilding + "," + data.affiliatedFloor + "," + data.affiliatedRoom
						this.ruleForm.parentName = data.affiliatedBuildingValue + "," + data.affiliatedFloorValue + "," + data.affiliatedRoomValue
						this.ruleForm = ruleForm;
					}
				});
			},
			
			departmentState() {
				this.departmentVisible = !this.departmentVisible;
			},
			
			departmentChoose(item) {
				if(!item.children) {
					this.ruleForm.departmentInfoId = item.id;
					this.ruleForm.departmentName = item.label;
					this.parentId = [];
					this.dataNativeSet(item.parentId);
					this.departmentVisible = false;
				}
			},
			
			addMenu() {
				const {
					userId
				} = JSON.parse(localStorage.getItem(local.USER));
				this.ruleForm.createUserId = userId;
				this.ruleForm.updateUserId = userId;
				this.webapi({
					url: "/showroom/api/showroom/updateShowroom ",
					data: {
						...this.ruleForm
					}
				}).then(res => {
					const {
						resultCode,
						resultMessage
					} = res;
					if(resultCode === code.CODE_SUCCESS) {
						this.info();
						Message({
							message: resultMessage
						});
						this.resetForm("ruleForm");
						this.EditVisibleChange(false);
					}
				});
			},
			
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.addMenu();
					} else {
						return false;
					}
				});
			},
			
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		watch: {
			'EditVisible': function(val) {
				
				val && this.infoDetail();
			},
			"ruleForm.parentIds": function(val) {
				console.log();
				const arr = val.split(",");
				this.ruleForm.affiliatedBuilding = arr[2];
				this.ruleForm.affiliatedFloor = arr[1];
				this.ruleForm.affiliatedRoom = arr[0];
			},
			"ruleForm.showroomAdminUserId": function(val) {
				console.log(this.user);
				for(let i = 0; i < this.user.length; i++) {
					const item = this.user[i];
					console.log(val, item.userInfoId);
					if(val === item.userInfoId) {
						this.ruleForm.showroomAdminUserName = item.userName;
						this.ruleForm.showroomAdminPhone = item.phoneNumber;
					}
				}
			},
			"ruleForm.responsibleUserId": function(val) {
				for(let i = 0; i < this.user.length; i++) {
					const item = this.user[i];
					if(val === item.userInfoId) {
						
						this.ruleForm.responsibleUserName = item.userName;
						
					}
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.position {
		.el-input__suffix {
			display: none;
		}
	}
</style>
