<template>
  <div class="container">
    <div class="notify">
      <i class="iconfont icon-xinbaniconshangchuan-"></i>
      <div class="notify-content">公告：欢迎来到我的博客</div>
    </div>
    <div class="artical-item" v-for="(item,index) in articleList" :key="index">
      <h3 class="title">{{item.title}}</h3>
      <p class="publish-date">发布于：{{item.publishDate}}</p>
      <div class="artical-content" v-html="markdownCompiler(item.content)"></div>
      <div class="comment-box">
        <div class="comment" @click="goDetail(item)"><i class="iconfont icon-icon_comment"></i>评论</div>
        <div class="good" @click="startGoodNum(item)"><i class="iconfont icon-dianzan"></i><span>{{item.thumbsUp.length > 0 ? item.thumbsUp[0].count : 0}}</span></div>
      </div>
    </div>
    <div class="more-tips" v-if="isShowMoreTips">{{moreTips}}</div>
  </div>
</template>

<script>
let marked = require('marked');
//展示代码时 添加高亮效果
let hljs = require('highlight.js');
import 'highlight.js/styles/default.css';
import utils from '@/lib/utils.js';
export default {
  name:'index',
  props:[''],
  components: {
  },
  data () {
    return {
      articleList: [
      ],
      currentPage: 1,
      pageSize: 10,
      isShowMoreTips: false,
      moreTips: "正在加载更多，请稍后"
    };
  },
  mounted() {
    let _this = this
    _this.setMaked();
    _this.getData();
    window.onscroll = function(e) {
      if(utils.isScrollBottom()){
        console.log('bottom')
        _this.isShowMoreTips = true;
        _this.currentPage++;
        _this.getData(result => {
          if(result.length == 0) {
            _this.moreTips = "暂无更多数据！";
            return;
          }
          setTimeout(() => {
            _this.isShowMoreTips = false;
          },1000);
        })
      }
    }
  },
  methods: {
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
    getData: function(callback) {
      let _this =  this;
      _this.$fetch.get("/api/artical/getAllArticalList",{params:{key: '', currentPage: this.currentPage}}).then(data => {
        if(data.code == 200) {
          let list = data.data.list;
          if(list && list.length > 0) {
            list.forEach(item => {
              this.articleList.push({
                title: item.title,
                publishDate: item.publishDate,
                type: item.type,
                articleId: item.articalId,
                content: item.content,
                thumbsUp: item.thumbsUp || 0
              });
            });
          }
          if(callback) callback(list);
        }
      })
    },
    markdownCompiler: function(val) {
      return marked(val || '', {
        sanitize: true
      });
    },
    startGoodNum: function(item) {
      let _this = this
      if(item.thumbsUp.length > 0) {
        item.thumbsUp[0].count++;
      } else {
        item.thumbsUp.push({
          count: 1
        })
      }
      _this.$fetch.get('/api/thumbsUp/addThumbs',{params:{articalId: item.articleId, count: item.thumbsUp[0].count}}).then(data => {
        console.log('点赞成功')
      })
    },
    goDetail: function(item) {
      this.$router.push({path:'/detail',query:{articleId: item.articleId}})
    }
  }
}

</script>
<style scoped>
img {
  max-width: 80%;
}
</style>
<style lang='scss' scoped>

.container {
  padding: 0.1rem;
  .notify {
    height: 0.6rem;
    background-color:#FFFF;
    line-height: 0.6rem;
    font-size: 0;
    text-align: center;
    color: #737373;
    i {
      display: inline-block;
      margin-right: .05rem;
      font-size: 0.18rem;
    }
    .notify-content {
      display: inline-block;
      font-size: 0.18rem;
    }
  }
  .artical-item {
    margin-top: 0.1rem;
    background-color: #FFF;
    font-size: 0.12rem;
    position: relative;
    h3.title {
      font-size: 0.2rem;
      color: #464646;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.2rem 0.2rem 0 0.2rem;
    }
    .publish-date {
      font-size: 0.13rem;
      margin-top: 0.13rem;
      color: #adadad;
      padding: 0 0.2rem;
    }
    .artical-content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      font-size: 0.14rem;
      line-height: 0.28rem;
      color: #464646;
      padding: 0.1rem 0.2rem 0 0.2rem;
      margin-bottom: 0.15rem;
    }
    .comment-box {
      height: 0.5rem;
      background: #f9f9f9;
      width: 100%;
      bottom: 0;
      font-size: 0.12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 50%;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.15rem;
        color: #444;
        i {
          font-size: 0.2rem;
          margin-right: 0.05rem;
        }
      }
    }
  }
  .more-tips {
    font-size: 0.15rem;
    color: #737373;
    width: 100%;
    text-align: center;
    padding-top: 0.1rem;
  }
}
</style>