<template>
  <div>
    <item-vue v-for="item in pexelsList" :key="item.id" :data="item"></item-vue>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import {ref} from 'vue'
let query = { page: 1, size: 20 }
const pexelsList = ref([])
const getPexelsData = async () => {
  let res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>

<style lang="scss" scoped></style>
