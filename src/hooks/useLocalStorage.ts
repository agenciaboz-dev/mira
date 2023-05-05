export const useLocalStorage = () => {
    const storage = {
        get: (key: string) => JSON.parse(localStorage.getItem(key) || "false"),
        set: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
    }

    return storage
}
