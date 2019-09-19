<template>
  <div>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="inputSearch"
      style="width:200px"
    ></el-input>
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-table :data="goodsList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="title" label="标题" width="80"></el-table-column>
      <el-table-column prop="orgPrice" label="原始价格"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="sale" label="卖出"></el-table-column>
      <el-table-column prop="href" label="href"></el-table-column>
      <el-table-column prop="link" label="link"></el-table-column>
      <el-table-column prop="type" label="type"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" style="height:600px">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="原始价格" :label-width="formLabelWidth">
          <el-input v-model="form.orgPrice"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="卖出" :label-width="formLabelWidth">
          <el-input v-model="form.sale"></el-input>
        </el-form-item>
        <el-form-item label="href" :label-width="formLabelWidth">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="link" :label-width="formLabelWidth">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="type" :label-width="formLabelWidth">
          <el-input v-model="form.type"></el-input>
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
      goodsList: [],
      inputSearch: "",
      dialogFormVisible: false,
      form: {
        title: "",
        orgPrice: "",
        price: "",
        sale: "",
        href: "",
        link:"",
        type: ""
      },
      formLabelWidth: "120px",
      title: ""
    };
  },
  mounted() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      this.$axios.get("/api/goods").then(res => {
        console.log(res.data);
        let { code, data } = res.data;
        if (code == 200) {
          this.goodsList = data;
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
      this.$axios.post(`/api/goods/delete/${id}`).then(res => {
        let { code, data } = res.data;
        if (code == 200) {
          console.log(data);
          this.getGoods();
        } else {
          alert("erroe");
        }
      });
    },
    handOk() {
      this.dialogFormVisible = !this.dialogFormVisible;
      if (this.form.id) {
        //修改
        this.$axios.post(`/api/goods/modify/${this.form.id}`, this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getGoods();
          } else {
            alert("erroe");
          }
        });
      } else {
        //新增
        this.$axios.post("/api/goods/add", this.form).then(res => {
          let { code, data } = res.data;
          if (code == 200) {
            this.getGoods();
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