<template>
  <div>
    <m-waterfall class="p-1 w-full"  :data="pexelsList" nodeKey="id" :column="isMobileTerminal ? 2 : 5" :picturePreReading="true" :rowSpacing="10">
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
import { isMobileTerminal } from '@/utils/flexible';

let query = { page: 1, size: 20 }
const pexelsList = ref([])
const getPexelsData = async () => {
  let res = await getPexelsList(query)
  pexelsList.value = res.list
}
getPexelsData()
</script>

<style lang="scss" scoped></style>
