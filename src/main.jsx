import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './App'
import './index.css'
import store from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/*<HashRouter>*/}
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
        {/*</HashRouter>*/}
    </React.StrictMode>
)
