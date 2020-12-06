const http = require("http");
const { DEFAULT_HEADER } = require("./http/header");
const { handleError } = require("./errors/error");
const routes = require("./routes.js");

const PORT = 3000;

const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = { id: isNaN(id) ? id : Number(id) };
  const key = `/${route}:${method.toLowerCase()}`;

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || route.default;

  return chosen(request, response).catch(handleError(response));
};

http
  .createServer(handler)
  .listen(PORT, () => console.log("server running at", PORT));
