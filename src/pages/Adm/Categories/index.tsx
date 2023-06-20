import { Avatar, Box, Button, CircularProgress, IconButton, Paper, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { SearchField } from "../../../components/SearchField"
import { useCategories } from "../../../hooks/useCategories"
import AddIcon from "@mui/icons-material/Add"
import styles from "./../Products/styles"
import DataTable, { TableColumn } from "react-data-table-component"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"
import { useApi } from "../../../hooks/useApi"
import { useCurrentCategory } from "../../../hooks/useCurrentCategory"
import { CategoryModal } from "../../../components/CategoryModal"
import CancelIcon from "@mui/icons-material/Cancel"

interface CategoriesProps {}

export const Categories: React.FC<CategoriesProps> = ({}) => {
    const api = useApi()

    const { categories, refresh } = useCategories()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { currentCategory, setCurrentCategory, setOpen } = useCurrentCategory()

    const [categoriesList, setCategoriesList] = useState(categories)
    const [deleting, setDeleting] = useState(0)

    const columns: TableColumn<Category>[] = [
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

    const handleEdit = (category: Category) => {
        setCurrentCategory(category)
        setOpen(true)
    }

    const handleDelete = (category: Category) => {
        confirm({
            content: "Deseja remover esse produto?",
            title: "Remover produto",
            onConfirm: () => {
                setDeleting(category.id)
                api.categories.delete({
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

    const handleSearch = (result: Category[]) => {
        setCategoriesList(result)
    }

    const handleNew = () => {
        setOpen(true)
    }

    useEffect(() => {
        console.log(categories)
        setCategoriesList(categories)
    }, [categories])

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Box sx={styles.body}>
            <CategoryModal />
            <SearchField
                categoryList={categories}
                setCategoriesResult={handleSearch}
                button={
                    <Button variant="contained" onClick={handleNew}>
                        <AddIcon />
                    </Button>
                }
            />
            <Paper sx={styles.list} elevation={5}>
                {categories.length > 0 ? (
                    <DataTable
                        pagination
                        paginationComponentOptions={{
                            rowsPerPageText: "Linhas por página",
                            rangeSeparatorText: "de",
                            selectAllRowsItem: true,
                            selectAllRowsItemText: "Todos",
                        }}
                        columns={columns}
                        data={categoriesList}
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
