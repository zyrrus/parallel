import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/style.css";

import BasePage from "./pages/BasePage.jsx";
import Home from "./pages/Home.jsx";
import Discover from "./pages/Discover.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <BasePage>
                <Routes>
                    <Route path='/account' element={<Account />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/discover' element={<Discover />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </BasePage>
        </BrowserRouter>
    );
}
