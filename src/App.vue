<template>
  <div class="main">
    <div class="main-content">
      <site-header />
      <router-view />
      <site-footer />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default {
  name: "app",
  components: {
    SiteHeader,
    SiteFooter
  }
};
</script>
<style lang="less"></style>
