import "./App.css";
import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img
          src="https://cdn3.iconfinder.com/data/icons/valentine2/100/Valentine_love-11-512.png"
          alt="wine glass"
          id="app-logo"
        />
        <div className="titleName">
          <h1>PHO</h1>
          <h3>WithYou</h3>
        </div>
       
        <div>
          <a href="https://react.school" target="_blank">
            <Button buttonName="Log In"/>
          </a>
      
          <Button buttonName="Sign Up" />
        </div>
      </div>
      <div className="body">
        <h1>"The best dating app ever" - Dylan Pettigrew</h1>
        <br />
        <h2>Select your match</h2>
        <Card>hello</Card>
        <h2>and connect!</h2>
        <Card>hello</Card>
      </div>
      <Footer />
    </div>
  );
}

export default App;
