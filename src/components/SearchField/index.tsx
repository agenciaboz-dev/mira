import { TextField, Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"

interface SearchFieldProps {
    setProductsResult?: (values: Product[]) => void
    setCategoriesResult?: (values: Category[]) => void
    setSuppliersResult?: (values: Supplier[]) => void
    setOrdersResult?: (values: Order[]) => void
    productList?: Product[]
    categoryList?: Category[]
    supplierList?: Supplier[]
    orderList?: Order[]
    button?: React.ReactElement
}

export const SearchField: React.FC<SearchFieldProps> = ({
    setProductsResult: setProductResult,
    setCategoriesResult: setCategoryResult,
    setSuppliersResult: setSupplierResult,
    setOrdersResult: setOrderResult,
    productList,
    categoryList,
    supplierList,
    orderList,
    button = <></>,
}) => {
    const [value, setValue] = useState("")

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        if (productList && setProductResult)
            setProductResult(productList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())))
        if (categoryList && setCategoryResult)
            setCategoryResult(categoryList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())))
        if (supplierList && setSupplierResult)
            setSupplierResult(supplierList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())))
        if (orderList && setOrderResult)
            setOrderResult(orderList.filter((item) => item.user.name.toLowerCase().includes(value.toLowerCase())))
    }, [value])

    const Button = () => button

    return (
        <Box sx={{ gap: "1vw" }}>
            <TextField
                label="Buscar"
                value={value}
                onChange={handleChange}
                InputProps={{ startAdornment: <SearchIcon color="primary" /> }}
                placeholder="Digite para filtrar"
                inputProps={{ style: { paddingLeft: "0.5vw" } }}
            />
            <Button />
        </Box>
    )
}
