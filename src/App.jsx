import './App.css'
import {Navbar, Sidebar, Hero, Services, Loader, Footer} from './components'
import {BrowserRouter as Router} from "react-router-dom";


function App() {
    return (
        <Router className="App">
            <Navbar/>
            <Sidebar/>
            <Hero/>
            <Services/>
            <Loader/>
            <Footer/>
        </Router>
    )
}

export default App
