const _fetch = (url, options = {}) =>
  fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  })
    .then(checkStatus)
    .then((r) => r.json());

// Server will always return a json

export function checkStatus(response) {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

export default _fetch;
