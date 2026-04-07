import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", targetAmount);
    formData.append("image", image);


    try {
      await axios.post(
        "http://localhost:5000/api/campaigns/create",
         formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Campaign Created!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error creating campaign");
    }
  };

  return (
  <>
  
    <Navbar />

    <div style={{ padding: "20px" }}>
      <h1>Create Campaign</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Target Amount"
          onChange={(e) => setTargetAmount(e.target.value)}
        />
        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />


        <button type="submit">Create</button>
      </form>
    </div>
  </>  
  );
}

export default CreateCampaign;