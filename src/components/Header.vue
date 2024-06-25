<template>
  <div class="bg-gray-800 p-0.5 select-none" >
    <fwb-navbar class="bg-gray-800 max-w-screen-xl mx-auto">
      <template #logo>
        <fwb-navbar-logo 
          alt="Endurance logo" 
          image-url="/img/saturno.svg" 
          class="animate-pulse"
          @click.prevent="goHome"
        >
          <h1 
            class="text-2xl tracking-wider font-normal font-title py-2 uppercase text-slate-100 lg:text-3xl"
          >
            Endurance
          </h1>
        </fwb-navbar-logo>
      </template>
      <template 
        #default="{ isShowMenu }">
        <!-- navbar for small pages -->
        <fwb-navbar-collapse 
          v-if="screenType === 'mobile'"
          :is-show-menu="isShowMenu"
          class="top-10 right-0 z-10 animate-flip-down animate-once animate-duration-[750ms] md:hidden"
        > 
          <router-link 
            v-for="(route, i) in routesArray"
            :key="i"
            class="rounded-lg my-0.5"
            :to="userLogged ? route.path : '' "
          >
            <font-awesome-icon 
              :icon="['fas', route.icon ]" 
              class="ml-2 w-4 h-full" 
            />
            <span class="uppercase font-body font-black py-1 mx-3 text-lg">
              {{route.name}}
            </span>
          </router-link>
          <div class="flex justify-center mt-2.5">
            <LoginButton />
          </div>
        </fwb-navbar-collapse>

        <!-- navbar for medium and large pages -->
        <fwb-navbar-collapse 
          v-else
          :is-show-menu="isShowMenu" 
          class="hidden md:flex"
        > 
          <router-link
            v-for="(route, index) in routesArray"
            :key="index"
            :to="userLogged ? route.path : '' "
            :class="{'cursor-not-allowed' : !userLogged}"
          >
            <span class="uppercase font-body font-bold tracking-wider" >
              {{route.name}}
            </span>
          </router-link>
        </fwb-navbar-collapse>
      </template>
      <template #right-side>
        <LoginButton />
      </template>
    </fwb-navbar>
  </div>
</template>

<script setup>
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLogo,
} from 'flowbite-vue'

import { RouterLink } from 'vue-router';
import LoginButton from './LoginButton.vue';

import getScreenWidth from '@/composables/useScreenWidth';
const screenType = getScreenWidth();

import { computed } from 'vue';
import { statusSession } from '@/firebase';
import router from '@/router';
const userLogged = computed(() => {
  return (statusSession.value === 'logged')  ? true : false;
})

//web site rutes array, which contains route's name and its icons respectively according to fontawesome library
const routesArray = [
  {
    name: 'books',
    icon: 'book',
    path: '/books'
  },
  {
    name: 'notes',
    icon: 'note-sticky',
    path: '/notes'
  },
  {
    name: 'passwords',
    icon: 'key',
    path: '/passwords'
  },
  // {
  //   name: 'chat',
  //   icon: 'message',
  //   path: '/chat'
  // }
]

function goHome() {
  router.push('/');
}
</script>

<style scoped>
  /* to manage vue-router styles which are added automatically */
  .router-link-active {
    color: rgb(255, 90, 31) !important;
  }

  /* background color to active route on small pages only */
  @media only screen and (width < 768px ){ 
    .router-link-active {
      background-color: rgb(219, 218, 218);
    }
  }

  /* when we have child routes */
  /* .router-link-exact-active {
    color: red;
  } */
</style>
