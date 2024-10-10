import { useState } from 'react';

function Login({ onLogin, setMsg }) {
  const [username, setUsername] = useState('');

  function checkErrorAndLogin(event) {
    
    event.preventDefault();

    const regex = /^[a-zA-Z0-9]+$/;

    if (!username || !username.match(regex)) {
      const msg = 'The username is not made up of valid characters!';
      setMsg(msg);
      return;
    }

    if (username === 'dog') { 
      const msg = "It's not a valid user!";
      setMsg(msg);
      return;
    }

    onLogin(username);
  }

  return (
    <form onSubmit={checkErrorAndLogin}>
      <label>
        <span>Username: </span>
        <input
          value={username}
          placeholder="Input a valid name"
          onInput={(e) => setUsername(e.target.value)}
        />
      </label>
      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
