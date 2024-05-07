import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="cont_as" style={{ display: "flex", direction: "row" }}>
            <div className="sidebar" style={{ width: "10%", minHeight: "100vh" }}>

                <Link className="linkDeco" style={{ marginTop: "20px" }} to={"addStudent"} >Add Student</Link>
                <Link className="linkDeco" to={"studentList"} >Student List</Link>



            </div>
            <div className="main-container" style={{ width: "90%", minHeight: "100vh" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;