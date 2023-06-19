import { Box, Paper, IconButton, Button, CircularProgress, Skeleton, Avatar } from "@mui/material"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import { SearchField } from "../../../components/SearchField"
import { useProducts } from "../../../hooks/useProducts"
import DataTable, { TableColumn } from "react-data-table-component"
import { CurrencyText } from "../../../components/CurrencyText"
import CurrencyFormat from "react-currency-format"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useCurrentProduct } from "../../../hooks/useCurrentProduct"
import AddIcon from "@mui/icons-material/Add"
import { useApi } from "../../../hooks/useApi"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { QrCodeModal } from "../../../components/QrcodeModal"
import CancelIcon from "@mui/icons-material/Cancel"
import { useNavigate } from "react-router-dom"

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { products, refresh } = useProducts()
    const { setCurrentProduct, setOpen } = useCurrentProduct()

    const [productList, setProductList] = useState(products)
    const [deleting, setDeleting] = useState(0)
    const [openQrModal, setOpenQrModal] = useState(false)

    const columns: TableColumn<Product>[] = [
        {
            name: "",
            selector: (row) => row.image,
            sortable: true,
            cell: (row) => (
                <Avatar src={row.image} sx={{ bgcolor: "transparent" }}>
                    <CancelIcon color="error" sx={{ width: "100%", height: "100%" }} />
                </Avatar>
            ),
            width: "5%",
        },
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "6%",
        },
        {
            name: "Nome",
            selector: (row) => row.name,
            sortable: true,
            width: "auto",
            cell: (row) => (
                <p
                    title={row.name}
                    onClick={() => navigate(`/dashboard/products/${row.id}`)}
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "27vw", overflow: "hidden" }}
                >
                    {row.name}
                </p>
            ),
        },
        {
            name: "Marca",
            selector: (row) => row.brand,
            sortable: true,
            width: "10%",
            cell: (row) => (
                <p
                    title={row.brand}
                    onClick={() => navigate(`/dashboard/products/${row.id}`)}
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "10vw", overflow: "hidden" }}
                >
                    {row.brand}
                </p>
            ),
        },
        {
            name: "Custo",
            selector: (row) => row.cost,
            sortable: true,
            width: "10%",
            cell: (row) => (
                <Box onClick={() => navigate(`/dashboard/products/${row.id}`)}>
                    <CurrencyText value={row.cost} />
                </Box>
            ),
        },
        {
            name: "Venda",
            selector: (row) => row.price,
            sortable: true,
            width: "10%",
            cell: (row) => (
                <Box onClick={() => navigate(`/dashboard/products/${row.id}`)}>
                    <CurrencyText value={row.price} />
                </Box>
            ),
        },
        {
            name: "QR Code",
            selector: (row) => row.id,
            button: true,
            cell: (row) => (
                <IconButton onClick={() => handleQrCode(row)}>
                    <QrCodeScannerIcon color="primary" />
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

    const handleSearch = (result: Product[]) => {
        setProductList(result)
    }

    const handleNew = () => {
        navigate("/dashboard/products/0")
    }

    const handleQrCode = (product: Product) => {
        setCurrentProduct(product)
        setOpenQrModal(true)
    }

    const handleEdit = (product: Product) => {
        setCurrentProduct(product)
        setOpen(true)
    }

    const handleDelete = (product: Product) => {
        confirm({
            content: "Deseja remover esse produto?",
            title: "Remover produto",
            onConfirm: () => {
                setDeleting(product.id)
                api.products.delete({
                    data: product,
                    callback: (response: { data: Product }) => {
                        refresh()
                        snackbar({
                            severity: "warning",
                            text: "Produto deletado",
                        })
                    },
                    finallyCallback: () => setDeleting(0),
                })
            },
        })
    }

    useEffect(() => {
        console.log(products)
        setProductList(products)
    }, [products])

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Box sx={styles.body}>
            <SearchField
                productList={products}
                setProductsResult={handleSearch}
                button={
                    <Button variant="contained" onClick={handleNew}>
                        <AddIcon />
                    </Button>
                }
            />
            <QrCodeModal open={openQrModal} setOpen={setOpenQrModal} />
            <Paper sx={styles.list} elevation={5}>
                {products.length > 0 ? (
                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        columns={columns}
                        data={productList}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight={"37.1vw"}
                        onRowClicked={(row) => navigate(`/dashboard/products/${row.id}`)}
                        customStyles={{
                            rows: { style: { cursor: "pointer" } },
                        }}
                    />
                ) : (
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "20vw" }} animation="wave" />
                )}
            </Paper>
        </Box>
    )
}
