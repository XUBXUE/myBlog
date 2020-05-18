<template>
  <div class="data-box">
    <el-row class="handle-box">
      <el-col :span="12">
        <el-input placeholder="请输入关键词" class="search-input searchInput" v-model="queryKey">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" class="search-btn" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" plain class="create-btn fr" @click="add">创建</el-button>
      </el-col>
    </el-row>
    <div class="data-content">
      <el-table :data="blogData" border style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          align="center"
          >
          <template slot-scope="scope">
            <span class="articleTitle" @click="goDetail(scope.row)">{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="发布时间"
          align="center"
          width="250px"
          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          align="center"
          width="300px"
          >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination class="fr"
        background layout="prev, pager, next"
        :current-page="currentPage"
        :total="total"
        @current-change="changeCurrent"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'list',
  data () {
    return {
      queryKey: "",
      blogData: [
      ],
      total: 0,
      currentPage: 1
    };
  },
  methods: {
    getData: function() {
      let _this = this
      this.$fetch.get('api/artical/getAllArticalList',{params:{key: this.queryKey, currentPage: this.currentPage}}).then(function(data) {
        if(data.code == 200) {
          let list = data.data.list;
          _this.blogData = [];
          _this.total = data.data.totalCount || 0;
          if(list && list.length > 0) {
            list.forEach((item) => {
              _this.blogData.push({
                title: item.title,
                date: item.publishDate,
                type: item.type,
                articleId: item.articalId
              })
            })
          }
        }
      })
    },
    add: function() {
      this.$router.push('/home/article/add')
    },
    search: function() {
      this.currentPage = 1;
      this.getData();
    },
    goDetail: function(row) {
      this.$router.push({path: '/home/article/detail', query: {articleId: row.articleId}})
    },
    handleEdit: function(index, row) {
      console.log(index,row)
      this.$router.push({path:'/home/article/edit', query: {articleId: row.articleId}})
    },
    handleDelete: function(index, row) {
      let _this = this
      _this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$fetch.get('api/artical/deleteArticalById',{params:{articalId: row.articleId}}).then(function(data) {
            if(data.code == 200) {
              _this.$message({
                type: 'success',
                message: '删除成功!'
              });
              _this.getData()
            }
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    changeCurrent: function(val){
      this.currentPage = val;
      this.getData();
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang='scss' scoped>
.data-box{
  padding: 30px 40px;
  height: 100%;
  box-sizing: border-box;
  .handle-box {
    margin-bottom: 20px;
  }
  .pagination-box {
    margin-top: 20px;
  }
}
.articleTitle {
  cursor: pointer;
}
.articleTitle:hover {
  color: #66b1ff;
}
.searchInput {
  width: auto;
}
</style>