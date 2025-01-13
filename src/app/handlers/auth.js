import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.config"

const provider = new GoogleAuthProvider()

const FirebaseAuth = {
    signIn: () => {
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then(response => {
                    resolve(response.user);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    signOut: () => {
        return new Promise((resolve, reject) => {
            signOut(auth)
                .then(() => {
                    console.log("User logged out");
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    getCurrentUser: () => {
        return new Promise(resolve => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                resolve(user);
            });
            // Return a cleanup function to unsubscribe from the listener
            return () => unsubscribe();
        });
    }
};

export default FirebaseAuth;
