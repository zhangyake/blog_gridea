<template>
  <div class="post-detail">
    <article class="post">
      <h2 class="post-title">
        关于
      </h2>
      <div class="post-info">
        <span>
          2019-01-25
        </span>
        <span>
          1 min read
        </span>
      </div>

      <div class="post-content-wrapper">
        <div class="post-content">
          <div class="user-card">
            <img
              class="user-img"
              src="https://fehey.com/images/avatar.png?v=1554801547216"
            />
            <div class="username">海岛心hey</div>
            <div class="description">
              Front End Developer | Nodejs Developer | Gridea 作者
            </div>
          </div>
          <div style="text-align: center; color: #495057;">
            如果你正在寻找前端工程师，不妨与我联系，相信你总会找的到我
          </div>
        </div>
        <div class="toc-container"></div>
      </div>
    </article>
  </div>
</template>
<style lang="less" scoped>
.user-card {
  padding: 32px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
  text-align: center;
  margin: 32px;
  border-radius: 8px;
  background: #ffe8cc;
}
.user-img {
  border-radius: 50% !important;
  width: 80px;
  margin: 24px auto;
  display: inline-block;
}
.username {
  font-size: 20px;
}
.description {
  margin: 32px 0;
  font-size: 14px;
  color: #ffa94d;
}
</style>
