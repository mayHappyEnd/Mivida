import { createComment, loadComments } from "../../apis/comments";
export const comment = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    initializeComments(state, comments) {
      state.list = comments;
    },
  },
  actions: {
    async addComment({ commit, dispatch }, { content, postId }) {
      await createComment(content, postId);
      dispatch("loadAllComments", postId);
      commit("increasedCommentCount", postId);
    },
    async loadAllComments({ commit }, postId) {
      //调用api
      const comments = await loadComments(postId);
      commit("initializeComments", comments);
    },
  },
};
