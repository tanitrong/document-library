const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const cloudId = process.env.CLOUD_ID_ELASTIC;
const username = process.env.USE_NAME_ELASTIC;
const password = process.env.PASSWORD_ELASTIC;

const ESclient = new Client({
  cloud: {
    id: cloudId,
  },
  auth: {
    username,
    password,
  },
});

module.exports = ESclient;
