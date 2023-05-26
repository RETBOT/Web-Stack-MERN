/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Contact } from "../../../../api";
import { useAuth } from '../../../../hooks'
import { MessageItem } from '../MessageItems'

const contactController = new Contact();

export function ListMessage(props) {
    const { accessToken } = useAuth();
    const { active, reload, onReload } = props;
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setMessages(null);
                const repsonse = await contactController.getMessage(accessToken, active);
                setMessages(repsonse);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [active, reload]);


    if (!messages) return <Loader active inline="centered" />;
    if (size(messages) === 0) return "No hay ningun mensaje";

    return map(messages, (message) => (
        <MessageItem key={message._id} message={message} onReload={onReload} />
    ));
}
