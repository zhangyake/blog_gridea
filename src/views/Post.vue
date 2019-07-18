<style>
@import "~highlight.js/styles/atom-one-dark.css";
</style>
<template>
  <div class="post-detail">
    <article class="post">
      <h2 class="post-title">
        {{ article.title }}
      </h2>
      <div class="post-info">
        <!-- <time class="post-time"> · {{ article.created_at }} · </time> -->
        <span> · {{ article.created_at }} · </span>
        <span> {{ article.page_view }} min read </span>
        <a
          href="https://zhangyake.github.io/tag/gridea"
          class="post-tags"
          v-for="(tag, index) in article.tags"
          :key="'tag' + index"
        >
          # {{ tag.name }}
        </a>
      </div>
      <img class="post-feature-image" :src="article.page_image_url" alt="" />
      <div class="post-content-wrapper">
        <div class="post-content">
          <div v-html="rawHtml"></div>
        </div>
        <div class="toc-container"></div>
      </div>
    </article>
  </div>
</template>

<script>
import emojione from "emojione";
import marked from "marked";
import hljs from "highlight.js";
window.hljs = hljs;
export default {
  name: "post",
  components: {},
  data() {
    return {
      article: {},
      rawHtml: ""
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getArticleDeatil({ id });
  },
  methods: {
    getArticleDeatil(data) {
      this.api.getArticleDeatil(data).then(res => {
        this.article = res.data;
        this.rawHtml = this.parse(this.article.content_md);
        this.$nextTick(function() {
          hljs.initHighlighting();
        });
      });
    },
    parse(content) {
      // let renderer = new marked.Renderer();
      // renderer.code = function(code, language) {
      //   return (
      //     '<pre> <code class="hljs ' + language + '">' + code + "</code> </pre>"
      //   );
      // };
      marked.setOptions({
        // renderer,
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });

      return emojione.toImage(marked(content));
    }
  }
};
</script>
