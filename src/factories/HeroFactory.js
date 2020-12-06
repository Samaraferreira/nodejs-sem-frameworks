const path = require("path");
const HeroRepository = require("../repositories/HeroRepository");
const HeroService = require("../services/HeroService");

const filename = path.join(__dirname, "../../database", "data.json");

const generateInstance = () => {
  const heroRepository = new HeroRepository({
    file: filename,
  });
  const heroService = new HeroService({
    heroRepository,
  });
  return heroService;
};

module.exports = { generateInstance };

// generateInstance().find().then(console.log);
