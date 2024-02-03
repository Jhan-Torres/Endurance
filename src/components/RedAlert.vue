<template>
  <span class="relative flex h-3 w-3" >
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
    <span class="relative inline-flex rounded-full h-3 w-3 bg-red-300" />
  </span>
  <h1
    class="uppercase font-body tracking-wider font-extrabold text-2xl text-red-600 bg-red-200 rounded-lg px-3 py-1 ml-2 animate-pulse"
  >
    {{ props.text }}
  </h1>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }  
})
</script>
