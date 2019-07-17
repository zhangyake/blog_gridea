<template>
  <div class="site-header">
    <a href="https://zhangyake.github.io/hve">
      <img
        class="avatar"
        src="https://zhangyake.github.io/hve/images/avatar.png?v=1555322295083"
        alt=""
      />
    </a>
    <h1 class="site-title">
      Gridea
    </h1>
    <p class="site-description">
      温故而知新，可以为师矣
    </p>
    <div class="menu-container">
      <a href="/" class="menu">
        首页
      </a>
      <a href="/archives" class="menu">
        归档
      </a>
      <a href="/tags" class="menu">
        标签
      </a>
      <a href="/about" class="menu">
        关于
      </a>
    </div>
    <div class="social-container">
      <a href="https://github.com/EryouHao" target="_blank">
        <i class="fab fa-github"></i>
      </a>

      <a href="https://twitter.com/EryouHao" target="_blank">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteHeader",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
