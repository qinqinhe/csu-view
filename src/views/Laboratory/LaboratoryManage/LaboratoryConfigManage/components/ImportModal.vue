<template>
  <el-dialog title="导入文件" :visible.sync="importVisible" :modal-append-to-body='false'>
    <ImportFiles/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="importVisible = false">取 消</el-button>
      <el-button type="primary" @click="importVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {}
</script>
