import http from "./../utils/http";

export default {
  getTagList(params) {
    return http({
      url: "/api/_tags",
      method: "get",
      params
    });
  },
  getLinkList(params) {
    return http({
      url: "/api/links",
      method: "get",
      params
    });
  },
  getCategoryList(params) {
    return http({
      url: "/api/_categories",
      method: "get",
      params
    });
  },
  getArticleList(params) {
    return http({
      url: "/api/_articles",
      method: "get",
      params
    });
  }
};
