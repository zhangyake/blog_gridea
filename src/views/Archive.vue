<template>
  <div class="archives-container">
    <div v-for="(item, key) in archives" :key="key">
      <h2 class="year">{{ key }}</h2>
      <a
        href="#"
        @click="$router.push({ name: 'post', params: { id: a.id } })"
        class="post"
        v-for="(a, index) in item"
        :key="a.title + index"
      >
        <h2 class="post-title">
          {{ a.title }}
        </h2>
        <div class="time">{{ a.created_at }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "tags",
  components: {},
  data() {
    return {
      archives: {},
      rawHtml: ""
    };
  },
  mounted() {
    this.getArchives();
  },
  methods: {
    getArchives() {
      this.api.getArchives().then(res => {
        this.archives = res.data;
      });
    }
  }
};
</script>
