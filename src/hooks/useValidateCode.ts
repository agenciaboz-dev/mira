export const useValidadeCode = () => {
    const validate = (text: string) => {
        const base = "https://play.google.com/store/apps/details?id=com.mira.guide&?pid=1000"
        const splitted = text.split("&?pid=")

        if (splitted.length == 2) {
            if (splitted[0] == "https://play.google.com/store/apps/details?id=com.mira.guide" && !!Number(splitted[1])) {
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
