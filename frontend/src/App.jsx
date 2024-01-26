import { Dashboard } from "./components/DashBoard";
import { SigninComponent } from "./components/SigninComponent";
import { SignupComponent } from "./components/SignupComponent";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SigninComponent />} />
                <Route path="/signup" element={<SignupComponent />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
