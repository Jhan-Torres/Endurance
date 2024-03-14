<template>
  <div
    @click="handleSession"
    class="font-body text-center group relative inline-block overflow-hidden rounded border-4 bg-gray-300 px-6 py-1 font-bold text-slate-800 focus:outline-none focus:ring active:text-white cursor-pointer"
    :class="{'hover:text-violet-600 active:bg-indigo-600' : buttonText === 'LogIn', 
    'hover:text-red-500 active:bg-red-400' : buttonText === 'LogOut'}"
  >
    <span 
      class="ease absolute left-0 top-0 h-0 w-0 border-t-2  transition-all duration-200 group-hover:w-full" 
      :class="{'border-violet-600' : buttonText === 'LogIn', 'border-red-500' : buttonText === 'LogOut'}"
    />
    <span 
      class="ease absolute right-0 top-0 h-0 w-0 border-r-4 transition-all duration-200 group-hover:h-full" 
      :class="{'border-violet-600' : buttonText === 'LogIn', 'border-red-500' : buttonText === 'LogOut'}"
    />
    <span 
      class="ease absolute bottom-0 right-0 h-0 w-0 border-b-4 transition-all duration-200 group-hover:w-full" 
      :class="{'border-violet-600' : buttonText === 'LogIn', 'border-red-500' : buttonText === 'LogOut'}"
    />
    <span 
      class="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 transition-all duration-200 group-hover:h-full" 
      :class="{'border-violet-600' : buttonText === 'LogIn', 'border-red-500' : buttonText === 'LogOut'}"
    />
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
    router.replace({name : 'auth'})
  } else {
    useFirebaseAuth().userLogout();
  }
}
</script>
