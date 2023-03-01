<script setup>
import NavBar from "./components/NavBar.vue";
import "./assets/base.css";
import TheIcon from "./components/TheIcon.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<template>
  <template v-if="$route.name !== 'login'">
    <header class="header">
      <NavBar />
    </header>
    <TheLayout>
      <router-view></router-view>
    </TheLayout>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
  <footer class="footer" :class="{ inside: $route.name === 'login' }">
    &copy;Hanmin. All Rights Reserved.
  </footer>
</template>

<style>
.header {
  height: 80px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.08);
  /* border: 1px solid red; */
}
.footer {
  text-align: center;
  padding: 38px 0;
  color: #828282;
}
.footer.inside {
  position: absolute;
  bottom: 0;
  width: 100vw;
}
</style>
