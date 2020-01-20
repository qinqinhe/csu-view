<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="AddVisible"
      @close="AddVisibleChange(false)"
      width="660px"
      :modal-append-to-body='false'
      title="添加位置"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="dialog-form fsize14P"
      >
        <section class="dialog-from-content">
          <el-form-item label="编码" prop="placeCode">
            <el-input v-model="ruleForm.placeCode" placeholder="请输入位置编码"/>
          </el-form-item>
          <el-form-item label="名称" prop="placeName">
            <el-input v-model="ruleForm.placeName" placeholder="请输入位置名称" maxlength="15"/>
          </el-form-item>
          <el-form-item label="类型" prop="placeType">
            <el-select v-model="ruleForm.placeType" placeholder="类型">
              <el-option
                v-for="item in placeTypeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="父级位置" prop="parentName" v-if='ruleForm.placeType === "2" || ruleForm.placeType === "3"'>
            <el-input v-model="ruleForm.parentName" @focus="TreeChooseState=true" readonly/>
          </el-form-item>
          <el-form-item label=" " prop="" v-else>
            <el-input v-model="ruleForm.parentName" style='opacity: 0'/>
          </el-form-item>
        </section>
        <el-form-item class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <TreeChooseParent
      :dataTree='dataTreeFilter'
      :dataNative='dataNative'
      :visible.sync='TreeChooseState'
      :parentIds.sync='ruleForm.parentIds'
      :parentNames.sync='ruleForm.parentName'
      :id.sync='ruleForm.id'
      :TreeChooseType='0'
      title='位置选择'
    />
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapMutations } from 'vuex'
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
    data () {
      return {
        ruleForm: {
          placeCode: '',
          placeName: '',
          placeType: '',
          parentIds: '',
          parentId: '0',
          parentName: '',
          longitude: '111',
          latitude: '111',
          id: ''
        },
        dataTreeFilter: [],
        placeTypeSelect: [
          {
            value: '1',
            label: '楼栋'
          },
          {
            value: '2',
            label: '楼层'
          },
          {
            value: '3',
            label: '房间'
          },
          {
            value: '4',
            label: '公共区域'
          }
        ],
        
        rules: {
          placeCode: [
            { required: true, message: '请输入位置编码', trigger: 'blur' }
          ],
          placeName: [
            { required: true, message: '请输入位置名称', trigger: 'blur' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('输入汉字、字母、数字'))
                }
              }
            }
          ],
          placeType: [
            { required: true, message: '请选择位置类型', trigger: 'change' }
          ],
          parentName: [
            { required: true, message: '请选择父级位置', trigger: 'change' },
            {
              trigger: 'blur', validator: (rule, value, callback) => {
                const { placeType } = this.ruleForm,
                  parentLen = value.split().length
                if (placeType === '3' && parentLen !== 2) {
                  callback(new Error('请选择楼层'))
                } else if (placeType === '2' && parentLen !== 1) {
                  callback(new Error('请选择楼栋'))
                } else {
                  callback()
                }
              }
            }
          ]
        },
        TreeChooseState: false
      }
    },
    components: {
      TreeChooseParent
    },
    mounted () {
    },
    watch: {
      'ruleForm.placeType': function (val) {
        this.dataTreeFilter = []
        const dataTree = JSON.parse(JSON.stringify(this.dataTree.filter(item => item.placeType !== '4')))
        if (val === '3' || val === '2') {
          this.ruleForm.parentName = ''
          this.ruleForm.parentIds = ''
          dataTree.forEach(item => {
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
          this.ruleForm.parentName = ''
          this.ruleForm.parentIds = '0'
        }
      },
      'AddVisible': function (val) {
        if (!val) {
          this.resetForm('ruleForm')
        }
      }
    },
    computed: {
      ...mapState({
        AddVisible: state => state.AddVisible
      })
    },
    methods: {
      ...mapMutations([
        'AddVisibleChange'
      ]),
      departmentState () {
        this.TreeChooseState = !this.TreeChooseState
      },
      departmentChoose (item) {
        if (!item.children) {

          this.TreeChooseState = false
        }
      },
      addMenu () {
        if (this.ruleForm.placeType === '2' || this.ruleForm.placeType === '3') {
          const parentIds = this.ruleForm.parentIds.split(',')
          this.ruleForm.parentId = parentIds[0]
        } else {
          this.ruleForm.parentId = '0'
        }
        this.webapi({
          url: '/system/api/place/addPlace',
          data: {
            ...this.ruleForm
          }
        }).then(res => {
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
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addMenu()
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
