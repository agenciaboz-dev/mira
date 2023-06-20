import colors from "../colors"

export const useStatusEnum = () => {
    const status = [
        {
            title: "Aguardando",
            color: "yellow",
        },
        {
            title: "Recusado",
            color: "red",
        },
        {
            title: "Pago",
            color: "green",
        },
        {
            title: "Entrega",
            color: "yellow",
        },
        {
            title: "Concluído",
            color: "green",
        },
        {
            title: "Erro",
            color: "red",
        },
        {
            title: "Cancelado",
            color: "red",
        },
    ]

    return status
}
