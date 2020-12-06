const { readFile, writeFile } = require("fs/promises");

class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find(itemId) {
    const all = await this._currentFileContent();

    if (!itemId) return all;

    return all.find(({ id }) => id === itemId);
  }

  async create(data) {
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}

module.exports = HeroRepository;

// const heroRepository = new HeroRepository({
//   file: "../database/data.json",
// });

// heroRepository
//   .create({
//     id: 1605828966002,
//     name: "Grandão",
//     age: 180,
//     power: "fogo",
//   })
//   .then(console.log);
