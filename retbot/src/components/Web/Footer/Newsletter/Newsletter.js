import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./NewsLetter.form"
import { Newsletter as NewsLetterController } from "../../../../api"
import "./Newsletter.scss"

const newsLetterController = new NewsLetterController();

export function Newsletter() {
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setSuccess(false);
            try {
                await newsLetterController.registerEmail(formValue.email);
                formik.resetForm();
                setSuccess(true);
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <div className='footer-newsletter'>
            <h4>¡Apuntate y aprende!</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="email"
                    placeholder="Correo electronico"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />

                <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                    !Me suscribo!
                </Form.Button>
            </Form>

            {success && (
                <p className='success'>!Email registrado correctamente</p>
            )}

        </div>
    )
}
