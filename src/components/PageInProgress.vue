<template>
  <div class="flex flex-col justify-center items-center px-1">
    <h1 class="font-body text-3xl uppercase font-bold text-center text-shadow shadow-blue-600">
      [<span class="text-[#FF1F00]">{{ props.pageName }} page</span> in progress]
    </h1>
    <div>
      <img 
        src="/img/Landing_page_animation.gif" 
        alt="gif by Storyset" 
        class="rounded-3xl h-[50vh]"
      >
    </div>
    <a 
      href="https://storyset.com/work" 
      class="italic text-xs"
      target="_blank"
      rel="noopener"
    >
      Work illustrations by Storyset
    </a>
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
