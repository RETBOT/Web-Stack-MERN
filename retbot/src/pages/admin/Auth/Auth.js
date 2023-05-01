import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import "./Auth.scss";
import { Icon } from "../../../assets/inedx";

export function Auth() {
  const [activeIndex, setAciveIndex] = useState(0);

  const openLogin = () => setAciveIndex(0);

  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Nuevo usuario",
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">
      <Icon.Logo className="logo" />

      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setAciveIndex(data.activeIndex)}
      />
    </div>
  );
}
