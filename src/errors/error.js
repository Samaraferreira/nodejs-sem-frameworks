const { DEFAULT_HEADER } = require("../http/header");

const handleError = (response) => {
  return (error) => {
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error" }));
    response.end();
  };
};

module.exports = { handleError };
