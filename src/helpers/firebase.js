import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBVGkWJS_v5urY3o5P6c_AH6Nj-HLWBCOo",
  authDomain: "image-uploader-f5353.firebaseapp.com",
  projectId: "image-uploader-f5353",
  storageBucket: "image-uploader-f5353.appspot.com",
  messagingSenderId: "926864846544",
  appId: "1:926864846544:web:e8f7f7624f235f2412f8d5",
  measurementId: "G-CEF9G0ZVKH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)