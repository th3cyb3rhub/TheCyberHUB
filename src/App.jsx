import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './pages/Homepage';

const App = () => {
    return (
        <Router>
            <Homepage />
        </Router>
    );
};

export default App;
