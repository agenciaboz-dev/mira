import React, { useEffect, useRef, useState } from "react"
import { FormikAdressValues } from "../../pages/Profile/Address"
import MaskedInput from "react-text-mask"
import { TextField } from "../TextField"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { CircularProgress, MenuItem } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useApi } from "../../hooks/useApi"
import { useFormikContext } from "formik"

interface AddressFieldProps {
    values: FormikAdressValues
    handleChange: React.ChangeEventHandler
}

export const AddressField: React.FC<AddressFieldProps> = ({ values, handleChange }) => {
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const { snackbar } = useSnackbar()
    const { setFieldValue } = useFormikContext()
    const api = useApi()
    const numberRef = useRef<MaskedInput>(null)
    const [loading, setLoading] = useState(false)
    
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.style.borderRadius = "10vw";
    };

    useEffect(() => {
        if (values.cep.length == 10) {
            if (loading) return

            setLoading(true)
            api.cep({
                data: { cep: values.cep },
                callback: (response: any) => {
                    const address = response.data
                    console.log(address)
                    
                    if (address.erro) {
                        snackbar({ severity: "error", text: "Cep não encontrado" })
                        return
                    }

                    setFieldValue("address", address.logradouro)
                    setFieldValue("district", address.bairro)
                    setFieldValue("city", address.localidade)
                    setFieldValue("uf", address.uf)
                    numberRef?.current?.inputElement.focus()
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }, [values.cep])

    return (
        <>
            <MaskedInput
                mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                guide={false}
                name="cep"
                value={values.cep}
                onChange={handleChange}
                render={(ref, props) => (
                    <TextField
                        inputRef={ref}
                        {...props}
                        placeholder="CEP"
                        InputProps={{
                            inputMode: "numeric",
                            endAdornment: loading ? <CircularProgress size={"1.5rem"} color="primary" /> : <></>,
                        }}
                        inputProps={{ inputMode: "numeric" }}
                    />
                )}
            />
            <TextField placeholder="Endereço" name="address" value={values.address} onChange={handleChange} />
            <div className="two-inputs">
                <MaskedInput
                    mask={numberMask}
                    guide={false}
                    name="number"
                    ref={numberRef}
                    value={values.number.toString()}
                    onChange={handleChange}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            className="small-input"
                            placeholder="Número"
                            inputProps={{ inputMode: "numeric" }}
                        />
                    )}
                />
                <TextField
                    placeholder="Complemento"
                    name="complement"
                    value={values.complement}
                    onChange={handleChange}
                    sx={{ flex: "0.8" }}
                />
            </div>
            <TextField placeholder="Bairro" name="district" value={values.district} onChange={handleChange} />
            <div className="two-inputs">
                <TextField
                    placeholder="Cidade"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    sx={{ flex: "0.8" }}
                />
                <TextField
                    select
                    name={"uf"}
                    placeholder={"UF"}
                    onChange={handleChange}
                    value={values.uf}
                    className="small-input"
                    InputProps={{
                        style: {
                            borderRadius: "10vw",
                            color: "#555555",
                            fontSize: "3.5vw",
                            fontWeight: "bold",
                            flexGrow: "1",
                            alignSelf: "stretch",
                        },
                        inputProps: {
                            onFocus: handleFocus,
                        },
                    }}
                >
                    {estados.map((estado) => (
                        <MenuItem key={estado.value} value={estado.value} style={{ width: "100%" }}>
                            {estado.value}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </>
    )
}
