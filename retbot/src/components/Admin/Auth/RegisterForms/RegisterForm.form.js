import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .matches(
        /^(([^<>()\\.,;:\s@"]+(.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
        "Ingrese un correo electrónico válido"
      )
      .required("Campo obligatorio"),
    password: Yup.string()
      .required("Campo obligatorio")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-ZñÑ]{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número"
      ),
    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
    conditionsAccepted: Yup.bool().isTrue(true),
  });
}
