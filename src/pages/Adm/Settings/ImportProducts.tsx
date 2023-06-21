import { ExtFile, FileCard, FileInputButton } from "@files-ui/react"
import { Box, Button, CircularProgress, Paper } from "@mui/material"
import React, { useEffect, useState } from "react"
import colors from "../../../colors"
import { useApi } from "../../../hooks/useApi"
import { read, utils } from "xlsx"
import { useSuppliers } from "../../../hooks/useSuppliers"
import { useCategories } from "../../../hooks/useCategories"
import { useSnackbar } from "burgos-snackbar"
import { useConfirmDialog } from "burgos-confirm"

interface ImportProductsProps {}

interface sheet {
    id?: number
    nome?: string
    custo?: number
    lucro?: number
    codigo_fornecedor?: string
    nome_fornecedor?: string
    marca?: string
    categorias?: string
    estoque_loja?: number
    estoque_galpao?: number
    preparo?: number
    unidade_preparo?: string
    peso?: number
    largura?: number
    altura?: number
    comprimento?: number
    descricao?: string
    como_usar?: string
    historia?: string
}

export const ImportProducts: React.FC<ImportProductsProps> = ({}) => {
    const api = useApi()

    const { suppliers } = useSuppliers()
    const { categories } = useCategories()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [files, setFiles] = useState<ExtFile[]>([])
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [newProducts, setNewProducts] = useState(0)
    const [updateProducts, setUpdateProducts] = useState(0)

    const handleUpload = () => {
        if (loading) return
        confirm({
            title: "Atenção",
            content: "Confirma a importação dessa lista?",
            onConfirm: () => {
                setLoading(true)

                const newProducts = products.filter((product: Product) => !product.id)
                const updateProducts = products.filter((product: Product) => product.id)
                const data = { newProducts, updateProducts }

                console.log(data)

                api.tools.importProducts({
                    data,
                    callback: (response: { data: Product[] }) => {
                        snackbar({ severity: "success", text: "Lista importada com sucesso" })
                    },
                    finallyCallback: () => setLoading(false),
                })
            },
        })
    }

    useEffect(() => {
        ;(async () => {
            if (files.length > 0 && !loading) {
                setLoading(true)
                const file = await files[0].file!.arrayBuffer()
                const wb = read(file) // parse the array buffer
                const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
                const data: sheet[] = utils.sheet_to_json<sheet>(ws)

                const parsed = data.map((product) => ({
                    id: product.id,
                    name: product.nome,
                    description: product.descricao,
                    brand: product.marca,
                    stock: product.estoque_loja,
                    stock_warehouse: product.estoque_galpao,
                    profit: product.lucro,
                    story: product.historia,
                    cost: product.custo,
                    usage: product.como_usar,
                    weight: product.peso,
                    width: product.largura,
                    height: product.altura,
                    length: product.comprimento,
                    preparation: product.preparo,
                    prep_unit: product.unidade_preparo == "segundos" ? 0 : 1,
                    supplier_id: suppliers.filter(
                        (supplier) =>
                            supplier.code.toLowerCase() == product.codigo_fornecedor?.toLowerCase() ||
                            supplier.name.toLowerCase() == product.nome_fornecedor?.toLowerCase()
                    )[0]?.id,
                    category: categories.filter(
                        (category) => category.name.toLowerCase() == product.categorias?.toLowerCase()
                    )[0],
                }))

                let products: any = []

                parsed.map((product) => {
                    let valid = false
                    delete product.category?.products
                    Object.entries(product).map(([key, value]) => {
                        if (value) valid = true
                    })
                    if (valid) products.push(product)
                })

                if (products.length == 0) {
                    // error
                } else {
                    const newProducts = products.filter((product: Product) => !product.id)
                    const updateProducts = products.filter((product: Product) => product.id)

                    setProducts(products)
                    setNewProducts(newProducts.length)
                    setUpdateProducts(updateProducts.length)
                }
                setLoading(false)
            }
        })()
    }, [files])
    return (
        <Paper sx={{ flexDirection: "column", gap: "1vw", padding: "1vw" }} elevation={3}>
            <FileInputButton
                onChange={(files) => setFiles(files)}
                value={files}
                behaviour="replace"
                label="Importar lista de produtos"
                accept=".xlsx"
                color={colors.primary}
                disabled={loading}
                // style={{ width: "12vw", padding: "0.5vw" }}
            />
            {files.length > 0 && (
                <>
                    <Box sx={{ gap: "1vw", alignItems: "center" }}>
                        <FileCard file={files[0].file} />
                        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                            {newProducts && (
                                <p>
                                    Cadastrar <span style={{ color: "red" }}>{newProducts}</span> novos produtos
                                </p>
                            )}
                            {updateProducts && (
                                <p>
                                    Atualizar <span style={{ color: "red" }}>{updateProducts}</span> produtos
                                </p>
                            )}
                        </Box>
                    </Box>
                    <Button variant="contained" onClick={handleUpload}>
                        {loading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : "Enviar"}
                    </Button>
                </>
            )}
        </Paper>
    )
}
