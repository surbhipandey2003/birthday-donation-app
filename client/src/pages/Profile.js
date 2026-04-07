import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [myCampaigns, setMyCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const campaigns = await axios.get(
          "http://localhost:5000/api/my-campaigns",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const donations = await axios.get(
          "http://localhost:5000/api/my-donations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMyCampaigns(campaigns.data);
        setMyDonations(donations.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <h2>My Campaigns</h2>
      {myCampaigns.map((c) => (
        <div key={c._id}>
          <p>{c.title}</p>
        </div>
      ))}

      <h2>My Donations</h2>
      {myDonations.map((d) => (
        <div key={d._id}>
          <p>₹{d.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;