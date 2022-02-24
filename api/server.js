const express = require("express");

const accountsRoute = require("./accounts/accounts-router")

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsRoute)

server.get("/", (req, res) => {
    res.status(200).json({api: 'up'})
})

module.exports = server;
