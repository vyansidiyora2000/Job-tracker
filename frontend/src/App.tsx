import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Settings from './pages/Setting';
import ForgotPassword from './pages/ForgotPassword';
import ConfirmPassword from './pages/ConfirmPassword';
import Navbar from './components/Navbar';
import { VerifyEmail } from './pages/VerifyEmail';
import { AccountProvider } from "./context/Account";
import UserProfile from "./pages/UserProfile";
// import JobForm from "./pages/JobForm";
import JobList from "./pages/JobList";
import FileUpload from "./pages/Fileupload";
import JobAnalyzer from "./pages/Jobanalyze";
import { Home } from "./pages/Home";






const App: React.FC = () => {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/userprofile" element={<UserProfile/>} />
          {/* <Route path="/jobform" element={<JobForm/>}/> */}
          <Route path="/joblist" element={<JobList/>}/>
          <Route path="fileupload" element={<FileUpload/>}/>
          <Route path="/analyze" element={<JobAnalyzer/>}/>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
