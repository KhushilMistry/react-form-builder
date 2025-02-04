import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormBuilder from "./views/FormBuilder";
import FormViewer from "./views/FormViewer";
import FormList from "./views/FormList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/build" element={<FormBuilder />} />
        <Route path="/view" element={<FormViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
