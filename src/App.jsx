import './App.css'

import {Navbar, Hero, Services, Loader, Footer} from './components'

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Hero/>
            <Services/>
            <Loader/>
            <Footer/>
        </div>
    )
}

export default App
