import Home from "./views/Home";
import Navbar from "./components/Navbar";
import MyAppointments from "./views/MyAppointments";
import Register from "./views/Register";
import Login from "./views/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorPage from "./views/ErrorPage";

function App() {
  const location = useLocation();

  return (
    <>
      {(location.pathname === "/register" || location.pathname === "/login") ? <></> : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
