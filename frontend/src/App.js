// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log('Auth URL:', process.env.REACT_APP_AUTH_URL);

  return <div className='text-success'>Hello men</div>;
}

export default App;
