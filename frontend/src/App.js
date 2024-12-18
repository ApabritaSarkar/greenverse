import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Plants from './components/Plants';
import Profile from './components/Profile';
import Forum from './components/Forum';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/plants" element={<Plants />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
            </Routes>
        </Router>
    );
};

export default App;
