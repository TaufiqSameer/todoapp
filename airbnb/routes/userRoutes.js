const path = require("path");
const root = require("../utils/pathHelper");

const express = require("express");
const { register, getHomes, getBookings, getFavouriteList, getIndex, getHomeDetails, addFavouriteList, postRemoveFromFavourite } = require("../Controllers/store");
const { registerHooks } = require("module");
const userRoutes = express.Router();

userRoutes.get("/", getIndex);
userRoutes.get("/home", getHomes);
userRoutes.get("/bookings", getBookings);
userRoutes.get("/Favourite", getFavouriteList);

userRoutes.get("/home/:homeId",getHomeDetails);

userRoutes.post("/Favourite", addFavouriteList);
userRoutes.post("/Favourite/delete/:homeId", postRemoveFromFavourite);

module.exports = userRoutes;
