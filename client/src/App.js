import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiagnosticScreener from "./components/DiagnosticScreener";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Hello From Home</h1>} />
        <Route path="/diagnostic-screener" element={<DiagnosticScreener />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
