import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './styles/style.css';

import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import Contact from './pages/Contact.jsx';
import Register from './pages/Register.jsx';
import BasePage from './pages/BasePage.jsx';


export default function App() {
  return (
    <Router>
        <BasePage>
            <Switch>
                <Route path="/discover"><Discover/></Route>
                <Route path="/contact"><Contact/></Route>
                <Route path="/register"><Register/></Route>
                <Route path={["/", "/home"]}><Home/></Route>
            </Switch>
        </BasePage>
    </Router>
  );
}
