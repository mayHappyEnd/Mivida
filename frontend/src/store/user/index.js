import { changeUser } from "../../apis/user";
import {
  getUser,
  register,
  saveUser,
  setJwtToken,
  login,
  logout,
} from "../../apis/auth";

export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    //不要和auth中导出的重名，不然会命名冲突、循环调用
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      //触发mutation,把结果保存到store中
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      if (user !== undefined) {
        commit("setUser", user);
      }
    },
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);
      commit("setUser", updatedUser);
    },
    async logoutUser({ commit }) {
      await logout();
      commit("setUser", {});
    },
  },
};
