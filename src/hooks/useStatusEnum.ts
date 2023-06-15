import colors from "../colors"

export const useStatusEnum = () => {
    const status = {
        "0": {
            title: "Aguardando",
            color: "yellow",
        },
        "1": {
            title: "Recusado",
            color: "red",
        },
        "2": {
            title: "Pago",
            color: "green",
        },
        "3": {
            title: "Entrega",
            color: "yellow",
        },
        "4": {
            title: "Concluído",
            color: "green",
        },
    }

    return status
}
