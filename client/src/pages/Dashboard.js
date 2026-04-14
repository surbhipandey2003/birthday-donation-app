import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const BASE_URL = "https://birthday-donation-app-production.up.railway.app";

function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ PAYMENT FUNCTION
  const handlePayment = async (campaignId) => {
    const amount = prompt("Enter donation amount:");
    if (!amount) return;

    try {
      // Create order
      const { data: order } = await axios.post(
        `${BASE_URL}/api/payment/create-order`,
        { amount }
      );

      const options = {
        key: "rzp_test_SbiQ9Hg8U9JPPO", 
        amount: order.amount,
        currency: "INR",
        name: "Birthday Donation",
        description: "Donation",
        order_id: order.id,

        handler: async function (response) {
          alert("Payment successful!");

          // Save donation
          await axios.post(
            `${BASE_URL}/api/donations`,
            { campaignId, amount },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  // ✅ FETCH CAMPAIGNS
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/campaigns`);
        setCampaigns(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCampaigns();
  }, [location]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
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
                  marginBottom: "10px",
                }}
              />

              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <p><b>Target:</b> ₹{c.goalAmount}</p>

              <p>
                Raised: ₹{c.raisedAmount || 0} / ₹{c.goalAmount}
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

              {/* ✅ DONATE BUTTON */}
              <button
                onClick={() => handlePayment(c._id)}
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