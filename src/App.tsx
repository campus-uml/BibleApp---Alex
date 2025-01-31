import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TabHome } from "./components/home/TabHome";
import { AuthProvider } from "./context/AuthContext";
import { BibleProvider } from "./context/BIbleContext";

import { MainLayout } from "./layout/MainLayout";
import LoginPage from "./app/login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BibleProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
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
            </Routes>
          </Router>
        </BibleProvider>
      </AuthProvider>
    </>
  );
}

export default App;
