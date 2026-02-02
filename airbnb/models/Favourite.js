const fs = require("fs");
const path = require("path");
const Helper = require("../utils/pathHelper");


const favourpath = path.join(Helper, "data", "favourite.json");
module.exports = class Favourite {
  static addToFavourite(id, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(id)) {
        callback("alreday");
      } else {
        favourites.push(id);
        fs.writeFile(favourpath, JSON.stringify(favourites), callback);
      }
    });
  }
  static getFavourites(callback) {
    fs.readFile(favourpath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites(homeIds => {
      homeIds = homeIds.filter(homeId => delHomeId !== homeId);
      fs.writeFile(favourpath, JSON.stringify(homeIds),callback);
    })
  }
  
  
};
