import React from "react";
import UserOrders from "../features/UserData/components/UserOrders";
import Navbar from "../features/navbar/Navbar";

function UserOrderPage() {
  return (
    <div>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}

export default UserOrderPage;
