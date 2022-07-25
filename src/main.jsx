import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<HashRouter>*/}
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        {/*</HashRouter>*/}
    </React.StrictMode>
)
