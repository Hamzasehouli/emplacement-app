const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var session = require("express-session");
var Keycloak = require("keycloak-connect");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();
app.use(express.json());
// app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "some secret",
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore,
//   })
// );
// var memoryStore = new session.MemoryStore();
// let kcConfig = {
//   clientId: "emplacement",
//   bearerOnly: true,
//   serverUrl: "http://localhost:8080/auth",
//   realm: "emplacement_app",
//   realmPublicKey:
//     "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhZckQjuWgiYDihGPTbTY1HnZfqAMVHtZ7cEFN1ykPPsIGPOuwPpphP6W0Q30x/RzHC6aOu5S4myCniWSRHbQbYDioAsPt9CTsKfm9zA8hIOgXgHnGyhjnsQJUrXjFzSZvdet/hoQcR6lP6KXwynsn7kChODBfjTi42L5OYUfDTkEECgjvYoeBDOSn54FL0QAExEN+tKtK2SRkXwrTFRasvcOwSh3Y2Yzo2cvLoH+KOa2vAwLAc/CY9X8UOYRObCu/aNReVyK2HqBFgr+jCzFkmxwswhaalJxIUzdnUK5E5rFrz7KOYKEBm740hMQlrjFPWgs4rA7zpIckFzGiPo+fQIDAQAB",
// };
// var keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(cookieParser());

// app.use(keycloak.middleware());

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/", viewRoutes);

app.all("*", (req, res, next) => {
  next("err");
});

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;
