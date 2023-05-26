import * as Yup from "yup";

export function initialValues() {
    return {
        name: "",
        email: "",
        subject: "",
        message: "",
    };
}

export function validationSchema() {
    return Yup.object({
        name: Yup.string().required(false),
        email: Yup.string().email("El email no es valido").required("Correo obligatorio"),
        subject: Yup.string().required(false),
        message: Yup.string().required("Mensaje obligatorio"),
    });
}
