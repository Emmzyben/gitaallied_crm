import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyA9r134yHt6cgfrU3T97dRiHGXjBgyQhtw",
  authDomain: "brightway-7c577.firebaseapp.com",
  databaseURL: "https://brightway-7c577-default-rtdb.firebaseio.com",
  projectId: "brightway-7c577",
  storageBucket: "brightway-7c577.appspot.com",
  messagingSenderId: "810408721658",
  appId: "1:810408721658:web:9056b84ec0cb21fb1b5d43",
  measurementId: "G-9Y8CTHFKK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Cloud Storage
const database = getDatabase(app); // Initialize Realtime Database

// Export the initialized services for use in other parts of your app
export { app, analytics,storage, database };
