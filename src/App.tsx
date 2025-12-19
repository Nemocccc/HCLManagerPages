import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
