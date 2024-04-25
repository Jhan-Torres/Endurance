import { ref } from "vue";

export default class demoSection {
  //data
  booksData = ref([
    {
      title: "Book title 1",
      autor: "Autor 1",
      category: "programming",
      status: "reading",
    },
    {
      title: "Book title 2",
      autor: "Autor 2",
      category: "psychology",
    },
    {
      title: "Book title 3",
      autor: "Autor 3",
      category: "astronomy",
    },
    {
      title: "Book title 4",
      autor: "Autor 4",
      category: "research",
    },
  ])

  booksDropped = ref(this.booksData.value.filter(item => item?.status === "reading"));

  notesData = ref([
    {
      title: "Book 1",
      content: "Content 1",
      category: "programming",
    },
    {
      title: "Book 2",
      content: "Content 2",
      category: "course",
    },
    {
      title: "Book 3",
      content: "Content 3",
      category: "medicine",
    },
    {
      title: "Book 4",
      content: "Content 4",
      category: "tools",
    },
  ])

  //methods
  getData(key) {
    return this[key].value;
  }

  // getBooksDropped() {
  //   const response = this.booksData.value.filter(item => item?.status !== undefined)
  //   return response;
  // }

  add(place, value) {
    this[place].value.push(value);
  }

  delete(place, value) {
    this[place].value = this[place].value.filter(item => item != value);
  }

  update(place, newValue, indexOld) {
    this[place].value.splice(indexOld, 1, newValue);
  }
}