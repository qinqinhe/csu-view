<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="detailDateVisibleUpdate(false)"
      width="660x"
      :modal-append-to-body='false'
      title="审核详情"
    >
      <section class="dialog-from-content">
        <ul>
          <li class="flex">
            <p class="title">实验室：</p>
            <p class="text">{{ ruleForm.reserveObjectName }}</p>
          </li>
          <li class="flex">
            <p class="title">申请人：</p>
            <p class="text">{{ ruleForm.applyUserName }}</p>
          </li>
          <li class="flex">
            <p class="title">时间段：</p>
            <p class="text">{{ ruleForm.time }}</p>
          </li>
          <li class="flex">
            <p class="title">申请时间：</p>
            <p class="text">{{ ruleForm.applyTime }}</p>
          </li>
          <li class="flex">
            <p class="title">内容：</p>
            <p class="text">{{ ruleForm.context }}</p>
          </li>
          <li class="flex">
            <p class="title">状态：</p>
            <p class="text">
              <span v-if='ruleForm.auditStatus === "0"'>未审核</span>
              <span class="green" v-else-if='ruleForm.auditStatus === "1"'>已通过</span>
              <span class="red" v-else-if='ruleForm.auditStatus === "2"'>拒绝</span>
            </p>
          </li>
          <li class="flex">
            <p class="title">备注：</p>
            <p class="text">{{ ruleForm.remarks || '无' }}</p>
          </li>
          <li class="flex">
            <p class="title">预约人：</p>
            <p class="text">{{ ruleForm.remarks || '无' }}</p>
          </li>       
          <li>
            <p class="title">预约人员：</p>
            <ul class="reserveUser">
              <li v-for="(item, index) in ruleForm.reserveUser" :key='index'>{{ item.userName }}</li>
            </ul>            
          </li>
        </ul> 
      </section>
      <footer class="dialog-footer">
        <el-button @click="detailDateVisibleUpdate(false)">关闭</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
  import { code } from '@/config/wildcard'
  import { Message } from 'element-ui'
  import { mapState, mapActions } from 'vuex'
  import { local } from '@/config/wildcard'

  export default {
    props: {},
    data () {
      return {}
    },
    components: {},
    mounted () {
    },
    computed: {
      ...mapState({
        visible: state => state.laboratoryReserveApproval.detailDate.visible,
        ruleForm: state => state.laboratoryReserveApproval.detailDate.ruleForm
        
        
      })
    },
    methods: {
      ...mapActions('laboratoryReserveApproval', [
        'detailDateVisibleUpdate',
        'editsubmitForm',
        'studentsCheck'
      ])

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content {
    >ul {
      >li {
        line-height: 30px;
        padding: 10px 0;
        .title {
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }
        .reserveUser{
          margin: 0 30px;
          li {
            width: 20%;
            float: left;
          }
        }
      }
    }
  }
</style>
