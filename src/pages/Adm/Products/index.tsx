import { Box, Paper, IconButton, Button, CircularProgress, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import { SearchField } from "../../../components/SearchField"
import { useProducts } from "../../../hooks/useProducts"
import { Product } from "../../../definitions/product"
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

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = ({}) => {
    const api = useApi()

    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { products, refresh } = useProducts()
    const { setCurrentProduct, setOpen } = useCurrentProduct()

    const [productList, setProductList] = useState(products)
    const [deleting, setDeleting] = useState(0)
    const [openQrModal, setOpenQrModal] = useState(false)

    const columns: TableColumn<Product>[] = [
        {
            name: "Nome",
            selector: (row) => row.name,
            sortable: true,
            width: "25%",
        },
        {
            name: "Preço",
            selector: (row) => row.price,
            sortable: true,
            cell: (row) => <CurrencyText value={row.price} />,
        },
        {
            name: "Estoque",
            selector: (row) => row.stock,
            sortable: true,
            cell: (row) => (
                <CurrencyFormat
                    value={row.stock}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={false}
                    prefix={""}
                />
            ),
        },
        {
            name: "Volume",
            selector: (row) => row.id,
            sortable: true,
            cell: (row) => (
                <p>
                    {row.width} x {row.height} x {row.length} cm
                </p>
            ),
        },
        {
            name: "Peso",
            selector: (row) => row.id,
            sortable: true,
            cell: (row) => <p>{row.weight} kg</p>,
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

    const handleSearch = (result: Product[]) => {
        setProductList(result)
    }

    const handleNew = () => {
        setOpen(true)
    }

    const handleEdit = (product: Product) => {
        setCurrentProduct(product)
        setOpen(true)
    }

    const handleQrCode = (product: Product) => {
        setCurrentProduct(product)
        setOpenQrModal(true)
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

    return (
        <Box sx={styles.body}>
            <SearchField
                list={products}
                onSearch={handleSearch}
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
                    />
                ) : (
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "20vw" }} animation="wave" />
                )}
            </Paper>
        </Box>
    )
}
