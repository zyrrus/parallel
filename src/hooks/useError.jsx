import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "../fire";

export default function useErrors() {
    const [error, setError] = useState("");

    useEffect(() => {
        const observer = onAuthStateChanged(fireAuth, () => setError(""));
        return observer;
    }, []);

    return [error, setError];
}
