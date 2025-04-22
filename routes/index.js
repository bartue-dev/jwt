const registerRoute = require("./register");
const signinRoute = require("./signin");
const refreshRoute = require("./refreshToken");
const logoutRoute = require("./logout");
const peopleRoute = require("./api/people");

module.exports = {
  registerRoute,
  signinRoute,
  refreshRoute,
  logoutRoute,
  peopleRoute
}