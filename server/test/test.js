//test request
const URL = "http://localhost:5173/";

const request = require("request");
const req = async (url) => {
  return request.get(
    {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      url: url,
    },
    function (error, response, body) {
      console.log(body);
    }
  );
};
setInterval(async () => {
  await req(URL);
}, 1000);
