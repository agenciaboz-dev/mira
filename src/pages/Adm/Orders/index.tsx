import { Box, Button, CircularProgress, IconButton, Paper, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { SearchField } from "../../../components/SearchField"
import { useOrders } from "../../../hooks/useOrders"
import AddIcon from "@mui/icons-material/Add"
import styles from "./../Products/styles"
import DataTable, { TableColumn } from "react-data-table-component"
import ForwardIcon from "@mui/icons-material/Forward"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()

    const { orders, refresh } = useOrders()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [ordersList, setOrdersList] = useState(orders)
    const [deleting, setDeleting] = useState(0)

    const columns: TableColumn<Order>[] = [
        {
            name: "Pedido",
            selector: (row) => row.id,
            sortable: true,
            width: "8%",
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            width: "15%",
        },
        {
            name: "Data",
            selector: (row) => new Date(row.date).toLocaleString(),
            sortable: true,
            width: "15%",
        },
        {
            name: "Nome do cliente",
            selector: (row) => row.name,
            sortable: true,
            width: "15%",
            cell: (row) => (
                <p
                    title={row.name}
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "15vw", overflow: "hidden" }}
                >
                    {row.name}
                </p>
            ),
        },
        {
            name: "Usuário",
            selector: (row) => row.user.name,
            sortable: true,
            width: "15%",
            cell: (row) => (
                <p
                    title={row.user.name}
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "15vw", overflow: "hidden" }}
                >
                    {row.user.name}
                </p>
            ),
        },
        {
            name: "Visualizar",
            selector: (row) => row.id,
            button: true,
            cell: (row) => (
                <IconButton onClick={() => navigate(`/dashboard/orders/${row.id}`)}>
                    <ForwardIcon color="primary" />
                </IconButton>
            ),
        },
    ]

    const handleDelete = (category: Order) => {
        confirm({
            content: "Deseja remover esse produto?",
            title: "Remover produto",
            onConfirm: () => {
                setDeleting(category.id)
                // api.orders.delete({
                //     data: category,
                //     callback: (response: { data: Product }) => {
                //         refresh()
                //         snackbar({
                //             severity: "warning",
                //             text: "Produto deletado",
                //         })
                //     },
                //     finallyCallback: () => setDeleting(0),
                // })
            },
        })
    }

    const handleSearch = (result: Order[]) => {
        setOrdersList(result)
    }

    const handleNew = () => {
        // setOpen(true)
    }

    useEffect(() => {
        console.log(orders)
        setOrdersList(orders)
    }, [orders])

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Box sx={styles.body}>
            <SearchField orderList={orders} setOrdersResult={handleSearch} />
            <Paper sx={styles.list} elevation={5}>
                {orders.length > 0 ? (
                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        columns={columns}
                        data={ordersList}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight={"37.1vw"}
                    />
                ) : (
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "20vw" }} animation="wave" />
                )}
            </Paper>
        </Box>
    )
}
