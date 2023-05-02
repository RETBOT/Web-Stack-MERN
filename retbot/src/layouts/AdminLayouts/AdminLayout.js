import React from "react";
import { image } from "../../assets";
import { AdminMenu, Logout } from "../../components/Admin/AdminLayouts/";
import "./AdminLayout.scss";


export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <img src={image.IconPng} alt="Icon" className="logo" />
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}

