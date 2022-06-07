import './App.css'

import {Navbar, Hero, Services, Loader, Footer} from './components'

function App() {
    return (
        <div className="App">
            <div >
                <Navbar/>
                <Hero/>
            </div>
            <Services/>
            <Loader/>
            <Footer/>
        </div>
    )
}

export default App
