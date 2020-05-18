<template>
  <div id="content">
    <el-form :label-position="labelPosition" label-width="80px">
      <el-form-item label="标题*">
        <el-input v-model="articles.title" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="类型*">
        <el-select v-model="articles.type" placeholder="请选类型" :disabled="disabled">
          <el-option v-for="(item,index) of articleType" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容*">
        <mavon-editor 
            v-model="articles.content"
            :editable="!disabled"
            ref="md" 
            @change="change" 
            style="min-height: 550px"
        />
      </el-form-item>
      <el-form-item size="large" class="operator-box">
        <el-button type="primary" @click="cancel" v-if="disabled">返回</el-button>
        <el-button type="primary" @click="publish" v-if="!disabled">发布</el-button>
        <el-button @click="cancel" v-if="!disabled">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: "article",
  components: {
    mavonEditor,
  },
  data() {
    return {
      labelPosition: 'right',
      articles: {
        title: '',
        type: '',
        content: '',
        articleId: ''
      },
      disabled: false,
      articleType: [
        'vue','javascript','css','其他'
      ]
    }
  },
  methods: {
    change: function(value, html) {
      console.log(html)
      this.articles.content = html;
    },
    publish: function() {
      let _this = this
      if(!_this.articles.title || !_this.articles.type || !_this.articles.content) {
        _this.$message({
          type: 'success',
          message: '请填写完整后提交！!'
        });
        return;
      }
      _this.$fetch.get('api/artical/saveArtical',{params: _this.articles}).then(function(data) {
        if(data.code == 200) {
          _this.$message({
            type: 'success',
            message: '发布成功！'
          });
          _this.$router.push({path: '/home/list'});
        }
      })
    },
    cancel: function() {
      this.$router.push({path: '/home/list'})
    },
    getArticleInfo: function() {
      let _this = this
      _this.$fetch.get('api/artical/getArticalDetail',{params:{articalId: _this.articles.articleId }}).then(function(data) {
        if(data.code && data.code == 200) {
          if(data.data && data.data.length > 0) {
            _this.articles.title = data.data[0].title;
            _this.articles.type = data.data[0].type;
            _this.articles.content = data.data[0].content;
            _this.articles.articleId = data.data[0].articalId;
          }
        }
      })
    }
  },
  created() {
    console.log(this.$route.params.type)
    console.log(this.$route.query)
    if(this.$route.params.type == 'detail') this.disabled = true
    if(this.$route.query.articleId) {
      this.articles.articleId = this.$route.query.articleId
      this.getArticleInfo()
    }
  }
}
</script>

<style lang='scss' scoped>
#content {
  padding: $globalPd;
}
#content .el-input__inner {
  height: 60px;   
  width: 500px;
}
#content .el-form-item__label {
  width: 120px!important;
}
#content .el-input {
  width: 50%;
}
#content .el-input__suffix {
  right: -240px;
}
#content .el-form-item {
  margin-bottom: 20px;
}
#content .el-form-item__label {
  margin-right: 40px;
  margin-top: 8px;
}
#content .operator-box {
  text-align: center;
}
#content .el-button--primary {
  margin-right: 20px;
}
#content .el-button--primary, #content .el-button+.el-button {
  width: 200px;
  height: 70px;
}
</style>