import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { ListMessage } from "../../../components/Admin/Contacts";

export function Contact() {
    const [reload, setReload] = useState(false);

    const onReload = () => setReload((prevStata) => !prevStata);

    const panes = [
        {
            menuItem: "Correos pendientes",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListMessage active={true} reload={reload} onReload={onReload} />
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Correos resueltos",
            render: () => (
                <Tab.Pane attached={false}>
                    <ListMessage active={false} reload={reload} onReload={onReload} />
                </Tab.Pane>
            ),
        },
    ];
    return (
        <div className="menu-page">
            <Tab menu={{ secondary: true }} panes={panes} />
        </div>
    )
}
