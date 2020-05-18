<template>
  <div class="container">
    <div class="title">{{article.title}}</div>
    <p class="publish-date">发布于：{{article.publishDate}}</p>
    <div class="artical-content" v-html="markdownCompiler(article.content)"></div>
    <p class="comment-title">发表评论</p>
    <div class="comment-box">
      <textarea placeholder="请输入评论内容（限制50字以内）" maxlength="100" v-model="commentText"></textarea>
      <input type="button" value="发布" class="publish-btn" @click="publish">
    </div>
    <div class="comment-list">
      <div class="comment-item" v-for="(item,index) of commentList" :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
let marked = require('marked');
//展示代码时 添加高亮效果
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';
export default {
  name:'detail',
  props:[''],
  data () {
    return {
      article: {},
      commentList: [],
      commentText: "",
      articleId: ""
    };
  },
  mounted() {
    this.articleId = this.$route.query.articleId || '';
    this.setMaked();
    this.getData(this.articleId);
  },
  methods: {
    publish: function() {
      let _this = this
      if(_this.commentText == '') {
        console.log('请输入评论！')
        return;
      }
      _this.$fetch.get('/api/comment/saveComment',{params:{content:_this.commentText.trim(), articalId: _this.articleId}}).then(data => {
        _this.$fetch.get('/api/comment/getCommentList',{params:{articalId: _this.articleId}}).then(res => {
          if(res.data.length > 0) {
            _this.commentList = []
            res.data.forEach(item => {
              _this.commentList.push(item.content);
            })
          }
        })
        this.commentText = '';
      });
    },
    getData: function(articleId) {
      let _this = this;
      if(articleId) {
        _this.$fetch.get('/api/artical/getArticalDetail',{params:{articalId: articleId}}).then(data => {
          if(data.data.length > 0) {
            _this.article = data.data[0];
            return _this.$fetch.get('/api/comment/getCommentList',{params:{articalId:articleId}})
          }
        }).then(data => {
          if(data.data.length > 0) {
            _this.commentList = []
            data.data.forEach(item => {
              _this.commentList.push(item.content);
            })
          }
        })
      }
    },
    setMaked: function() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function(code, lang) {
          if(lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
      })
    },
    markdownCompiler: function(val) {
      return marked(val || '', {
        sanitize: true
      });
    },
  }
}
</script>
<style lang='scss' scoped>
.container {
  padding: 0.2rem 0.3rem;
  background-color: #FFF;
  min-height: calc(100vh - 1rem);
  .title {
    font-size: 0.18rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .publish-date {
    font-size: 0.15rem;
    margin-top: 0.13rem;
    padding-bottom: 0.2rem;
    color: #adadad;
  }
  .artical-content {
    white-space: pre-line;
    font-size: 0.15rem;
    line-height: 0.28rem;
    margin-top: 0.1rem;
    color: #464646;
    overflow: hidden;
    padding-bottom: 0.15rem;
    text-indent: 0.2rem;
    img{
      max-width: 80%;
    }
  }
  .comment-title {
    font-size: 0.14rem;
    color: #1d768a;
  }
  .comment-box {
    font-size: 0.12rem;
    textarea {
      border: 1px solid #ddd;
      margin-top: 0.15rem;
      width: 100%;
      max-width: 100%;
      min-height: 0.8rem;
      font-size: 0.13rem;
      box-sizing: border-box;
    }
    .dzNum{
      display: inline-block;
      margin-top: 0.1rem;
      .num, .dz{
        display: inline-block;
        vertical-align: top;
        color: #999;
        font-size: 0.18rem;
      }
    }
    .publish-btn {
      padding: 0.05rem 0.16rem;
      background-color: #009688;
      color: #FFF;
      border: none;
      font-size: 0.12rem;
      float: right;
      margin-top: 0.1rem;
      border-radius: 0.05rem;
      clear: both;
    }
  }
  .comment-list {
    font-size: 0.12rem;
    margin-top: 0.5rem;
    .comment-item {
      margin-top: 0.15rem;
      font-size: 0.14rem;
      line-height: 0.25rem;
      color: #444;
    }
  }
}
</style>