import { Box, Button, CircularProgress, IconButton, Paper, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { SearchField } from "../../../components/SearchField"
import { useOrders } from "../../../hooks/useOrders"
import AddIcon from "@mui/icons-material/Add"
import styles from "./../Products/styles"
import DataTable, { TableColumn } from "react-data-table-component"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import { useApi } from "../../../hooks/useApi"

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = ({}) => {
    const api = useApi()

    const { orders, refresh } = useOrders()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [ordersList, setOrdersList] = useState(orders)
    const [deleting, setDeleting] = useState(0)

    const columns: TableColumn<Order>[] = [
        {
            name: "Nome",
            selector: (row) => row.user.name,
            sortable: true,
            // width: "25%",
        },
        {
            name: "Editar",
            selector: (row) => row.id,
            button: true,
            cell: (row) => (
                <IconButton onClick={() => handleEdit(row)}>
                    <EditIcon color="primary" />
                </IconButton>
            ),
        },
        {
            name: "Deletar",
            selector: (row) => row.id,
            button: true,
            cell: (row) =>
                deleting == row.id ? (
                    <CircularProgress size="1.2rem" color="error" />
                ) : (
                    <IconButton onClick={() => handleDelete(row)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                ),
        },
    ]

    const handleEdit = (category: Order) => {}

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
            <SearchField
                orderList={orders}
                setOrdersResult={handleSearch}
                button={
                    <Button variant="contained" onClick={handleNew}>
                        <AddIcon />
                    </Button>
                }
            />
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
