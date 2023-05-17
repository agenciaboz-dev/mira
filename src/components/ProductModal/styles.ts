export const styles = {
    dialog: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2vw!important",
    },

    content_container: {
        display: "flex",
        width: "75vw",
        flexDirection: "column",
        gap: "2vw",

        ".info-container": {
            gap: "2vw",

            img: {
                width: "50%",
                aspectRatio: "1/1",
            },
            ".text-container": {
                width: "100%",
                flexDirection: "column",
                fontSize: "2vw",
                gap: "2vw",
            },
        },
        ".cart-container": {
            alignItems: "center",
        },
    },

    close_icon: {
        width: "2vw",
        height: "auto",
    },
    cart_icon: { width: "4vw", height: "auto" },

    text: { textAlign: "justify", fontSize: "7vw" },
}
