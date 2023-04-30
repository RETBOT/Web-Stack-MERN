import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues } from "./RegisterForm.form";
import "./RegisterForm.scss";

export function RegisterForm() {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <h3>Correo electronico: </h3>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <h3>Contraseña: </h3>
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <h3>Repetir Contraseña: </h3>
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="Repetir Contraseña"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
      />
      <Form.Checkbox
        name="conditionsAccepted"
        label="He leído y acepto las poíticas de privacidad"
        onChange={(_, data) =>
          formik.setFieldValue("conditionsAccepted", data.checked)
        }
        checked={formik.values.conditionsAccepted}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>
      <p className="register-form__error">{error}</p>
    </Form>
  );
}
