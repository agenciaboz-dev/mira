export const useValidadeCode = () => {
    const validate = (text: string) => {
        const splitted = text.split("?id=")

        if (splitted.length == 2) {
            if (splitted[0] == "https://app.mirasuprimentos.com.br/download" && !!Number(splitted[1])) {
                return Number(splitted[1])
            } else {
                return
            }
        } else {
            return
        }
    }

    return validate
}
