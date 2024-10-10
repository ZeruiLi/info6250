// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions
export async function fetchSession() {
  let response;
  try {
    response = await fetch('/api/session', {
      method: "GET",
    });
  } catch {
    response = await Promise.reject({ error: "networkError" });
  }
  if (response.ok) {
    return response.json();
  }
  let err;
  try {
    err = await response.json();
  } catch (error) {
    err = await Promise.reject({ error });
  }
  return await Promise.reject(err);
}


export async function fetchLogin(username) {
  let response;
  try {
    response = await fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', // set this header when sending JSON in the body of request
      },
      body: JSON.stringify({ username }),
    });
  } catch (err) {
    response = await Promise.reject({ error: 'network-error' });
  }
  if (!response.ok) { // response.ok checks the status code from the service
    // This service returns JSON on errors,
    // so we use that as the error object and reject
    return response.json().then(err_1 => Promise.reject(err_1));
  }
  return await response.json();
}

export async function fetchLogout() {
  let response;
  try {
    response = await fetch('/api/session', {
      method: 'DELETE',
    });
  } catch (err) {
    response = await Promise.reject({ error: 'netword-error' });
  }
  if (!response.ok) {
    return response.json().then(err_1 => Promise.reject(err_1));
  }
  return await response.json();
}

export async function fetchWord() {
  let response;
  try {
    response = await fetch('/api/word', {
      method: "GET",
    });
  } catch {
    response = await Promise.reject({ error: "networkError" });
  }
  if (!response.ok) {
    return response.json().then(err => Promise.reject(err));
  }
  return await response.json();  
}

export async function fetchUpdateWord(word) {
  const dataToSend = word === '' ? undefined : { word };

  let response;
  try {
    response = await fetch('/api/word', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
  } catch (err) {
    response = await Promise.reject({ error: 'networkError' });
  }
  if (!response.ok) {
    return response.json().then(err_1 => Promise.reject(err_1));
  }
  return await response.json();
}