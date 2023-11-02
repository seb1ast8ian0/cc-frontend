import Add from "./add/Add";
import Dashboard from "./dashboard/Dashboard";
import Shell from "./shell/AppShell";
import {AnimatePresence} from "framer-motion"

import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";


function App() {

  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/add" element={<Add/>}></Route>
          </Routes>
        </Shell>
      </BrowserRouter>
    </AnimatePresence >
      
  );
}

export default App;
