import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    Timestamp,
} from "firebase/firestore/lite";
import { fireDB } from "../fire";

export const postingHandler = async (user, postData, setError) => {
    const { title, body } = postData;
    const postsRef = collection(fireDB, "posts");
    await addDoc(postsRef, {
        title: title,
        body: body,
        username: user.displayName,
        uid: user.uid,
        timestamp: Timestamp.now(),
    });
};

export const getPostsHandler = async () => {
    const postsRef = collection(fireDB, "posts");
    const postsQuery = await getDocs(postsRef);
    return postsQuery.docs.map((doc) => {
        return {
            id: doc.id,
            post: doc.data(),
        };
    });
};

export const deletePostHandler = (id) => {
    const postRef = doc(fireDB, "posts", id);
    deleteDoc(postRef);
};
