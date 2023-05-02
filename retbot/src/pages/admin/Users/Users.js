import React, { useState } from 'react'
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUser } from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpelCloseModal = () => setShowModal((prevState) => !prevState);

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attacher={false}>
          <ListUser usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attacher={false}>
          <ListUser usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ]
  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpelCloseModal}>
          Nuevo usuario
        </Button>
        <Tab menu={{ secundary: true }} panes={panes} />
      </div>
      <BasicModal show={showModal} close={onOpelCloseModal} title="Crear nuevo usuario">
        <UserForm close={onOpelCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
