import { fireAuth, fireDB } from "../fire";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    deleteUser,
} from "firebase/auth";
import {
    doc,
    collection,
    query,
    where,
    getDocs,
    setDoc,
} from "firebase/firestore/lite";

// TODO: clear console.logs

// User sign up (create user)
export const handleSignUp = (username, email, password) => {
    createUserWithEmailAndPassword(fireAuth, email, password)
        .then(async (userCredential) => {
            /// Signed in
            const user = userCredential.user;
            const usersRef = collection(fireDB, "users");
            const userRef = doc(fireDB, "users", user.uid);

            // Check for invalid usernames
            const invalidSymbols = ["@"];
            let hasInvalidSymbol = false; // might not need
            invalidSymbols.forEach((symbol) => {
                if (!hasInvalidSymbol && username.includes(symbol))
                    // TODO: throw error
                    hasInvalidSymbol = true;
            });

            /// Validate username
            // Check if username exists
            const q = query(usersRef, where("username", "==", username));
            const docSnap = await getDocs(q);
            if (docSnap.size === 0) {
                // Username is available; Update db and create user
                console.log("Username doesnt exist");
                updateProfile(user, {
                    displayName: username,
                });
                user.displayName = username;
                await setDoc(userRef, { username: username, email: email });
                console.log("added", username);
            } else {
                console.log("Username already exists");
                deleteUser(user);
                console.log("deleting", username);
                // TODO: throw error
            }
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
};

// User sign in
export const handleLogIn = async (usernameOrEmail, password) => {
    let email;

    // Get email if given a username
    const isEmail = usernameOrEmail.includes("@");
    if (!isEmail) {
        const q = query(
            collection(fireDB, "users"),
            where("username", "==", usernameOrEmail)
        );
        const docSnap = await getDocs(q);
        if (docSnap.size !== 1) {
            // TODO: throw error
        } else email = docSnap.docs.at(0).get("email");
    }
    // Was given an email already
    else email = usernameOrEmail;

    // Sign in with Firebase
    signInWithEmailAndPassword(fireAuth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Signed in as:", user.displayName);
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
        });
};

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
