import { createPost, loadPosts, likePost, favorPost } from "../../apis/post";

export const post = {
  state() {
    return {
      list: [],
      searchResult: [],
      currentId: null,
    };
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = posts;
    },
    toggleLike(state, { id, isLike }) {
      const post = state.list.find((post) => post.id === id);
      if (isLike) {
        //防止后端返回undefined
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    toggleFavor(state, { id, isFavor }) {
      const post = state.list.find((post) => post.id === id);
      if (isFavor) {
        //防止后端返回undefined
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    setCurrentId(state, id) {
      state.currentId = id;
    },
    increasedCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id);
      post.comments++;
    },
    setPostsSearchResult(state, posts) {
      state.searchResult = posts;
    },
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description);
      //重新加载
      dispatch("loadAllPosts");
      //关闭对话框并清空上传的图片
      commit("changeShowPostUpload", false);
    },
    async loadAllPosts({ commit }) {
      const posts = await loadPosts();
      commit("initializePosts", posts);
    },
    async toggleLike({ commit }, id) {
      const isLike = await likePost(id);
      commit("toggleLike", { id, isLike });
    },
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPost(id);
      commit("toggleFavor", { id, isFavor });
    },
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentId", id);
      //触发上层的
      commit("changeShowPostDetails", true);

      //在展示详情时，加载评论列表
      // 下面的报错了，不是action,loadComments是api中的方法，不是store中的
      // dispatch("loadComments", id);
      dispatch("loadAllComments", id);
    },
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null);
      //触发上层的
      commit("changeShowPostDetails", false);
    },

    async searchPosts({ commit }, term) {
      // 下面最后少了一个=号
      const posts = await loadPosts("filters[description][$contains]=" + term);
      commit("setPostsSearchResult", posts);
    },
  },
  getters: {
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentId);
    },
  },
};
