const Favourite = require("../models/Favourite");
const Home = require("../models/home");

exports.getHomes = (req, res, next) => {
  const reg = Home.getHome((reg) =>
    res.render("store/home", { reg, pageTitle: "airbnb", currentPage: "Home" }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};
exports.getIndex = (req, res, next) => {
  const reg = Home.getHome((reg) =>
    res.render("store", {
      reg,
      pageTitle: "airbnb",
      currentPage: "Index",
    }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};

exports.getBookings = (req, res, next) => {
  const reg = Home.getHome((reg) =>
    res.render("store/bookings", {
      reg,
      pageTitle: "Bookings",
      currentPage: "bookings",
    }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites = []) => {
    Home.getHome((reg = []) => {
      const fil = reg.filter(home =>
        favourites.includes(String(home.id))
      );

      res.render("store/Favourite", {
        fil,
        pageTitle: "My favourites",
        currentPage: "FAVOURITE",
      });
    });
  });
};

exports.addFavouriteList = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/store/Favourite");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId)
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/store/Favourite");
  })
}


exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details page", homeId);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/home");
    } else console.log("Found", home);
    res.render("store/home-details", {
      home: home,
      pageTitle: "Home detail",
      currentPage: "home",
    });
  });
};
