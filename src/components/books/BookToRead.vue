<template>
  <div class="flex items-center justify-center rounded-xl overflow-hidden bg-[#4267B2] shadow-xl shadow-gray-700 animate-fade-up animate-duration-1000 animate-delay-[250ms] ">
    <div class="group h-52 w-40 [perspective:1000px]">
      <div class="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div class="flex flex-col">  
          <h2 class="text-center text-2xl uppercase p-3 font-semibold">
            {{props.bookDropped.title}}
          </h2>
          <h4 class="text-center px-2 mt-4 lowercase">
            {{props.bookDropped.autor}}
          </h4>
        </div>
        <div class="absolute inset-0 h-full w-full rounded-xl bg-gray-900 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div class="static flex mt-14 flex-col items-center justify-center">
            <p class="text-nowrap">
              <a href="" class="underline" target="_blank">
              PDF LINK
            </a>
            </p>
            <div class="flex gap-2 items-center absolute bottom-5">
              <button 
                class="hover:scale-125 transition duration-200"
              > 
                <font-awesome-icon :icon="['fas', 'trash']" :style="{color: 'rgb(190, 11, 11)'}" class="h-8 w-8"/>
              </button>
              <button 
                class="hover:scale-125 transition duration-200" 
              >
                <font-awesome-icon :icon="['fas', 'circle-check']" :style="{color: 'rgb(80, 85, 230)'}" class="h-8 w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bookDropped: {
    type: Object,
    required: true
  },
})
</script>

<style scoped>

</style>
