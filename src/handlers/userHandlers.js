import { fireAuth, fireDB } from "../fire";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateProfile,
    signOut,
    deleteUser,
} from "firebase/auth";
import {
    doc,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    deleteDoc,
} from "firebase/firestore/lite";

// User sign up (create user)
export const signUpHandler = async (userData, setError, setIsSignedIn) => {
    const { email, username, password, account } = userData;

    // Check for invalid usernames
    const invalidSymbols = ["@"];
    let hasInvalidSymbol = false;
    invalidSymbols.forEach((symbol) => {
        if (!hasInvalidSymbol && username.includes(symbol)) {
            hasInvalidSymbol = true;
            setError("Username can't include:" + invalidSymbols.toString());
            return;
        }
    });

    // Check if username already exists
    const usersRef = collection(fireDB, "users");
    const q = query(usersRef, where("username", "==", username));
    const docSnap = await getDocs(q);

    // If the query returns nothing then the username is free to use
    if (docSnap.size !== 0) {
        setError("Username already exists");
        return;
    }

    // If the username is valid, then create new user
    createUserWithEmailAndPassword(fireAuth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userRef = doc(fireDB, "users", user.uid);

            // Update database with user info
            await updateProfile(user, {
                displayName: username,
                password: password,
            });

            await setDoc(userRef, {
                username: username,
                email: email,
                account: account,
            });

            setIsSignedIn(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
};

// User sign in
export const logInHandler = async (userData, setError, setIsSignedIn) => {
    const { input, password } = userData;
    let email;

    // Get email if given a username
    const isEmail = input.includes("@");
    if (!isEmail) {
        const q = query(
            collection(fireDB, "users"),
            where("username", "==", input)
        );
        const docSnap = await getDocs(q);
        if (docSnap.size !== 1) {
            // TODO: throw error
        } else email = docSnap.docs.at(0).get("email");
    }
    // Was given an email already
    else email = input;

    // Sign in with Firebase
    signInWithEmailAndPassword(fireAuth, email, password)
        .then((userCredential) => {
            setIsSignedIn(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
};

// Sign out
export const signOutHandler = (setIsSignedIn) => {
    signOut(fireAuth).then(setIsSignedIn(false));
};

// Delete profile
export const deleteHandler = async (
    user,
    password,
    setError,
    setIsSignedIn
) => {
    return await reauthHandler(user, password)
        .then(() => {
            // Delete account
            deleteUser(user);
            setIsSignedIn(false);
        })
        .then(() => {
            // Remove profile data from database
            const userRef = doc(fireDB, "users", user.uid);
            deleteDoc(userRef);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
};

// Get user profile

// Update user profile

// Set user email

// Send user verification email

// Set user password

// Send password reset email

// Reauthenticate user
export const reauthHandler = (user, password) => {
    const credentials = EmailAuthProvider.credential(user.email, password);
    return reauthenticateWithCredential(user, credentials);
};
