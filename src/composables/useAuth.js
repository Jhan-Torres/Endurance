//imports from firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

//imports from firebase file
import { userAuth } from '@/firebase';

export function useAuth() {
  //manage user login
  function userLogin(userCredentials) {
    //authenticate
    signInWithEmailAndPassword(userAuth, userCredentials.email, userCredentials.password)
    .then(() => {
      alert("login succed");
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return {
    userLogin,
  }
}