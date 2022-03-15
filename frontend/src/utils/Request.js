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
  headers = { "Content-Type": "application/json" }
) {
  let data = (
    await fetch(process.env.REACT_APP_BACKEND_IP + "/" + path, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    })
  ).json();

  return data;
}
