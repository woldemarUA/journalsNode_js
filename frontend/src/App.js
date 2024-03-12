import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { LoginPage, RegisterPage } from './components/Auth/AuthPages';
import DashboardPage from './components/Dashboard/DashboardPage';
import ArticlesList from './components/Articles/ArticlesList';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<ArticlesList />}
          />
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/register'
            element={<RegisterPage />}
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
