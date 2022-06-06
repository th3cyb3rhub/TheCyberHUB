import './App.css'

import {Navbar, Welcome, Services, Loader, Footer} from './components'

function App() {
    return (
        <div className="App">
            <div >
                <Navbar/>
                <Welcome/>
            </div>
            <Services/>
            <Loader/>
            <Footer/>
        </div>
    )
}

export default App
