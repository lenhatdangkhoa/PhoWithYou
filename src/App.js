import "./App.css";
import { Card } from "./components/Card";
import { Button } from "./components/Button";
function App() {
  return (
    <div className="App">
      <div className="header">
        <img
          src="https://cdn3.iconfinder.com/data/icons/valentine2/100/Valentine_love-11-512.png"
          alt="wine glass"
          id="app-logo"
        />
        <h1>PHO</h1>
        <h3>WithYou</h3>
        <Button buttonName="Log In" />
        <Button buttonName="Sign Up" />
      </div>
    </div>
  );
}

export default App;
