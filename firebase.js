import { initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDVnI2Jm2b4FhJBgUnmicosPmf-eZD3xOI",
    authDomain: "chat-89649.firebaseapp.com",
    projectId: "chat-89649",
    storageBucket: "chat-89649.appspot.com",
    messagingSenderId: "708036451155",
    appId: "1:708036451155:web:85f2f3ce9a491f4b979fa6",
    measurementId: "G-4CJJ3P3GG4"
}

initializeApp(firebaseConfig);
export const database = getFirestore();