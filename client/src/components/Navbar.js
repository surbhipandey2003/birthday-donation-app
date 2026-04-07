import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/create")}>Create</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;