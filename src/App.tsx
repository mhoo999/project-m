import React from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import { MapProvider } from './context/MapContext'
import { Routes, Route, useLocation } from 'react-router-dom'
import SearchInputModal from './pages/SearchInputModal'
import StoreListPage from './pages/StoreListPage'

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stores" element={<StoreListPage />} />
      </Routes>
      {/* backgroundLocation이 있으면 모달로 띄움 */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/search"
            element={<SearchInputModal onClose={() => window.history.back()} />}
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <MapProvider>
      <AppRoutes />
    </MapProvider>
  );
}

export default App;
