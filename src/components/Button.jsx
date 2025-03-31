import React from "react";
import { PrimaryButton, SecondaryButton, DangerButton, SuccessButton } from "../components/Buttons";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="space-x-4">
        <PrimaryButton text="Place Order" onClick={() => alert("Order Placed!")} />
        <SecondaryButton text="Edit Menu" onClick={() => alert("Edit Menu")} />
        <SuccessButton text="Confirm Reservation" onClick={() => alert("Reservation Confirmed!")} />
        <DangerButton text="Cancel Order" onClick={() => alert("Order Canceled!")} />
      </div>
    </div>
  );
};

export default Dashboard;
