import { useSnackbar } from "burgos-snackbar"

export const useWsReload = () => {
    const { snackbar } = useSnackbar()

    const reload = (time: number) => {
        snackbar({
            severity: "info",
            text: `O servidor solicitou uma atualização. Sua página será recarregada em ${time / 1000} segundos.`,
        })

        setTimeout(() => window.location.reload(), time)
    }

    return reload
}
