import Firebase from 'firebase';
import {firebaseConfig} from '../database/Firebase';
import React, {useState, useEffect, createContext} from 'react';
import LoginNav from './LoginNav';
import LogoutNav from './LogoutNav';

const AuthContext = createContext(null);

export default function AuthNav() {
  // initializing state variable keeps track of changes in authentication state
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state change and subscribe to auth changes when component is mounted
  useEffect(() => {
    const authSubscriber = Firebase.auth().onAuthStateChanged((result) => {
      setUser(result);
      if (initializing) {
        setInitializing(false);
      }
    });
    //unsubscribe on unmount
    return authSubscriber;
  }, [initializing]);

  if (initializing) {
    return null;
  }

  //directs to relevant stack dependant if user is logged in
  return user ? (
    <AuthContext.Provider value={user}>
      <LoginNav />
    </AuthContext.Provider>
  ) : (
    <LogoutNav />
  );
}
