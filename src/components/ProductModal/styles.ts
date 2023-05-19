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
        padding: "4vw",

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
        position: "absolute",
        width: "5vw",
        height: "auto",
        top: "0.5vw",
        right: "-0.5vw"
    },
    cart_icon: { width: "4vw", height: "auto" },

    text: { textAlign: "justify", fontSize: "7vw" },
}
