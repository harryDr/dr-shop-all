<template>
  <div>
    <el-upload
      class="upload-demo"
      action="api/upload"
      :on-success="handSuccess"
      multiple
      :limit="3"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-image :src="src"></el-image>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      msg: "index1",
      src:''
    };
  },
  methods: {
    handSuccess(res,file) {
        let{url} = res
        console.log(url)
        this.src = url       
    }
  }
};
</script>
<style scoped>
</style>


