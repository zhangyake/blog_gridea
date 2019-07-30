<template>
  <div class="tags-container">
    <a
      class="tag"
      v-for="t in tags"
      :key="t.name"
      href="https://fehey.com/tag/Bu586Fh91"
      >{{ t.name }}</a
    >
  </div>
</template>
<script>
export default {
  name: "tags",
  components: {},
  data() {
    return {
      tags: {},
      rawHtml: ""
    };
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    getTagList() {
      this.api.getTagList().then(res => {
        this.tags = res.data;
      });
    }
  }
};
</script>
