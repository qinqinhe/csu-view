<template>
  <div class="modal-dialog">
    <el-dialog
      class="dialog-model"
      :visible="visible"
      @close="detailDateVisibleUpdate({state:false, infoId: ''})"
      width="660px"
      :modal-append-to-body='false'
      title="维修详情"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="fsize14P"
      >
        <section class="dialog-from-content">
          <ul>
            <li class="flex">
              <p class="title">编码：</p>
              <p class="text">{{ ruleForm.maintainceInfoCode }}</p>
            </li>
            <li class="flex">
              <p class="title">维修时间：</p>
              <p class="text">{{ ruleForm.startTime + ' - ' + ruleForm.endTime }}</p>
            </li>
            <li class="flex">
              <p class="title">说明：</p>
              <p class="text">{{ ruleForm.description }}</p>
            </li>
            <li class="flex">
              <p class="title">维修人：</p>
              <p class="text">{{ ruleForm.maintaincePersonName }}</p>
            </li>
            <li class="flex">
              <p class="title">审核人：</p>
              <p class="text">{{ ruleForm.reviewerName }}</p>
            </li>

            <li class="executor">
              <p>维修清单：</p>
              <section>
                <el-table
                  :data="ruleForm.maintainceLists"
                  style="width: 100%"
                >
                  <el-table-column type="index" lable=' ' width="55"/>
                  <el-table-column prop='maintainceListCode' label="编码" align='center'/>
                  <el-table-column prop='hardNumber' label="数量" align='center'/>
                  <el-table-column prop='hardTypeName' label="类型" align='center'/>
                </el-table>
              </section>
            </li>
          </ul>
        </section>
        <section class="dialog-footer">
          <el-button type="primary" @click="detailDateVisibleUpdate({state:false, infoId: ''})">确定</el-button>
        </section>
      </el-form>
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
        visible: state => state.maintainceInfo.detailDate.visible,
        ruleForm: state => state.maintainceInfo.detailDate.ruleForm
        
        
        
        
        
        
      })
    },
    methods: {
      ...mapActions('maintainceInfo', [
        'detailDateVisibleUpdate'
      ])
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .dialog-from-content {
    ul {
      li {
        padding: 13px 0;

        .title {
          line-height: 24px;
          width: 80px;
          text-align: right;
          margin-right: 20px;
        }

        .text {
          line-height: 24px;
        }
      }

      .executor {
        padding-top: 10px;

        p {
          padding-bottom: 4px;
        }
      }
    }
  }
</style>
