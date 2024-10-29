import React from "react";
import AdminSideBar from "../components/AdminSidebar";
import AdminContent from "../components/AdminContent";
import AdminSideBar2 from "../components/AdminSidebar2";


const AdminScreen = () => {

  return (
    <div className="admin-screen">
      <div className="sidebar fist-sidebar">
        <AdminSideBar />
      </div>
      <div className="admin-content">
         <AdminContent />
      </div>
      <div className="sidebar last-sidebar">
        <AdminSideBar2 />
      </div>
    </div>
  );
};

export default AdminScreen;
