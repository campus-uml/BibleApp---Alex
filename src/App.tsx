import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BibleProvider } from "./context/BIbleContext";
import { MainLayout } from "./layout/MainLayout";
import { TabHome } from "./components/home/TabHome";
import LoginPage from "./components/login/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import Register from "./components/login/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BibleProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <TabHome />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </BibleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
