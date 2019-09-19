<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputSearch"
      style="width:200px"
    ></el-input>
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="subCategoryDetailList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="title" label="标题" width="60"></el-table-column>
      <el-table-column prop="clientUrl" label="url"></el-table-column>
      <el-table-column prop="img" label="img"></el-table-column>
      <el-table-column prop="link" label="link"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="orgPrice" label="原始价格"></el-table-column>
      <el-table-column prop="cfav" label="喜好"></el-table-column>
      <el-table-column prop="miniWallkey" label="详情外键"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="url" :label-width="formLabelWidth">
          <el-input v-model="form.clientUrl"></el-input>
        </el-form-item>
        <el-form-item label="img" :label-width="formLabelWidth">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
        <el-form-item label="link" :label-width="formLabelWidth">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="原始价格" :label-width="formLabelWidth">
          <el-input v-model="form.orgPrice"></el-input>
        </el-form-item>
        <el-form-item label="喜好" :label-width="formLabelWidth">
          <el-input v-model="form.cfav"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.maitKey_id"></el-input> -->
          <el-select v-model="form.miniWallkey" clearable placeholder="请选择">
            <el-option v-for="item in miniWallkeyList" 
            :key="item.index"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handCancel">取 消</el-button>
        <el-button type="primary" @click="handOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subCategoryDetailList: [],
      inputSearch: "",
      dialogFormVisible: false,
      form: {
        title:"",
        clientUrl:"",
        img:"",
        link:"",
        price: "",
        orgPrice: "",
        cfav: "",
        miniWallkey: "",
      },
      formLabelWidth: "120px",
      title: "",
      miniWallkeyList:[]
    };
  },
  mounted() {
    this.getCategory();
    this.getsubCategoryDetail();
  },
  methods: {
    getsubCategoryDetail() {
      this.$axios.get("/api/subCategoryDetail").then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          this.subCategoryDetailList = data;
        } else {
          alert("error");
        }
      });
    },
    getCategory(){
      this.$axios.get("/api/category").then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          this.miniWallkeyList = data.map(item=>{
            return {'value':item.miniWallkey}
          })
        } else {
          alert("error");
        }
      });
    },
    handleAdd() {
      this.form = {}
      this.dialogFormVisible = !this.dialogFormVisible;
      this.title = "新增";
    },
    handleEdit(data) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.title = "修改";
      this.form = data;
    },
    handleDelete({ id }) {
      console.log(id);
      this.$axios.post(`/api/subCategoryDetail/delete/${id}`).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          console.log(data);
          this.getsubCategoryDetail();
        } else {
          alert("erroe");
        }
      });
    },
    handOk() {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (this.form.id) {
        //修改
        this.$axios.post(`/api/subCategoryDetail/modify/${this.form.id}`, this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getsubCategoryDetail();
          } else {
            alert("erroe");
          }
        });
      } else {
        //新增
        this.$axios.post("/api/subCategoryDetail/add", this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getsubCategoryDetail();
          } else {
            alert("erroe");
          }
        });
      }
    },
    handCancel() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.form = {};
    }
  }
};
</script>

<style>
</style>