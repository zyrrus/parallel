import { fireAuth, fireDB } from "./fire";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, collection, query, where, getDocs, setDoc } from "firebase/firestore/lite";


// Create user
export const handleSignUp = (username, email, password) => {
    createUserWithEmailAndPassword(fireAuth, email, password)
    .then(async (userCredential) => {
            /// Signed in 
            const user = userCredential.user;
            const usersRef = collection(fireDB, 'users');
            const userRef = doc(fireDB, 'users', user.uid);

            /// Validate username
            // Check if username exists
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size === 0) {
                // Username is available; Update db and create user
                console.log('Username doesnt exist');
                user.displayName = username; 
                await setDoc(userRef, {username: username});
                console.log('added', username);
            }
            else {
                console.log('Username already exists');
                deleteUser(user);
                console.log('deleting', username);
                // throw error
            }
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
}

// Get current user

// Get user profile

// Get provider-specific info (won't need)

// Update user profile

// Set user email

// Send user verification email

// Set user password

// Send password reset email

// Delete user

// Re-auth user

