import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

export function useValidations() {
  async function duplicate(dataToValidate, fieldName, collectionName) {
    //IN: data´s value to search, which field and what collection
    //OUT: true or false if data is duplicate

    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(fieldName, "==", dataToValidate));
    const querySnapshot = await getDocs(q);

    return querySnapshot.empty
  }

  return {
    duplicate,
  }
}