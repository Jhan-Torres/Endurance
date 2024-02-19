import { readonly } from "vue";

export function useBooksCategories() {
  //In: Nothing
  //Out: Array of categories names used on Books page

  return [
    'Astronomy',
    'Hacking',
    'Life Style',
    'Programming',
    'Psychology',
    'Research',
    'Science',
    'Others',
  ]
}

export function useNotesCategories() {
  //In: Nothing
  //Out: Array of categories names used on Notes page
  
  return [
    { name: 'Course' },
    { name: 'Entertainment' },
    { name: 'Hacking' },
    { name: 'Medicine' },
    { name: 'Research' },
    { name: 'Programming' },
    { name: 'Tools' },
    { name: 'Others' },
  ]
}

export function useBooksTableHeads() {
  //In: Nothing
  //Out: Array of heads names used on Books page table

  return [
    'Title',
    'Autor',
    'Category',
    '', //empty space on table head
  ]
}