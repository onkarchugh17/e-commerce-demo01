import React from "react";
import Navbar from "../features/navbar/Navbar.js";
import AdminProductList from "../features/admin/components/AdminProductList.js";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </div>
  );
}

export default AdminHome;
