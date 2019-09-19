<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputSearch"
      style="width:200px"
    ></el-input>
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="recommondList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="title" width="100"></el-table-column>
      <el-table-column prop="image" label="image"></el-table-column>
      <el-table-column prop="link" label="href"></el-table-column>
      <el-table-column prop="sort" label="serial" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="title" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="image" :label-width="formLabelWidth">
          <el-input v-model="form.image"></el-input>
        </el-form-item>
        <el-form-item label="link" :label-width="formLabelWidth">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="sort" :label-width="formLabelWidth">
          <el-input v-model="form.sort"></el-input>
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
      recommondList: [],
      inputSearch: "",
      dialogFormVisible: false,
      form: {
        title: "",
        image: "",
        link: "",
        sort: ""
      },
      formLabelWidth: "120px",
      title: ""
    };
  },
  mounted() {
    this.getRecommond();
  },
  methods: {
    getRecommond() {
      this.$axios.get("/api/recommond").then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          this.recommondList = data.list;
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
      this.$axios.post(`/api/recommond/delete/${id}`).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          console.log(data);
          this.getRecommond();
        } else {
          alert("erroe");
        }
      });
    },
    handOk() {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (this.form.id) {
        //修改
        this.$axios.post(`/api/recommond/modify/${this.form.id}`, this.form).then(res => {
         console.log(res)
          let { code, data } = res.data;
          if (code == 200) {
            this.getRecommond();
          } else {
            alert("erroe");
          }
        });
      } else {
        //新增
        this.$axios.post("/api/recommond/add", this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getRecommond();
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