<script setup>
import {
  FwbTableCell,
  FwbTableRow,
} from 'flowbite-vue'
import { ref } from 'vue';

const text = ref(false);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const goToWebSite = () => {
  const a = document.createElement('a');
  a.href = `https://${props.data.url}`;
  a.target = '_blank';
  a.click();
};

const copyPassword = async () => {
  text.value = true;
  await navigator.clipboard.writeText(props.data.password);
  setTimeout(() => {
    text.value = false;
  }, 300);
}

</script>

<template>
  <fwb-table-row>
    <fwb-table-cell
      class="cursor-pointer hover:bg-slate-200"
      @click="goToWebSite"
    >
      <span class="text-xs lg:text-sm hover:underline">
        {{ props.data.site }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell>
      <span class="text-xs lg:text-sm">
        {{ props.data.user }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell
      class="cursor-pointer select-none hover:bg-slate-200"
      @click="copyPassword"
    >
      <span
        v-if="text" 
        class="text-xs lg:text-sm"
      >
        ¡copied!
      </span>
      <span
        v-else 
        class="text-xs lg:text-sm"
      >
        ********
      </span>
    </fwb-table-cell>
    <fwb-table-cell>
      <span class="text-xs lg:text-sm">
        {{ props.data.category }}
      </span>
    </fwb-table-cell>
    <fwb-table-cell 
      class="space-x-2"
    >
      <font-awesome-icon 
        :icon="['fas', 'trash']" 
        :style="{color: 'rgb(190, 11, 11)'}"
        class="hover:scale-125 hover:cursor-pointer duration-100"
      />
      <font-awesome-icon 
        :icon="['fas', 'pen']" 
        :style="{color: 'rgb(100, 100, 255)'}"
        class="hover:scale-125 hover:cursor-pointer duration-100"
      />
    </fwb-table-cell>
  </fwb-table-row>
</template>