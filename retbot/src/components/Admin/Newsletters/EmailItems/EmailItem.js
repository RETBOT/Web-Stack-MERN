import React, { useState } from 'react'
import { Button, Icon, Confirm } from "semantic-ui-react"
import { Newsletter } from "../../../../api"
import { useAuth } from "../../../../hooks"
import "./EmailItem.scss"

const newsLetterController = new Newsletter();
export function EmailItem(props) {
    const { email, onReload } = props;
    const { accessToken } = useAuth();

    const [showConfirm, setShowConfirm] = useState(false);

    const onOpencloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = async () => {
        try {
            await newsLetterController.deleteEmail(accessToken, email._id);
            onReload();
            onOpencloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className='email-item'>
                <span>{email.email}</span>
                <div>
                    <Button icon color="red" onClick={onOpencloseConfirm}>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>
            <Confirm
                open={showConfirm}
                onCancel={onOpencloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar ${email.email}`}
                size='mini'
            />
        </>
    )
}
