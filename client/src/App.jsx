import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Jobs from './pages/Jobs'
import Preview from './pages/Preview'
import ContextProvider from './context/Context'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/applied-jobs" element={<Preview/>}/>
          <Route path="/jobs/:id" element={<Jobs />} />
        </Routes>
      </ContextProvider>
      <Footer />
    </BrowserRouter>
  )
}

export default App