import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { Dashboard } from "./pages/Dashboard";
import { Teams } from "./pages/Teams";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";


function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
