// index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
