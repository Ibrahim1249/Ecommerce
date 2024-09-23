
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/LoginPage"
import { RegisterPage } from "./components/RegisterPage"
import Home from "./components/Home"
import ForgotPassword from "./components/ForgotPassword";
import OTPVerification from "./components/OTPVerification";
import ChangePassword from "./components/ChangePassword";



function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/otp-verify" element={<OTPVerification/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App