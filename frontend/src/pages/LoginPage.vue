<template>
  <div class="loginPage">
    <img src="../assets/phone.png" alt="" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <form @submit.prevent>
        <input type="email" placeholder="邮箱" v-model="email" />
        <input
          v-if="!isLogin"
          type="text"
          placeholder="用户名"
          v-model="username"
        />
        <input type="password" placeholder="密码" v-model="password" />
        <!-- 再触发事件可选时要加()以立刻执行 -->
        <button
          type="submit"
          class="loginButton"
          @click="isLogin ? login() : register()"
        >
          {{ isLogin ? "登陆" : "注册" }}
        </button>
        <p class="info" @click="isLogin = !isLogin">
          {{ isLogin ? "还没有账号？点击注册" : "已有账号？点击登陆" }}
        </p>
        <div v-if="!isLogin" class="agreement">
          <input
            type="checkbox"
            v-model="accepted"
          />勾选表示同意隐私协议和使用规范
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const isLogin = ref(true);
const email = ref("");
const username = ref("");
const password = ref("");
const accepted = ref(false);

const store = useStore();
const router = useRouter();
async function register() {
  if (!accepted.value) {
    alert("请先阅读隐私协议和使用规范");
    return;
  }
  //使用await，这样等待登陆完成以后再跳转页面（后续代码都相当于then）
  await store.dispatch("registerUser", {
    email: email.value,
    username: username.value,
    password: password.value,
  });
  //建议在组件中路由跳转，而不是在vuex中跳转，不然vuex+vue-router不好维护
  //使用replace可避免用户后退到登陆页面
  router.replace("/");
}
async function login() {
  console.log(123);
  await store.dispatch("loginUser", {
    email: email.value,
    password: password.value,
  });
  router.replace("/");
}
</script>

<style scoped>
.loginPage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;

  padding: 0 10vw;
}

.phoneImage {
  max-width: 400px;
  position: relative;
  top: 36px;
  justify-self: end;
}

.loginForm {
  justify-self: start;
  box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
  border-radius: 32px;
  background: white;
  padding: 74px 60px;

  display: grid;
  place-items: center;
  row-gap: 52px;
  width: 380px;
}
.loginForm > form {
  display: grid;
  row-gap: 24px;
  width: 100%;
  height: 100%;
}

input {
  background: #fafafa;
  border-radius: 4px;
  border: none;
}

input::placeholder {
  color: #9e9e9e;
}

.loginButton {
  background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
  padding: 12px 0;
  color: white;
  border: none;
}

.info {
  color: #1da0ff;
  text-align: center;
  cursor: pointer;
}

.agreement {
  color: #a1a1a1;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
