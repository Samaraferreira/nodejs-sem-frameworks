const { DEFAULT_HEADER } = require("./http/header");
const HeroFactory = require("./factories/HeroFactory");
const Hero = require("./entities/Hero");
const { handleError } = require("./errors/error");

const heroService = HeroFactory.generateInstance();

const routes = {
  "/heroes:get": async (request, response) => {
    const { id } = request.queryString;
    const heroes = await heroService.find(id);

    response.write(JSON.stringify({ results: heroes }));

    return response.end();
  },
  "/heroes:post": async (request, response) => {
    for await (const data of request) {
      try {
        const item = JSON.parse(data);
        const hero = new Hero(item);
        const { error, valid } = hero.isValid();
        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: error.join(",") }));
          return response.end();
        }

        const id = await heroService.create(hero);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(JSON.stringify({ success: "Hero Created", id }));

        return response.end();
      } catch (error) {
        return handleError(response)(error);
      }
    }
  },
  default: (request, response) => {
    response.write("Hello!");
    response.end();
  },
};

module.exports = routes;
