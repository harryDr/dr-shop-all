<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputSearch"
      style="width:200px"
    ></el-input>
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="subCategoryList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="img" label="图片" width="180"></el-table-column>
      <el-table-column prop="link" label="link"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="maitKey_id" label="类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
        <el-form-item label="link" :label-width="formLabelWidth">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.maitKey_id"></el-input> -->
          <el-select v-model="form.maitKey_id" clearable placeholder="请选择">
            <el-option v-for="item in maitKeyList" 
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
      subCategoryList: [],
      inputSearch: "",
      dialogFormVisible: false,
      form: {
        img:"",
        link:"",
        title: "",
        sort: "",
        maitKey_id: "",
      },
      formLabelWidth: "120px",
      title: "",
      maitKeyList:[
        // {value:'501'},
        // {value:'502'},
      ]
    };
  },
  mounted() {
    this.getCategory();
    this.getsubCategory();
  },
  methods: {
    getsubCategory() {
      this.$axios.get("/api/subcategory").then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          this.subCategoryList = data;
        } else {
          alert("error");
        }
      });
    },
    getCategory(){
      this.$axios.get("/api/category").then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          this.maitKeyList = data.map(item=>{
            return {'value':item.maitKey}
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
      this.$axios.post(`/api/subcategory/delete/${id}`).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          console.log(data);
          this.getsubCategory();
        } else {
          alert("erroe");
        }
      });
    },
    handOk() {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (this.form.id) {
        //修改
        this.$axios.post(`/api/subcategory/modify/${this.form.id}`, this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getsubCategory();
          } else {
            alert("erroe");
          }
        });
      } else {
        //新增
        this.$axios.post("/api/subcategory/add", this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getsubCategory();
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