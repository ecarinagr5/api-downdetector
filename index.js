const express = require("express");
const router = require("./routes/index");
const bodyParser = require("body-parser");
const axios = require("axios");
const res = require("express/lib/response");
require("dotenv").config();
const app = express();

app.set("port", process.env.PORT || 8081);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${app.get("port")} `);
});

const url =
  "https://downdetectorapi.com/v2/tokens?grant_type=client_credentials";
const clientID = "f535d828-0358-41a4-8b8a-1acbfd7fa304";
const clientSecret =
  "eyJhbGciOiJIUzUxMiIsImtpZCI6ImZ0Y3dkcXc4dGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhcGkiLCJpYXQiOjE3Mjc0NjU0MDMsImp0aSI6ImY1MzVkODI4LTAzNTgtNDFhNC04YjhhLTFhY2JmZDdmYTMwNCJ9.d1emXZnnLjoP7MEMnVnbrBT7SwAWjR5ORx7jg8Pal47ZFSmoF729LyXaw6cdf4zzkpaU5F0MnVSunRpDfgu2gQ";
const encodedCredentials = Buffer.from(`${clientID}:${clientSecret}`).toString(
  "base64"
);

let options = {
  headers: { Authorization: `Basic ${encodedCredentials}` },
};

// Use an async function to handle the asynchronous request
const generateToken = async () => {
  try {
    const response = await axios.post(url, null, options);
    return response.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

const generateSite = async () => {
  const token = await generateToken();
  const options = {
    method: "GET",
    headers: { authorization: `Bearer ${token?.access_token}` },
  };

  try {
    const response = await axios.get(
      "https://downdetectorapi.com/v2/sites",
      options
    );
    console.log("generateSite", response?.data);
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

const reportsForSlug = async (token, slug) => {
  const url = `https://downdetectorapi.com/v2/slugs/${slug}/reports`;
  const options = {
    method: "GET",
    headers: { authorization: `Bearer ${token?.access_token}` },
    qs: {
      interval: '15m',
    },
  };

  try {
    const response = await axios.get(url, options);
    console.log("generateSite", response?.data);
    return response?.data;
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

const getResponse = async () => {
  //1: Get the token
  const token = await generateToken();
  /*const options = {
    method: "GET",
    headers: { authorization: `Bearer ${token?.access_token}` },
  };*/
  let options = {
    method: "GET",
    qs: { fields: "id,name,slug,stats_24,baseline" },
    headers: { authorization: `Bearer ${token?.access_token}` },
  };

  //Search by slug
  //const url =`https://downdetectorapi.com/v2/slugs/${'atr'}/companies`
  /*let options = {
    method: "GET",
    qs: {fields: 'id,name,slug,stats_24,baseline'},
    headers: { authorization: `Bearer ${token?.access_token}` },
  };*/

  //Search by site
  //generateSite()
  try {
    //const response = await axios.get('https://downdetectorapi.com/v2/sites/13',options);
    //const response = await axios.get('https://downdetectorapi.com/v2/sites/13/companies/events',options);
    //const response = await axios.get('https://downdetectorapi.com/v2/sites/13/companies',options); Null

    /*const response = await axios.get(
      "https://downdetectorapi.com/v2/sites/13/companies?page_size=25&order_by=name&order_direction=asc",
      options
    );*/
    /*const response = await axios.get(
      "https://downdetectorapi.com/v2/companies",
      options
    );
    console.log("getCompanies", response?.data);*/

    //2: Get the companies slugs
    //const response = await axios.get(url, options);

    //3: Get the reports for each company
    const report = reportsForSlug(token, "mega");
    console.log("getCompanies", report);
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

getResponse();
app.get("/health", (req, res) => {
  res.status(200).send("API Leads is Available");
});

// Export the Express API
module.exports = app;
