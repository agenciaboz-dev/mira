import { Box, Button, CircularProgress, IconButton, Paper, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { SearchField } from "../../../components/SearchField"
import { useSuppliers } from "../../../hooks/useSuppliers"
import AddIcon from "@mui/icons-material/Add"
import styles from "./../Products/styles"
import DataTable, { TableColumn } from "react-data-table-component"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import { useApi } from "../../../hooks/useApi"
import { useCurrentSupplier } from "../../../hooks/useCurrentSupplier"
import { SupplierModal } from "../../../components/SupplierModal"

interface SuppliersProps {}

export const Suppliers: React.FC<SuppliersProps> = ({}) => {
    const api = useApi()

    const { suppliers, refresh } = useSuppliers()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { currentSupplier, setCurrentSupplier, setOpen } = useCurrentSupplier()

    const [suppliersList, setSuppliersList] = useState(suppliers)
    const [deleting, setDeleting] = useState(0)

    const columns: TableColumn<Supplier>[] = [
        {
            name: "Código",
            selector: (row) => row.code,
            sortable: true,
            width: "25%",
        },
        {
            name: "Nome",
            selector: (row) => row.name,
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

    const handleEdit = (category: Supplier) => {
        setCurrentSupplier(category)
        setOpen(true)
    }

    const handleDelete = (category: Supplier) => {
        confirm({
            content: "Deseja remover esse produto?",
            title: "Remover produto",
            onConfirm: () => {
                setDeleting(category.id)
                api.suppliers.delete({
                    data: category,
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

    const handleSearch = (result: Supplier[]) => {
        setSuppliersList(result)
    }

    const handleNew = () => {
        setOpen(true)
    }

    useEffect(() => {
        console.log(suppliers)
        setSuppliersList(suppliers)
    }, [suppliers])

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Box sx={styles.body}>
            <SupplierModal />
            <SearchField
                supplierList={suppliers}
                setSuppliersResult={handleSearch}
                button={
                    <Button variant="contained" onClick={handleNew}>
                        <AddIcon />
                    </Button>
                }
            />
            <Paper sx={styles.list} elevation={5}>
                {suppliers.length > 0 ? (
                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        columns={columns}
                        data={suppliersList}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight={"37.1vw"}
                    />
                ) : (
                    <Skeleton variant="rectangular" sx={{ width: "100%", height: "40vw" }} animation="wave" />
                )}
            </Paper>
        </Box>
    )
}
