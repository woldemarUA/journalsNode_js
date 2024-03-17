import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthPage } from './components/Auth/AuthPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import ArticlesList from './components/Articles/ArticlesList';
import ArticleDetail from './components/Articles/ArticleDetail';
import ArticleManagement from './components/Articles/ArticleManagement';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<ArticlesList />}
          />
          <Route
            path='/login'
            element={<AuthPage formType={'login'} />}
          />
          <Route
            path='/register'
            element={<AuthPage formType={'register'} />}
          />
          <Route
            path='/details'
            element={<ArticleDetail page={'details'} />}
          />
          <Route
            path='/delete'
            element={
              <ProtectedRoute>
                <ArticleDetail page={'delete'} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add'
            element={
              <ProtectedRoute>
                <ArticleManagement formType={'add'} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/edit'
            element={
              <ProtectedRoute>
                <ArticleManagement formType={'edit'} />
              </ProtectedRoute>
            }
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
      </Container>
    </BrowserRouter>
  );
}

export default App;
