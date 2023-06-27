export const styles = {
    dialog: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2vw!important",
    },

    content_container: {
        display: "flex",
        width: "85vw",
        flexDirection: "column",
        gap: "2vw",
        padding: "4vw",
        fontSize: "2.5vw",
        ".carousel-container": {
            width: "100%",
            padding: "0.5vw",

            ".carousel": {
                borderRadius: "3vw",
            },
        },
        ".info-container": {
            gap: "2vw",

            img: {
                aspectRatio: "1/1",
                borderRadius: "3vw",
            },
            ".text-container": {
                width: "100%",
                flexDirection: "column",
                gap: "2vw",
                color: "#555555",
            },
        },
        ".specs-container": {
            flexDirection: "column",
            width: "100%",
        },
        ".story-container": {
            overflowY: "auto",
            height: "15vh",
            color: "#555555",
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
        right: "-0.5vw",
    },
    cart_icon: { width: "4vw", height: "auto" },

    text: { textAlign: "justify", fontSize: "7vw" },
}
