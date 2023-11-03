<template>
  <div>
    <m-waterfall :data="pexelsList" nodeKey="id" :column="5" :picturePreReading="false">
      <template v-slot="{ item, width }">
        <item-vue :data="item"></item-vue>
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
import { getPexelsList } from '@/api/pexels'
import itemVue from './item.vue'
import { ref } from 'vue'
let query = { page: 1, size: 20 }
const pexelsList = ref([])
const getPexelsData = async () => {
  let res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>

<style lang="scss" scoped></style>
