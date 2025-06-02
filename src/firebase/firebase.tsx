// firebase.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, Analytics } from 'firebase/analytics';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA9r134yHt6cgfrU3T97dRiHGXjBgyQhtw',
  authDomain: 'brightway-7c577.firebaseapp.com',
  databaseURL: 'https://brightway-7c577-default-rtdb.firebaseio.com',
  projectId: 'brightway-7c577',
  storageBucket: 'brightway-7c577.appspot.com',
  messagingSenderId: '810408721658',
  appId: '1:810408721658:web:9056b84ec0cb21fb1b5d43',
  measurementId: 'G-9Y8CTHFKK3',
};

// Initialize Firebase App
const app: FirebaseApp = initializeApp(firebaseConfig);

// Optionally initialize Analytics (only works in the browser)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Cloud Storage and Realtime Database
const storage: FirebaseStorage = getStorage(app);
const database: Database = getDatabase(app);

// Export services
export { app, analytics, storage, database };
