const express = require("express");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const axios = require('axios');
require("dotenv").config();
const app = express();

app.set("port", process.env.PORT || 8081);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${app.get("port")} `);
});

console.log("Connect Leads is connected");
app.get("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token
  console.log("Generate Token");
  const url = 'https://downdetectorapi.com/v2/tokens'
    let options = {
      method: 'POST',
      qs: { grant_type: 'client_credentials' },
      headers: { authorization: 'Basic b64f5306-5134-486c-8ac3-0e91538c5968' }
    };

  const response = axios.post(url, options);
  console.log("response", response)


});


app.get("/health", (req, res) => {
  res.status(200).send("API Leads is Available");
});

// Export the Express API
module.exports = app;