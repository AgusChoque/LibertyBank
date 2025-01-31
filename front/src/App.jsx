import Home from "./views/Home";
import Navbar from "./components/Navbar";
import MyAppointments from "./views/MyAppointments";

function App() {
  return (
    <>
      <Navbar />
      <main>
        {/* <Home /> */}
        <MyAppointments />
      </main>
    </>
  )
}

export default App;
