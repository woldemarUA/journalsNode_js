// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './components/Navbar/NavBar';

import ArticlesList from './components/Articles/ArticlesList';

function App() {
  // console.log('API URL:', process.env.REACT_APP_API_URL);
  // console.log('Auth URL:', process.env.REACT_APP_AUTH_URL);
  // { link, text, className }

  return (
    <div className='container'>
      <NavBar />
      <ArticlesList />
    </div>
  );
}

export default App;
