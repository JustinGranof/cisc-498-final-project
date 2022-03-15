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
