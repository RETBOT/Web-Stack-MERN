import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}

export default App;
