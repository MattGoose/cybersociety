import Firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyAQ5XT-wzp6UVkbbikigkcOn9RmbVvbL0I',
  authDomain: 'cyber-society.firebaseapp.com',
  databaseURL: 'https://cyber-society.firebaseio.com',
  projectId: 'cyber-society',
  storageBucket: 'cyber-society.appspot.com',
  messagingSenderId: '694736223821',
  appId: '1:694736223821:web:26e14f606b3a7e30dbe604',
  measurementId: 'G-CZ0JKVLM2S',
};
Firebase.initializeApp(firebaseConfig);
