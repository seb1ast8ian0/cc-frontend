import AddScreen from "./add/AddScreen";
import DashboardScreen from "./dashboard/DashboardScreen";
import LoginScreen from "./auth/login/LoginScreen";
import {AnimatePresence} from "framer-motion"
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";
import SignupScreen from "./auth/signup/SignupScreen";
import { NotFoundPage } from "./notFound/NotFound";
import AppWrapper from "../components/shell/AppWrapper";
import { AuthProvider } from "../components/auth/AuthProvider";
import VerificateScreen from "./auth/verificate/VerificateScreen";

function App() {

  return (
      <AnimatePresence mode="wait">
        <BrowserRouter>
          <AuthProvider>
              <Routes>
                <Route path="/" element={
                  <AppWrapper>
                    <DashboardScreen/>
                  </AppWrapper>
                }/>
                <Route path="/add" element={
                  <AppWrapper>
                    <AddScreen/>
                  </AppWrapper>
                }/>
                <Route path="/auth/login" element={<LoginScreen/>}></Route>
                <Route path="/auth/signup" element={<SignupScreen/>}></Route>
                <Route path="/auth/verificate/:cognitoUsername" element={<VerificateScreen/>}></Route>
                <Route path="*" element={<NotFoundPage/>} />
              </Routes>
            </AuthProvider>
        </BrowserRouter>
      </AnimatePresence>
  );
}

export default App;
