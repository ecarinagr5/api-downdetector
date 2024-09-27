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


  // Generate Token
  console.log("Generate Token");
  const url = 'https://downdetectorapi.com/v2/tokens';
  let options = {
    headers: {
      'Authorization': 'Basic 6173cf67-ba5e-4d02-9bfa-d8b437c6175f',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: { grant_type: 'client_credentials' } // Use params instead of qs in axios
  };

  axios.post(url, null, options) // Pass null as body if parameters are in query string
    .then(response => {
      console.log("response", response.data); // Log the response data
    })
    .catch(error => {
      console.error("Error generating token", error.response ? error.response.data : error.message);
    });


});


app.get("/health", (req, res) => {
  res.status(200).send("API Leads is Available");
});

// Export the Express API
module.exports = app;