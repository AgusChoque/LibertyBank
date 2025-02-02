import Home from "./views/Home";
import Navbar from "./components/Navbar";
import MyAppointments from "./views/MyAppointments";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <MyAppointments />
        <Register />
        <Login />
      </main>
    </>
  )
}

export default App;
