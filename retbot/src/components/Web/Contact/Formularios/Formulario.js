import React, { useState } from 'react'
import { Form, Message } from 'semantic-ui-react'
import { useFormik } from "formik"
import { Editor } from '@tinymce/tinymce-react';
import { Contact } from '../../../../api'
import { initialValues, validationSchema } from "./Formulario.form";
import "./Formulario.scss"

const contactController = new Contact();

export function Formulario() {
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(true)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {

                setEnviado(false);
                await contactController.sendMessage(formValue);
                setEnviado(true);
                setError(false);
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className='mensaje-formulario'>
            <span>Formulario de contacto</span>
            <Form
                success
                className='mensaje-formulario__info'
                onSubmit={formik.handleSubmit}
            >

                <span className='mensaje-formulario__nombre' >Nombre: </span>
                <Form.Input
                    name="name"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />

                <span className='mensaje-formulario__email' >Correo: </span>
                <Form.Input
                    name="email"
                    placeholder="Correo electronico"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />

                <span className='mensaje-formulario__asunto'>Asunto: </span>
                <Form.Input
                    className='mensaje-formulario__asunto'
                    name="subject"
                    placeholder="Asunto"
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                    error={formik.errors.subject}
                />

                <span className='mensaje-formulario__mensaje'>Mensaje: </span>
                <Editor
                    className='mensaje-formulario__mensaje'
                    init={
                        {
                            selector: 'textarea#basic-example',
                            height: 500,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                        }
                    }
                    initialValue={formik.values.message}
                    onChange={(e) => formik.setFieldValue("message", e.target.getContent())}
                />
                <Form.Button
                    type="submit"
                    primary
                    fluid
                    loading={formik.isSubmitting}
                >
                    Enviar
                </Form.Button>
            </Form>
            {
                enviado ? (<Message
                    className='menssage-enviado'
                    success
                    header='Confirmación de envío de mensaje'
                    content=" Su mensaje ha sido enviado correctamente. Nos pondremos en contacto con usted en los próximos días. ¡Gracias por comunicarse con nosotros!"
                />) : (
                    !error ? (
                        <Message
                            className='menssage-no-enviado'
                            error
                            header='Error al enviar el mensaje'
                            content=' Lamentablemente, hemos encontrado un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde o contáctenos por otros medios. Disculpe las molestias.'
                        />) : (<br />))
            }

            {

            }
        </div>
    )
}
