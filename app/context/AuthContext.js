import React, { createContext, useState, useEffect, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

// Create a Context for Auth
const AuthContext = createContext();

// AuthProvider Component
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize with null

    // Function to handle Google Sign-In
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // Handle result if needed
            console.log(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to handle Sign-Out
    const logOut = async () => {
        try {
            await signOut(auth);
            // Handle sign-out if needed
            console.log('Signed out');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const UserAuth = () => {
    return useContext(AuthContext);
};
