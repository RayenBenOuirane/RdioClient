import HomePage from "./pages/HomePage";
import ContactUs from "./components/ContactUs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;