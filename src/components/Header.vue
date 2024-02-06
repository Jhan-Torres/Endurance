<template>
  <div class="bg-gray-900 p-0.5 md:p-0" >
    <fwb-navbar class="bg-gray-900 max-w-screen-xl mx-auto" >
      <template #logo>
        <fwb-navbar-logo 
          alt="Endurance logo" 
          image-url="/img/saturno.svg" 
          class="animate-pulse"
        >
          <h1 class="text-2xl tracking-wider font-normal font-title py-2 uppercase text-slate-100 lg:text-3xl">
            Endurance
          </h1>
        </fwb-navbar-logo>
      </template>
      <template 
        #default="{ isShowMenu }">
        <!-- navbar for small pages -->
        <fwb-navbar-collapse 
          :is-show-menu="isShowMenu" 
          class="top-10 right-0 z-10 animate-flip-down animate-once animate-duration-[750ms] md:hidden"
        > 
          <router-link 
            v-for="(route, index) in routesArray"
            :key="index"
            class="rounded-lg"
            :to="route.path"
          >
            <font-awesome-icon :icon="['fas', route.icon ]" class="ml-2 w-4 h-full" />
            <span class="uppercase font-body font-black py-1 mx-3 text-lg">
              {{route.name}}
            </span>
          </router-link>
          <fwb-button class="mx-auto min-w-56 mt-1">
            <span class="font-body font-light">Login</span>
          </fwb-button>
        </fwb-navbar-collapse>

        <!-- navbar for medium and large pages -->
        <fwb-navbar-collapse 
          :is-show-menu="isShowMenu" 
          class="hidden md:flex"
        > 
          <router-link
            v-for="(route, index) in routesArray"
            :key="index"
            :to="route.path"
          >
            <span class="uppercase font-body" >
              {{route.name}}
            </span>
          </router-link>
        </fwb-navbar-collapse>
      </template>
      <template #right-side>
        <fwb-button>
          <span class="font-body font-light">Login</span>
        </fwb-button>
      </template>
    </fwb-navbar>
  </div>
</template>

<script setup>
import {
  FwbButton,
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLogo,
} from 'flowbite-vue'

import { RouterLink } from 'vue-router';

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

</script>

<style scoped>
  /* to manage vue-router styles which are added automatically */
  .router-link-active {
    color: rgb(206, 100, 51) !important;
    text-decoration: underline !important;
  }

  /* background color to active route on small pages only */
  @media only screen and (width < 768px ){ 
    .router-link-active {
      background-color: rgb(255, 90, 31);
    }
  }

  /* when we have child routes */
  /* .router-link-exact-active {
    color: red;
  } */
</style>
