const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
// const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const https = require("https");
const session = require("express-session");
const jwt_decode = require("jwt-decode");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "protocols")));
app.use(express.static(path.join(__dirname, "compare_csv")));

let baseUrlElastic = "";
let baseUrlSSO = "";
let access_token = "";
let refresh_token = "";
function authenticateUser(user, password) {
  var token = user + ":" + password;
  var hash = Buffer.from(token).toString("base64");

  return "Basic " + hash;
}
console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case "dev":
    baseUrlElastic = process.env.ELASTIC_DEV_URL;
    baseUrlSSO = process.env.CIMS_DEV_URL;
    access_token = "access_token_dev";
    refresh_token = "refresh_token_dev";
    break;
  case "test":
    baseUrlElastic = process.env.ELASTIC_TEST_URL;
    baseUrlSSO = process.env.CIMS_TEST_URL;
    access_token = "access_token_test";
    refresh_token = "refresh_token_test";
    break;
  case "svt":
    baseUrlElastic = process.env.ELASTIC_SVT_URL;
    baseUrlSSO = process.env.CIMS_SVT_URL;
    access_token = "access_token_svt";
    refresh_token = "refresh_token_svt";
    break;
  case "uat":
    baseUrlElastic = process.env.ELASTIC_UAT_URL;
    baseUrlSSO = process.env.CIMS_UAT_URL;
    access_token = "access_token_uat";
    refresh_token = "refresh_token_uat";
    break;
  case "uat1":
    baseUrlElastic = process.env.ELASTIC_UAT1_URL;
    baseUrlSSO = process.env.CIMS_UAT1_URL;
    access_token = "access_token_uat1";
    refresh_token = "refresh_token_uat1";
    break;
  case "prod":
    baseUrlElastic = process.env.ELASTIC_PROD_URL;
    baseUrlSSO = process.env.CIMS_PROD_URL;
    access_token = "access_token";
    refresh_token = "refresh_token";
    break;
  default:
    baseUrlElastic = process.env.ELASTIC_DEV_URL;
    baseUrlSSO = process.env.CIMS_DEV_URL;
    access_token = "access_token_dev";
    refresh_token = "refresh_token_dev";
}
console.log("baseUrlElastic", baseUrlElastic);
console.log("baseUrlSSO", baseUrlSSO);

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
app.get("/api/download", (req, res) => {
  // FOR DOCX === application/vnd.openxmlformats-officedocument.wordprocessingml.document
  // FOR CSV === text/csv
  // FOR PDF === application/pdf
  const dfsPath = req.query.path;
  res.download(dfsPath);
  // const ext = path.extname(dfsPath);
  // console.log(ext);
  // res.download(dfsPath);
  // if (dfsPath) {
  //   console.log(dfsPath);
  //   try {
  //     var file = fs.createReadStream(dfsPath);
  //     // console.log("FIle", file);
  //     file.on("error", (err) => {
  //       console.log("Inside on Error", err);
  //       res.status(404).send({
  //         message: "Document is not available.",
  //       });
  //     });
  //     file.on("close", () => {
  //       console.log("Inside Close");
  //       res.end();
  //     });
  //     if (ext === ".pdf") {
  //       console.log("Inside PDF");
  //       res.setHeader("Content-Type", "application/pdf");
  //       res.setHeader(
  //         "Content-Disposition",
  //         "attachment; filename=Protocol.pdf"
  //       );
  //       file.pipe(res);
  //     } else if (ext === ".csv") {
  //       console.log("Inside CSV");
  //       res.setHeader("Content-Type", "text/csv");
  //       res.setHeader(
  //         "Content-Disposition",
  //         "attachment; filename=compare.csv"
  //       );
  //       file.pipe(res);
  //     } else if (ext === ".docx") {
  //       console.log("Inside docx");
  //       res.setHeader(
  //         "Content-Type",
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //       );
  //       res.setHeader(
  //         "Content-Disposition",
  //         "attachment; filename=Protocol.docx"
  //       );
  //       file.pipe(res);
  //     }
  //   } catch (e) {
  //     console.log("Inside on Error", e);
  //     const errMsg = {
  //       message:
  //         "Unable to connect DFS location due to network issue. Please try again.",
  //     };
  //     res.status(403).send(errMsg);
  //   }
  // }
});

app.get("/health", function (req, res) {
  res.send("F5-UP");
});

app.get("/session", function (req, res) {
  console.log("session", req.session.user);
  res.send(req.session.user);
});

app.get("/refresh", function (req, res) {
  console.log("-----callback------", req.query);
  const getCookies = req.session.cookies;

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios
    .get(`${baseUrlSSO}/validate_token`, {
      params: {
        access_token: getCookies[access_token],
        refresh_token: getCookies[refresh_token],
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
      res.send(data);
      // if (data.code === 102) {
      //   res.send(true);
      // } else {
      //   res.send(false);
      // }
    })
    .catch((err) => {
      console.log(err);
      res.send(false);
    });
});

//------------Revert---------------
app.use(function (req, res, next) {
  console.log("SSO", process.env.SSO_ENABLED);
  if (process.env.SSO_ENABLED === "true") {
    console.log("Cookies", req.cookies);
    const getCookies = req.cookies;
    if (!getCookies[access_token] || !getCookies[refresh_token]) {
      console.log("No Tokens");
      res.redirect(`${baseUrlSSO}/logout_session`);
    } else if (getCookies[access_token] && getCookies[refresh_token]) {
      // At request level
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      axios
        .get(`${baseUrlSSO}/validate_token`, {
          params: {
            access_token: getCookies[access_token],
            refresh_token: getCookies[refresh_token],
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
              res.redirect(`${baseUrlSSO}${data.redirect_url}`);
              break;
            case 100: {
              const details = {
                userId: data.user_details.username,
                username: data.user_details.first_name,
                email: data.user_details.email,
                user_type: data.user_details.user_type,
              };
              const decoded = jwt_decode(getCookies[refresh_token]);
              req.session.user = details;
              req.session.expiry = decoded.exp;
              req.session.cookies = getCookies;
              res.cookie("exp", decoded.exp);
              next();
              break;
            }
            case 102:
              // res.redirect(
              //   `${baseUrlSSO}${data.redirect_url}?callback=http://ca2spdml06d.quintiles.net:3000/dashboard`
              // );
              next();
              break;
            default:
              res.redirect(`${baseUrlSSO}/logout_session`);
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect(`${baseUrlSSO}/logout_session`);
        });
    } else {
      console.log("Else part");
      res.redirect(`${baseUrlSSO}/logout_session`);
    }
  } else if (process.env.SSO_ENABLED === "false") {
    next();
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT);
