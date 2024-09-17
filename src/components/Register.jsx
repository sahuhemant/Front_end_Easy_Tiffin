import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  console.log('Rendering Register component');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    console.log('Register form submitted');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { name, user_name: userName, password } }),
      });

      if (response.ok) {
        setSuccess('Registration successful! Now you can login.');
        setTimeout(() => {
          onSuccess(); // Call the onSuccess prop to redirect and show success message
          // navigate('/'); // Comment out for now
        }, 2000);
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
      {success && <p style={{ color: 'green' }}>{success}</p>}
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
