<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputSearch"
      style="width:200px"
    ></el-input>
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="maitKey" label="zi"></el-table-column>
      <el-table-column prop="miniWallkey" label="xiang"></el-table-column>
      <el-table-column label="操作">
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
        <el-form-item label="zi" :label-width="formLabelWidth">
          <el-input v-model="form.maitKey"></el-input>
        </el-form-item>
        <el-form-item label="xiang" :label-width="formLabelWidth">
          <el-input v-model="form.miniWallkey"></el-input>
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
      categoryList: [],
      inputSearch: "",
      dialogFormVisible: false,
      form: {
        title: "",
        maitKey: "",
        miniWallkey: "",
      },
      formLabelWidth: "120px",
      title: ""
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$axios.get("/api/category").then(res => {
        console.log(res.data);
        let { code, data } = res.data;
        if (code == 200) {
          this.categoryList = data;
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
      this.$axios.post(`/api/category/delete/${id}`).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          console.log(data);
          this.getCategory();
        } else {
          alert("erroe");
        }
      });
    },
    handOk() {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (this.form.id) {
        //修改
        this.$axios.post(`/api/category/modify/${this.form.id}`, this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getCategory();
          } else {
            alert("erroe");
          }
        });
      } else {
        //新增
        this.$axios.post("/api/category/add", this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getCategory();
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