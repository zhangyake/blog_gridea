<template>
  <div class="post-container">
    <article
      class="post"
      v-for="(item, index) in articles"
      :key="'article' + index"
    >
      <a
        href="#"
        @click="$router.push({ name: 'post', params: { id: item.id } })"
      >
        <h2 class="post-title" v-text="item.title"></h2>
      </a>
      <div class="post-info">
        <time class="post-time"> </time>
        <span> · {{ item.created_at }} · </span>
        <span> {{ item.page_view }} min read </span>
        <a href="https://zhangyake.github.io/hve/tag/gridea" class="post-tag">
          # Gridea
        </a>
      </div>

      <a
        href="#"
        @click="$router.push({ name: 'post', params: { id: item.id } })"
        class="post-feature-image"
        :style="{ backgroundImage: 'url(' + item.page_image_url + ')' }"
      >
      </a>

      <div class="post-abstract">
        <p>
          👏 欢迎使用 <strong>Gridea</strong> ！<br />
          ✍️
          <strong>Gridea</strong>
          一个静态博客写作客户端。你可以用它来记录你的生活、心情、知识、笔记、创意...
          ...
        </p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      articles: []
    };
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    getArticleList() {
      this.api.getArticleList().then(res => {
        this.articles = res.data;
      });
    }
  }
};
</script>
