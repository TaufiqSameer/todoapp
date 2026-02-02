const fs = require("fs");
const path = require("path");
const Helper = require("../utils/pathHelper");

let registeredHomes = [];
const homepath = path.join(Helper, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, urll) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.urll = urll;
  }
  save() {
    Home.getHome((reg) => {
      if(this.id){
        registeredHomes = registeredHomes.map(home => {
          if(home.id === this.id){
            return this;
          }
          return home;
        })
      }
      else{
      this.id = Math.random().toString();
      registeredHomes.push(this);

    }
      fs.writeFile(homepath, JSON.stringify(registeredHomes), (err) => {
        console.log("file can ceeled");
      });
    });
  }

  static getHome(callback) {
    const filepath = path.join(Helper, "data", "homes.json");
    fs.readFile(filepath, (err, data) => {
      if (!err) {
        registeredHomes = JSON.parse(data);
      }
      callback(registeredHomes);
    });
  }

  static findById(homeId, callback) {
    this.getHome((homes) => {
      const home = homes.find((home) => home.id === +homeId);
      callback(home);
    });
  }
  static deleteById(homeId, callback) {
    this.getHome((homes) => {
      homes = homes.filter(home => home.id !== homeId);
      fs.writeFile(homepath,JSON.stringify(homes),callback);
    })
  }

  
};
