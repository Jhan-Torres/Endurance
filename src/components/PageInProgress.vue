<template>
  <div class="flex flex-col justify-center items-center p-2">
    <h1 class="font-body text-3xl uppercase font-bold">
      [ <span class="text-[#FF1F00]">{{ props.pageName }} page</span> in progress ]
    </h1>
    <img src="../../public/img/Landing_page_animation.gif" alt="gif by Storyset" class="rounded-3xl">
    <a href="https://storyset.com/work" class="italic underline">Work illustrations by Storyset</a>
  </div>
</template>

<script setup>
const props = defineProps({
  pageName: {
    type: String,
    required: true
  }
})
</script>
