<template>
  <div class="bg-white sticky left-0 w-full z-10">
    <ul
      class="w-[800px] m-auto relative flex flex-wrap justify-center px-[10px] py-1 text-base duration-300"
    >
      <!-- 右边箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
      >
        <m-svg-icon
          name="unfold"
          class="w-1 h-1"
          fillClass="fill-zinc-900"
        ></m-svg-icon>
      </div>
      <!-- item -->
      <li
        v-for="item in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-1 z-10 duration-200 text-zinc-900 mt-1 font-bold rounded cursor-pointer hover:bg-zinc-200"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
