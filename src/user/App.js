import './App.css';
import {Header, About, Feature, Partner, Contact, Navbar, Footer} from './src'
import {PopupInstance} from "./src/popup/Popup";

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
        {PopupInstance}
    </div>
  );
}

export default App;
