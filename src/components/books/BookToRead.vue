<template>
  <div 
    class="flex items-center justify-center rounded-xl overflow-hidden shadow-xl shadow-gray-700 animate-fade-up animate-duration-1000 animate-delay-[250ms]" 
    :class="categoryColor, {'text-gray-300':(categoryColor === 'bg-[#00202e]') || (categoryColor === 'bg-[#003f5c]') || (categoryColor === 'bg-[#2c4875]')}"
    >
    <div class="group h-52 w-40 [perspective:1000px]">
      <div 
        class="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d]"
        @click="rotateCard = !rotateCard"
        :class="{'[transform:rotateY(180deg)]': rotateCard}"
      >
        <div class="flex flex-col">  
          <h2 class="text-center text-xl uppercase mt-3 font-bold">
            {{props.bookDropped.title}}
          </h2>
          <h4 class="text-center mt-4 lowercase">
            {{props.bookDropped.autor}}
          </h4>
        </div>
        <div class="absolute inset-0 h-full w-full rounded-xl bg-gray-900 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div class="static flex mt-14 flex-col items-center justify-center">
            <p class="text-nowrap">
              <a 
                v-if="props.bookDropped.link"
                :href="props.bookDropped.link"
                class="underline" 
                target="_blank"
              >
                LINK
              </a>
              <a v-else> NO LINK </a>
            </p>
            <div class="flex gap-5 items-center absolute bottom-5">
              <button 
                class="hover:scale-125 transition duration-200"
                @click="deleteDroppedBook"
              > 
                <font-awesome-icon :icon="['fas', 'trash']" :style="{color: 'rgb(190, 11, 11)'}" class="h-8 w-8"/>
              </button>
              <button 
                class="hover:scale-125 transition duration-200"
                @click="finishDroppedBook"
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
import { onMounted, ref } from 'vue';
import { useBooksColors } from '@/composables/useNames';

const categoryColor = ref('');

onMounted(() => {
  categoryColor.value = listCategoriesColors[props.bookDropped.category];
});

const props = defineProps({
  bookDropped: {
    type: Object,
    required: true
  },
  bookDroppedIndex: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(["deleteDroppedBook", "finishDroppedBook", "showAlert", "changeBookColor"]);

const rotateCard = ref(false);
const listCategoriesColors = useBooksColors();

function deleteDroppedBook() {
  emits("deleteDroppedBook", props.bookDroppedIndex);
  emits("showAlert", 'book deleted');
}

function finishDroppedBook() {
  emits("finishDroppedBook", props.bookDroppedIndex, props.bookDropped.id);
  emits("showAlert", 'Congrats!');
}
</script>
