async function handleResponse(response) {
    if (!response.ok) {
      try {
        const err = await response.json();
        throw err;
      } catch {
        throw { error: "jsonError" };
      }
    }
    return response.json();
  }
  
  export async function fetchLogin(username) {
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ username }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw { error: error.error || "networkError" };
    }
  }
  
  export async function fetchLogout() {
    try {
      const response = await fetch("/api/session", {
        method: "DELETE",
      });
      return await handleResponse(response);
    } catch (error) {
      throw { error: error.error || "networkError" };
    }
  }
  
  export async function fetchSession() {
    try {
      const response = await fetch("/api/session", {
        method: "GET",
      });
      return await handleResponse(response);
    } catch (error) {
      throw { error: error.error || "networkError" };
    }
  }
  
  export async function fetchWord() {
    try {
      const response = await fetch("/api/word", {
        method: "GET",
      });
      return await handleResponse(response);
    } catch (error) {
      throw { error: error.error || "networkError" };
    }
  }
  
  export async function fetchUpdateWord(word) {
    try {
      const response = await fetch("/api/word", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
        body: JSON.stringify({ word }),
      });
      return await handleResponse(response);
    } catch (error) {
      throw { error: error.error || "networkError" };
    }
  }
  