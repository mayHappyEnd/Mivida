<template>
  <div>
    <h2 class="title">搜索结果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post"> </PostItem>
    </PostList>
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

const store = useStore();
const searchResult = computed(() => store.state.post.searchResult);

//注意这里是route，不是router
const route = useRoute();
const term = computed(() => route.params.term);
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
