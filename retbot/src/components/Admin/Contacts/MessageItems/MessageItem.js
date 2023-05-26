import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Contact } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./MessageItem.scss"

const contactController = new Contact();

export function MessageItem(props) {
    const { message, onReload } = props;
    const { accessToken } = useAuth();

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openDesactivateActiveConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(
            message.active
                ? `Se ha tomado nota del mensaje con correo: ${message.correo} y se ha procedido a su resolución.`
                : `¡Mensaje pendiente de revisión y sin resolver! ${message.correo}`
        );
        onOpenCloseConfirm();
    };

    const onActivateDesactivate = async () => {
        try {
            await contactController.updateMessage(accessToken, message._id, {
                active: !message.active,
            });
            onReload();
        } catch (error) {
            console.error(error);
        }
    };

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar el mensaje ${message.correo}`);
        onOpenCloseConfirm();
    };

    const onDelete = async () => {
        try {
            await contactController.deleteMessage(accessToken, message._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="message-item">
                <div className="message-item__info">
                    <span className="message-item__info-nombre">Nombre: {message.nombre}</span>
                    <span className="message-item__info-correo">Correo: {message.correo}</span>
                    <span className="message-item__info-asunto">Asunto: {message.asunto}</span>
                    <span className='message-item__info-mensaje'>Mensaje: </span>
                    <div
                        className='message-item__info-mensaje'
                        dangerouslySetInnerHTML={{ __html: message.mensaje }}
                    />
                </div>

                <div>
                    <Button
                        icon
                        color={message.active ? "teal" : "orange"}
                        onClick={openDesactivateActiveConfirm}
                    >
                        <Icon name={message.active ? "envelope open" : "envelope"} />
                    </Button>
                    <Button icon color="red" onClick={openDeleteConfirm}>
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={isDelete ? onDelete : onActivateDesactivate}
                content={confirmMessage}
                size="mini"
            />
        </>
    )
}
