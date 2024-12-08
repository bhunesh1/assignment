import React from 'react';
import SignUpForm from './components/SignUpForm.tsx';
import LoginForm from './components/LoginForm.tsx';

function App() {
  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <SignUpForm />
      </div>

      <div className="form-container">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;

