import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
      </div>
    </Router>
  );
}

export default App;
