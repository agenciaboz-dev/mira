import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as ArrowIcon } from "../../../images/down_arrow.svg";
import { Formik, Form } from "formik";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import { CircularProgress } from "@mui/material";

interface ResetPasswordFormProps {
  
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const initialValues: FormValues = { password: "", confirmPassword: "" };

  const [resetSuccess, setResetSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Token:", token);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setResetError("");
    setResetSuccess("");

    try {
      if (values.password === values.confirmPassword) {
        const response = await axios.post(
          `https://app.agenciaboz.com.br:4202/api/user/password-reset`,
          {
            password: values.password,
            token: token,
          }
        );

        console.log(response.data.message);
        setResetSuccess("Senha redefinida com sucesso.");
        navigate("/login");
      } else {
        console.error("As senhas não coincidem.");
        setResetError("As senhas não coincidem.");
      }
    } catch (error) {
      console.error(error);
      setResetError("Ocorreu um erro ao solicitar a recuperação de senha.");
    } finally {
      setLoading(false);
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
              type="password"
            />

            <TextField
              name="confirmPassword"
              placeholder="Confirmar nova senha"
              value={values.confirmPassword}
              onChange={handleChange}
              fullWidth
              size="small"
              type="password"
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
              <h3
                style={{
                  alignSelf: "center",
                  color: "white",
                  display: "flex",
                  padding: "2vw",
                }}
              >
                Senha mudada com sucesso!
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
