<template>
  <div class="postList">
    <!-- 让父组件传递需要展示的PostItem -->
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.postList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}
</style>
