import './App.css';
import {Header, About, Feature, Partner, Contact, Navbar, Footer} from './src'

function App() {
  return (
    <div className="App">
        <Navbar/>
        <Header/>
        <div id="feature">
            <Feature/>
        </div>
        <div id="about">
            <About/>
        </div>
        <div id="contact">
            <Contact/>
        </div>
        <Partner/>
        <Footer/>
    </div>
  );
}

export default App;
