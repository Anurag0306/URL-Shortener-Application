import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// App component that renders LandingPage and AboutPage based on the current route path
function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>  
  )
}

export default App
