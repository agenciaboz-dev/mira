export const styles = {
    dialog: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        width: "40vw",
        maxWidth: "none",
    },

    title: {
        display: "flex",
        width: "100%",
        fontSize: "2vw",
        textAlign: "center",
        alignItems: "center",
        gap: "2vw",
        padding: "1vw",
        justifyContent: "center",
    },

    content_container: {
        width: "100%",
        paddingTop: "1vw!important",
        display: "flex",
        flexDirection: "column",
        form: {
            position: "relative",
            flexDirection: "column",
            gap: "1vw",
        },
    },

    close_icon: {
        width: "2vw",
        height: "auto",
    },

    text: { textAlign: "justify", fontSize: "7vw" },

    button: {
        position: "sticky",
        bottom: 0,
    },
}
