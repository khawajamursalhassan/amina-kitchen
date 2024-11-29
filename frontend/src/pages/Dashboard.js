import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Financial Dashboard</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

          <iframe
            src="http://localhost:3000/d-solo/cdu7y1i1spddsc/financial-dashboard?orgId=1&from=1723266218185&to=1723287818186&panelId=1"
            width="760"
            height="400"
            frameborder="0">
          </iframe>

          <iframe
            src="http://localhost:3000/d-solo/cdu7y1i1spddsc/financial-dashboard?orgId=1&from=1723270127674&to=1723291727674&panelId=2"
            width="760"
            height="400"
            frameborder="0">
          </iframe>
        </div>

        <iframe
          src="http://localhost:3000/d-solo/advhhezccr5dsd/new-json-dashboard?orgId=1&from=1724213101361&to=1724234701361&theme=light&panelId=1"
          width="1400"
          height="400"
          frameborder="0">
        </iframe>
        
      </div>
    </div>
  );
};

export default Dashboard;