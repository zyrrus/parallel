import { useEffect, useState } from "react";
import { fireAuth } from "../fire";

export default function useErrors() {
    const [error, setError] = useState("");

    useEffect(() => {
        const observer = fireAuth.onAuthStateChanged(() => setError(""));
        return observer;
    }, []);

    return [error, setError];
}
