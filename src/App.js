import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './styles/style.css';

import BasePage from './pages/BasePage.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import Contact from './pages/Contact.jsx';
import LogIn from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';


export default function App() {
  return (
    <Router>
        <BasePage>
            <Switch>
                <Route path="/discover"><Discover/></Route>
                <Route path="/contact"><Contact/></Route>
                <Route path="/login"><LogIn/></Route>
                <Route path="/signup"><SignUp/></Route>
                <Route path={["/", "/home"]}><Home/></Route>
            </Switch>
        </BasePage>
    </Router>
  );
}
