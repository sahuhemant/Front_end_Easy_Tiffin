import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); 
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user: { 
            name, 
            user_name: userName, 
            email,
            number,
            password 
          } 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token in localStorage
        onSuccess('Registration successful! Now you can login.'); // Pass success message to onSuccess
        navigate('/'); // Redirect to the home page
      } else {
        const errorData = await response.json();
        setError(errorData.errors.join(', '));
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email" // Change type to email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel" // Change type to tel for number
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
