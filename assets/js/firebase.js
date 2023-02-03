// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh5bxTEPhyg4A2S5B8tnMmlMd5Pd3aEXo",
  authDomain: "reklame-b464e.firebaseapp.com",
  projectId: "reklame-b464e",
  storageBucket: "reklame-b464e.appspot.com",
  messagingSenderId: "467274470459",
  appId: "1:467274470459:web:737ce00c9b18461fb7781e",
  measurementId: "G-SX20GKY45C",
  databaseURL:
    "https://reklame-b464e-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export async function getData(tableName) {
  return await get(ref(db, tableName))
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch((err) => {
      return err;
    });
}

export function insertData(tableName, objData) {
  return set(push(child(ref(db), tableName)), objData);
}

export function updateData(tableName, objData, keyTable) {
  const updates = {};
  updates[tableName + "/" + keyTable] = objData;
  return update(ref(db), updates);
}

export function deleteData(tableName, keyTable) {
  return remove(child(ref(db), `${tableName}/${keyTable}`));
}

export async function login(username, password) {
  return await getData("users").then((users) => {
    for (const key in users) {
      if (Object.hasOwnProperty.call(users, key)) {
        const user = users[key];
        console.log(user, key);
        if (user.username == username && user.password == password) {
          return { status: true, user };
        }
      }
    }
  });
}
