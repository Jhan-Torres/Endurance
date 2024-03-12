<template>
  <div
    @click="handleSession"
    class="font-body text-center group relative inline-block overflow-hidden rounded border-4 bg-gray-300 px-6 py-1 font-bold text-slate-800 hover:text-violet-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white cursor-pointer"
  >
    <span class="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-violet-600 transition-all duration-200 group-hover:w-full" />
    <span class="ease absolute right-0 top-0 h-0 w-0 border-r-4 border-violet-600 transition-all duration-200 group-hover:h-full" />
    <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-4 border-violet-600 transition-all duration-200 group-hover:w-full" />
    <span class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-violet-600 transition-all duration-200 group-hover:h-full" />
      {{ buttonText }}
</div>
</template>

<script setup>
import { statusSession } from '@/firebase';
import { computed } from 'vue';
import router from '@/router';
import { useFirebaseAuth } from '@/composables/useFirebaseAuth';

const buttonText = computed(() => {
  return (statusSession.value === 'logged') ? 'LogOut' : 'LogIn';
});

function handleSession() {
  if (buttonText.value === 'LogIn') {
    router.push('/auth')
  } else {
    useFirebaseAuth().userLogout();
  }
}
</script>
