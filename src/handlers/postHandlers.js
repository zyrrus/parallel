import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { fireDB } from "../fire";

export const postingHandler = async (user, postData, setError) => {
    const { title, body } = postData;
    const postsRef = collection(fireDB, "posts");
    await addDoc(postsRef, {
        title: title,
        body: body,
        username: user.displayName,
        useruid: user.uid,
    });
};

export const getPostsHandler = async () => {
    const postsRef = collection(fireDB, "posts");
    const postsQuery = await getDocs(postsRef);
    // console.log(postsQuery.docs.map((doc) => doc.data()));
    return postsQuery.docs.map((doc) => doc.data());
};
