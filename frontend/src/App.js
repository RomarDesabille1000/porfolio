import './App.css'
import './style.css'
import React from 'react'
import Footer from './containers/main_page/Footer'
import Navbar from './components/main/Navbar'

function App() {
  return (
       <div className="max-width mx-auto px3 ltr newClass">
            <div className="content index py4">
                <Navbar/>
                <Footer />
            </div>
       </div>
  );
}

export default App;
