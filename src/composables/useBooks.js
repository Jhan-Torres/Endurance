//Firebase imports
import { 
  collection, 
  onSnapshot, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  query, 
  orderBy
} from "firebase/firestore";
import { db } from '@/firebase';
import { ref } from "vue";

export function useBooks() {
  //firebase refs
  const booksCollectionRef = collection(db, 'books');
  const booksCollectionQuery = query(booksCollectionRef, orderBy('title', 'asc'));
  
  //data refs
  const booksList = ref([]);
  const booksDroppedList = ref([]);
  const showSpinner = ref(true);

  onSnapshot(booksCollectionQuery, (querySnapshot) => {
    const fbBooks = [];
    const fbBooksOnReading = [];
    querySnapshot.forEach((doc) => {
      //use conditional operator (?) cuz when we get data from firebase some fields are undefined, this will
      //throw error on edit actions, due we are using objects to store field´s values.  
      const book = {
        id: doc.id,
        title: doc.data().title,
        autor: (doc.data().autor) ? doc.data().autor : '',
        category: doc.data().category,
        link: (doc.data().link) ? doc.data().link : '',
        status: (doc.data().status) ? doc.data().status : '',
      }
      fbBooks.push(book);
      
      if(doc.data().status === 'reading') {
        fbBooksOnReading.push(book);
      }
    });
    booksList.value = fbBooks;
    booksDroppedList.value = fbBooksOnReading;
    showSpinner.value = false;
  });

  //add new book
  async function addBook(book) {
    // Add a new document with a generated ID to firebase.
    await addDoc(booksCollectionRef, book);
  }

  async function deleteBook(bookId) {
    //delete a document with its id from firebase. 
    await deleteDoc(doc(booksCollectionRef, bookId));
  }

  async function updateBook(book) {
    //on book parameter (object) we have the ID field within
    await updateDoc(doc(booksCollectionRef, book.id), book);
  }

  return {
    booksList,
    booksDroppedList,
    showSpinner,
    addBook,
    deleteBook,
    updateBook
  }
}
