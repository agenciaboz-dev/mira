export const useValidadeCode = () => {
    const validate = (text: string) => {
        const splitted = text.split("/")

        if (splitted.length == 2) {
            if (splitted[0] == "mirasuprimentos") {
                return true
            } else {
                return
            }
        } else {
            return
        }
    }

    return validate
}
