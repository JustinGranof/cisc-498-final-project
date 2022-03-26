/**
 * Make an http request to the backend NodeJS server
 * @param {String} method http request type
 * @param {String} path the path of the http request
 * @param {Object} body the post request body
 * @param {Object} headers the headers for http request
 * @returns the response from the http request in json format
 */
export default async function request(
  method = "GET",
  path = "",
  body = {},
  auth = false,
  headers = { "Content-Type": "application/json" }
) {
  if (auth) {
    let user = window.localStorage.getItem("user");
    if (user) user = JSON.parse(user);
    const authToken = user.token;
    headers["Authorization"] = "Bearer " + authToken;
  }

  if (method === "GET") body = undefined;

  let data = (
    await fetch(process.env.REACT_APP_BACKEND_IP + "/" + path, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    })
  )
    .json()
    .catch(() => null);

  return data;
}
