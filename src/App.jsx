import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [view, setView] = useState('home');
  const [message, setMessage] = useState('');

  // Callback function to handle successful registration
  const handleRegistrationSuccess = () => {
    setMessage('Registered successfully! Now you can login.');
    setView('home');
  };

  return (
    <div className="App">
      {view === 'home' && (
        <>
          <h1>Welcome!</h1>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          <button onClick={() => {
            console.log('Register button clicked');
            setView('register');
          }}>Register</button>
          <button onClick={() => setView('login')}>Login</button>
        </>
      )}

      {view === 'login' && <Login />}
      {view === 'register' && <Register onSuccess={handleRegistrationSuccess} />}
    </div>
  );
}

export default App;
