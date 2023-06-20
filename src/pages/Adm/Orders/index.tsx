import { Box, Button, CircularProgress, IconButton, Paper, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { SearchField } from "../../../components/SearchField"
import { useOrders } from "../../../hooks/useOrders"
import styles from "./../Products/styles"
import DataTable, { TableColumn } from "react-data-table-component"
import { useNavigate } from "react-router-dom"
import { useStatusEnum } from "../../../hooks/useStatusEnum"
import { CurrencyText } from "../../../components/CurrencyText"
import CircleIcon from "@mui/icons-material/Circle"

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = ({}) => {
    const navigate = useNavigate()
    const statusEnum = useStatusEnum()

    const { orders, refresh } = useOrders()

    const [ordersList, setOrdersList] = useState(orders)

    const columns: TableColumn<Order>[] = [
        {
            name: "Pedido",
            selector: (row) => row.id,
            sortable: true,
            width: "8%",
        },
        {
            name: "Data",
            selector: (row) => new Date(row.date).toLocaleString(),
            sortable: true,
            // width: "15%",
        },
        {
            name: "Nome do cliente",
            selector: (row) => row.name,
            sortable: true,
            // width: "15%",
            cell: (row) => (
                <p
                    title={row.name}
                    onClick={() => navigate(`/dashboard/orders/${row.id}`)}
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
            // width: "15%",
            cell: (row) => (
                <p
                    title={row.user.name}
                    onClick={() => navigate(`/dashboard/orders/${row.id}`)}
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "15vw", overflow: "hidden" }}
                >
                    {row.user.name}
                </p>
            ),
        },
        {
            name: "Valor",
            selector: (row) => row.value,
            sortable: true,
            // width: "10%",
            cell: (row) => (
                <Box onClick={() => navigate(`/dashboard/orders/${row.id}`)}>
                    <CurrencyText value={row.value} />
                </Box>
            ),
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            // width: "15%",
            cell: (row) => (
                <Box sx={{ gap: "0.6vw", alignItems: "center" }} onClick={() => navigate(`/dashboard/orders/${row.id}`)}>
                    <CircleIcon sx={{ width: "1vw", color: statusEnum[row.status].color }} />
                    <p>{statusEnum[row.status].title}</p>
                </Box>
            ),
        },
    ]

    const handleSearch = (result: Order[]) => {
        setOrdersList(result)
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
                        onRowClicked={(row) => navigate(`/dashboard/orders/${row.id}`)}
                        customStyles={{
                            rows: { style: { cursor: "pointer" } },
                        }}
                    />
                ) : (
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "40vw" }} animation="wave" />
                )}
            </Paper>
        </Box>
    )
}
