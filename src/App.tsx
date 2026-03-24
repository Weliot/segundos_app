import './App.css';
import Login from './pages/Login';
import 'bootstrap';
import {useSegundosContext} from './providers/SegundosContext';
import Principal from './pages/Principal';



function App() {
  
  const {
    isAuthenticated,
  } = useSegundosContext();

  return (
    
    <>{isAuthenticated === true ? <Principal /> :  <Login />}</>

  );
}

export default App;
