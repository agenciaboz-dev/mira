import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ArrowIcon } from "../../../images/down_arrow.svg";
import { Formik, Form } from "formik";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { CircularProgress } from "@mui/material";

interface ResetPasswordFormProps {
  // Se houver alguma propriedade específica para o componente, adicione aqui.
}

interface FormValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const initialValues: FormValues = { password: "", confirmPassword: "" };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit  = () => {
    setLoading(true);
    setResetError(""); // Reset error
    setResetSuccess(""); // Reset success

    if (password === confirmPassword) {
      // Enviar a nova senha e o token para o backend
      axios
        .post("https://app.agenciaboz.com.br:4202/api/user/password-reset", { token, password })
        .then((response) => {
          // Sucesso na redefinição de senha
          console.log(response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          // Tratar erros de redefinição de senha
          console.error(error.response.data.error);
        });
    } else {
      // Tratar o caso em que as senhas não coincidem
      console.error("As senhas não coincidem.");
    }
  };

  return (
    <div className="PasswordRecover-Component">
      <ArrowIcon
        className="signup-arrow-up"
        onClick={() => navigate("/login")}
      />
      <h1>Redefinição de Senha</h1>
      <p>Crie uma nova senha e confirme</p>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form className="Form-Recover">
            <TextField
              name="password"
              placeholder="Escreva sua nova senha"
              value={values.password}
              onChange={handleChange}
              fullWidth
              size="small"
            />

            <TextField
                name="confirmPassword"
                placeholder="Confirmar nova senha"
                value={values.confirmPassword}
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
            {resetSuccess && (
              <h3 style={{ alignSelf: "center", color: "white" }}>
                {resetSuccess}
              </h3>
            )}
            {resetError && (
              <h3 style={{ alignSelf: "center", color: "white" }}>
                {resetError}
              </h3>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
