<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>

<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- 二级路由出口 -->
   <!-- 路由缓存问题 -->
   <!-- 1、添加 key 破坏服用机制 强制销毁重建 -->
   <!-- <router-view :key="$route.fullPath"></router-view> -->
   <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>