import Home from "./views/Home";
import Navbar from "./components/Navbar";
import MyAppointments from "./views/MyAppointments";
import Register from "./views/Register";
import Login from "./views/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
