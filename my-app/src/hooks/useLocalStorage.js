import { useState, useEffect } from "react"
//stores all our budget information as we leave page and come back (not using a backend)

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue !== null) return JSON.parse(jsonValue)

        if (typeof defaultValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}