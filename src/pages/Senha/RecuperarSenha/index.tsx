import { CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
// import { useApi } from "../../../hooks/useApi";
import { ReactComponent as ArrowIcon } from "../../../images/down_arrow.svg";
import axios from "axios";
// import { send } from "process"
import "./style.scss";

interface RecoverPasswordFormProps {}

interface FormValues {
  email: string;
}

export const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = () => {
  // const api = useApi();
  const navigate = useNavigate();
  const [recoverSuccess, setRecoverSuccess] = useState(false);
  const [recoverError, setRecoverError] = useState("");
  const [loading, setLoading] = useState(false);


  const initialValues: FormValues = { email: "" };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setRecoverError(""); // Reset error
    setRecoverSuccess(false); // Reset success

    try {
      const response = await axios.post("https://app.agenciaboz.com.br:4202/api/user/password-recovery", {
        email: values.email,
      });

      if (response.data.success) {
        setRecoverSuccess(true); // Show success message
      } else {
        setRecoverError("E-mail não encontrado.");
      }
    } catch (error) {
      console.error(error);
      setRecoverError("Ocorreu um erro ao solicitar a recuperação de senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PasswordRecover-Component">
      {/* <Divider className="tp-signup-divider" style={{ position: "absolute", width: "100vw", left: 0, top: 0 }}/> */}
      <ArrowIcon
        className="signup-arrow-up"
        onClick={() => navigate("/login")}
      />

      <h1>Recuperação de Senha</h1>
      <p>Insira seu e-mail para recuperar a senha</p>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form className="Form-Recover">
            <TextField
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <Button
              type="submit"
              variant="contained"
              style={{ fontSize: "5vw", height: "12vw", marginTop: "2vw" }}
              fullWidth
            >
              {loading ? (
                <CircularProgress
                  sx={{ color: "white" }}
                  style={{ width: "10vw", height: "auto" }}
                />
              ) : (
                "Enviar"
              )}
            </Button>
            {recoverSuccess && (
              <h3 style={{ alignSelf: "center", color: "white", display: "flex", padding:"2vw" }}>
                Um email foi enviado para você com as instruções para recuperar sua senha!
              </h3>
            )}
            {recoverError && (
              <h3 style={{ alignSelf: "center", color: "white" }}>
                {recoverError}
              </h3>
            )}
          </Form>
        )}
      </Formik>
      <div className="background"></div>
    </div>
  );
};
