const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(root,'../','airbnb','views','addHome.html'));
  res.render("admin/edit-home", {
    pageTitle: "airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

const register = [];
exports.getAdded = (req, res, next) => {
  console.log("Home registration is successfully", req.body);
  console.log(req.body.houseName);
  const h = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.urll,
  );
  h.save();
  register.push(req.body);
  // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
  res.redirect("/admin/hosthomelist");
};

exports.getHostHomes = (req, res, next) => {
  const reg = Home.getHome((reg) =>
    res.render("admin/hosthomelist", {
      reg,
      pageTitle: "Host home airbnb",
      currentPage: "Home",
    }),
  );
  console.log(reg);
  console.log(req.url, req.method);
  // res.sendFile(path.join(root, "../",'airbnb',"views", "home.html"));
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  if (!editing) {
    return res.redirect("/host/host-home");
  }

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/host/host-home");
    }

    console.log(homeId, editing);

    res.render("admin/edit-home", {
      home: home,
      pageTitle: "Edit your home",
      currentPage: "addHome",
      editing: editing,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home registration is successfully", req.body);
  console.log(req.body.houseName);
  const h = new Home(
    req.body.id,
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.urll,
  );
  Home.id = req.body.id;
  h.save();
  register.push(req.body);
  // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
  res.redirect("/host/host-home");
};

exports.postDeleteHome = (req, res, next) => {
  // res.sendFile(path.join(root,'../','airbnb','views','homeadded.html'));
  const homeId = req.params.homeId;
  console.log("deletning home with id : " , homeId);
  Home.deleteById(homeId,err => {
    if(err){
      console.log(err);
    }
    res.redirect("/host/host-home");
  })
};
