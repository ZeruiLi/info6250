import { useEffect, useState, useCallback } from "react";
import { fetchLogin, fetchLogout, fetchSession } from "./services";
import { SERVER } from "./constants";

function Login({ isLoggedIn, setIsLoggedIn, setError, setLoading }) {
  const [username, setUsername] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchLogin(username);
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      setError(err?.error || "ERROR");
    } finally {
      setLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await fetchLogout();
      setIsLoggedIn(false);
      setUsername("");
      setError("");
    } catch (err) {
      setError(err?.error || "ERROR");
    } finally {
      setLoading(false);
    }
  };

  const checkForSession = useCallback(async () => {
    setLoading(true);
    try {
      const session = await fetchSession();
      setUsername(session.username);
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      if (err?.error !== SERVER.AUTH_MISSING) {
        setError(err?.error || "ERROR");
      }
    } finally {
      setLoading(false);
    }
  }, [setIsLoggedIn, setError, setLoading]);

  useEffect(() => {
    checkForSession();
  }, [checkForSession]);

  return (
    <div className="login">
      <h2>User</h2>
      {isLoggedIn ? (
        <div className="logout">
          Hello {username}
          <button onClick={logoutHandler} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <form className="login-form" onSubmit={loginHandler}>
          <label className="form-label">
            <span>Username:</span>
            <input
              className="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
