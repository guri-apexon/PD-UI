const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const path = require("path");
const app = express();
const cors = require("cors");

const https = require("https");
const session = require("express-session");
const jwt_decode = require("jwt-decode");
const dotenv = require("dotenv");

const { getENVURL } = require("./utility/EnvURL");
const envURL = getENVURL();
dotenv.config();
let PORT;
if (process.env.REACT_APP_LOCAL === "true" || process.env.REACT_APP_LOCAL) {
  PORT = 4000;
} else {
  PORT = process.env.PORT || 3000;
}
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "../protocols")));

function authenticateUser(user, password) {
  var token = user + ":" + password;
  var hash = Buffer.from(token).toString("base64");

  return "Basic " + hash;
}
//------------------------------------ Elastic Search END POINT -----------------------
require("./routes/elasticSearch")(app);
//------------------------------------ Excel End Point --------------------------------
require("./routes/converToExcel")(app);

app.use(
  session({
    // It holds the secret key for session
    secret: "Your_Secret_Key",

    // Forces the session to be saved
    // back to the session store
    resave: true,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
  })
);

require("./routes/health")(app);
require("./routes/session")(app);
require("./routes/refresh")(app);
//------------Revert---------------
app.use(function (req, res, next) {
  console.log("SSO", process.env.SSO_ENABLED);
  if (process.env.SSO_ENABLED === "true") {
    console.log("Cookies", req.cookies);
    const getCookies = req.cookies;
    if (!getCookies[envURL.access_token] || !getCookies[envURL.refresh_token]) {
      console.log("No Tokens");
      res.redirect(`${envURL.baseUrlSSO}/logout_session`);
    } else if (
      getCookies[envURL.access_token] &&
      getCookies[envURL.refresh_token]
    ) {
      // At request level
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      axios
        .get(`${envURL.baseUrlSSO}/validate_token`, {
          params: {
            access_token: getCookies[envURL.access_token],
            refresh_token: getCookies[envURL.refresh_token],
          },
          headers: {
            Authorization: authenticateUser(
              process.env.CIMS_USER,
              process.env.CIMS_PWD
            ),
          },
          httpsAgent: agent,
        })
        .then(({ data }) => {
          console.log(data);
          switch (data.code) {
            case 101:
              res.redirect(`${envURL.baseUrlSSO}${data.redirect_url}`);
              break;
            case 100:
              const details = {
                userId: data.user_details.username,
                username: data.user_details.first_name,
                email: data.user_details.email,
                user_type: data.user_details.user_type,
              };
              const decoded = jwt_decode(getCookies[envURL.refresh_token]);

              console.log(decoded);
              req.session.user = details;
              req.session.expiry = decoded.exp;
              req.session.cookies = getCookies;
              res.cookie("exp", decoded.exp);
              next();
              break;
            case 102:
              // res.redirect(
              //   `${baseUrlSSO}${data.redirect_url}?callback=http://ca2spdml06d.quintiles.net:3000/dashboard`
              // );
              next();
              break;
            default:
              res.redirect(`${envURL.baseUrlSSO}/logout_session`);
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect(`${envURL.baseUrlSSO}/logout_session`);
        });
    } else {
      console.log("Else part");
      res.redirect(`${envURL.baseUrlSSO}/logout_session`);
    }
  } else if (process.env.SSO_ENABLED === "false") {
    next();
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
