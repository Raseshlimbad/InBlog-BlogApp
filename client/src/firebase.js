// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import dotenv from 'dotenv';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// dotenv.config();

// console.log(import.meta.env.VITE_FIREBASE_API_KEY)
// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // apiKey: process.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyBH_EuuILkaZc7bFKjQjFkA6F-2GGZnp8Q",
  authDomain: "inblog-39e46.firebaseapp.com",
  projectId: "inblog-39e46",
  storageBucket: "inblog-39e46.appspot.com",
  messagingSenderId: "967748853211",
  appId: "1:967748853211:web:ac15bf089a22730622dbfe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);