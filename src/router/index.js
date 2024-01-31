import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/pages/home.vue";
import booksPage from "@/pages/books.vue";
import notesPage from "@/pages/notes.vue";
import passwordsPage from "@/pages/passwords.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //manage pages according to history web site history
  routes:[
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/books',
      name: 'books',
      component: booksPage
    },
    {
      path: '/notes',
      name: 'notes',
      component: notesPage
    },
    {
      path: '/passwords',
      name: 'passwords',
      component: passwordsPage
    }
  ]
});

export default router
