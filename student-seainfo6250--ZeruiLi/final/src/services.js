
export function fetchAddTodo({ goods, price,category }) {
  return fetch('/api/todos', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ goods, price,category }),
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({ error }))
    .then(err => Promise.reject(err));
  });
}


export function fetchDeleteTodo(id) {
  return fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}


export function fetchTodos() {
  return fetch('/api/todos')
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchSetBudget(budget) {
  return fetch('/api/budget', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ budget }),
  })
  .catch(() => Promise.reject({ error: 'networkError' }))
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({ error }))
    .then(err => Promise.reject(err));
  });
}

export function fetchBudget() {
  return fetch('/api/budget')
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}




export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}
