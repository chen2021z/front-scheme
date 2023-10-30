<template>
  <div>
    mobile navigation
    test
  </div>
</template>

<script setup>
import { getCategory } from '@/api/category';
const getCategoryData = async () => {
  const res = await getCategory();
  console.log(res);
}
getCategoryData()
</script>

<style lang="scss" scoped>

</style>