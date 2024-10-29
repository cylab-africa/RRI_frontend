import React from "react";
import OverviewCard from "./OverviewCard";
const AdminContent = () => {
    return (
        <div id="admin-overview">
            {/* header */}
            <div className="admin-header">
                <p className="admin-header-title">
                    Dashboard
                </p>
            </div>

            {/* overview section */}
            <div style={{
                margin: '30px 60px',
            }}>
                <h3 style={{
                    fontWeight:'600',
                    marginBottom:'20px',
                    color:'#1C1C1C'
                }}>Overview</h3>
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    flexWrap:'wrap'
                }}>
                    <OverviewCard
                        title='evaluations'
                        total={7265} 
                        increments={1.02} />
                    <OverviewCard
                        title='projects'
                        total={265} 
                        increments={11.02} />
                    <OverviewCard
                        title='new users'
                        total={725} 
                        increments={11.02} />
                    <OverviewCard
                        title='active users'
                        total={75} 
                        increments={-11.02} />
                </div>

            </div>
        </div>
    )
};
export default AdminContent;