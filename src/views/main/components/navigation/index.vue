<template>
  <mobile-navigation-vue v-if="isMobileTerminal"></mobile-navigation-vue>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import mobileNavigationVue from './mobile/index.vue'
</script>

<style lang="scss" scoped>

</style>