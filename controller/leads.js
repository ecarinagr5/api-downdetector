const { response, request } = require("express");


const leadsGet = (req = request, res = response) => {
    res.status(200).json({ message: "API Leads is connected" });
};


module.exports = {
    leadsGet
};