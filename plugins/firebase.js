import firebase  from "firebase/app";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlxYGl0YSl9_nxiNrNqgMypFSqjOKoE-4",
  authDomain: "pizza-nuxt-bf569.firebaseapp.com",
  projectId: "pizza-nuxt-bf569",
  storageBucket: "pizza-nuxt-bf569.appspot.com",
  messagingSenderId: "964311306712",
  appId: "1:964311306712:web:98ec4818d0d82dabd762ad"
};

let app = null
if(!firebase.app.length) {
  app = firebase.initializeApp(firebaseConfig);
}
 
export default firebase