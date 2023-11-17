<template>
  <!-- 一级路由出口 -->
  <div class="h-screen w-screen fixed top-0 left-0">
    <m-transition-router-view
      mainComponentName="home"
      :routerType="$store.getters.routerType"
    ></m-transition-router-view>
  </div>
</template>
<script setup></script>
