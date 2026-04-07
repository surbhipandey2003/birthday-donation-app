import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  console.log(campaigns);

  const handleDonate = async (campaignId) => {
    const amount = prompt("Enter donation amount:");

    if (!amount) return;

    try {
      await axios.post(
        "http://localhost:5000/api/donations/add",
        { campaignId, amount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Donation Successful!");
      alert("Thank you for your donation ❤️");

      // Refresh campaigns
      const res = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(res.data);

    } catch (err) {
      console.log(err);
      alert("Donation failed");
    }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns");
        setCampaigns(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCampaigns();
  }, [location]);

  return (
    <div style={{ 
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
     }}>
      <h1>🎂 Birthday Donation Dashboard</h1>

      <button
        onClick={() => navigate("/create")}
        style={{
          padding: "10px",
          marginBottom: "20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        + Create Campaign
      </button>

      {campaigns.length === 0 ? (
        <p>No campaigns found</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {campaigns.map((c) => (
            <div
              key={c._id}
              style={{
                border: "1px solid #eee",
                padding: "20px",
                width: "250px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >

              <img
                src={c.image}
                alt="campaign"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />

              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <p><b>Target:</b> ₹{c.goalAmount}</p>

              {/* Progress */}
              <p>
                Raised: ₹0 / ₹{c.goalAmount}
              </p>

              <div
                style={{
                  height: "10px",
                  background: "#ddd",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    width: `${
                      ((c.raisedAmount || 0) / c.goalAmount) * 100
                    }%`,
                    height: "100%",
                    background: "green",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>

              <button
                onClick={() => handleDonate(c._id)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "#ff4081",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Donate ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;