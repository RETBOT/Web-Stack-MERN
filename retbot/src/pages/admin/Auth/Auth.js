import React, { useState, userState } from 'react';
import { Tab } from "semantic-ui-react";
import { RegisterForm } from '../../../components/Admin/Auth';
import "./Auth.scss";
import { Icon } from '../../../assets/inedx';

export function Auth() {

  const [activeIndex, setAciveIndex] = useState(1);

  const openLogin = () => setAciveIndex(0);

  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <h2> Login FORM </h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Nuevo usuario",
      render:() => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin}/>
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className='auth'>
      <Icon.Logo className="logo" />

      <Tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setAciveIndex(data.activeIndex) }/>
    </div>
  );
}
