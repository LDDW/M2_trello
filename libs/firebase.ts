import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxwcVmlUvR9k2MfSk5mWlpbO7oxw045rc",
  authDomain: "trello-react-native-d4d37.firebaseapp.com",
  projectId: "trello-react-native-d4d37",
  storageBucket: "trello-react-native-d4d37.appspot.com",
  messagingSenderId: "599170886508",
  appId: "1:599170886508:web:15d81b65df2c59d1b56149",
  measurementId: "G-1XTR2CHMZG",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);