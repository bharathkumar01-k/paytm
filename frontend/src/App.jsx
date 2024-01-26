import { SignupComponent } from "./components/SignupComponent";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignupComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
