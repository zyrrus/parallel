import {
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';
import './styles/style.css';

import BasePage from './pages/BasePage.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';
import Contact from './pages/Contact.jsx';
import Register from './pages/Register.jsx';


export default function App() {
  return (
    <BrowserRouter>
        <BasePage>
            <Switch>
                <Route path="/discover"><Discover/></Route>
                <Route path="/contact"><Contact/></Route>
                <Route path="/login"><Register loginFirst/></Route>
                <Route path="/signup"><Register/></Route>
                <Route path={["/", "/home"]}><Home/></Route>
            </Switch>
        </BasePage>
    </BrowserRouter>
  );
}
